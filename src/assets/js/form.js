/*
  Inquiry form. Two modes, set at build time from site.form.endpoint:

  "endpoint"  The message is posted to a form service. The confirmation is shown
              only when the service answers that it accepted the message.
  "mailto"    Nothing is connected. The message is handed to the visitor's own
              email app and the page says clearly that one step remains.

  Neither mode ever shows a success message that has not been earned.
*/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initForm() {
  const wrap = document.querySelector("[data-form-wrap]");
  const form = wrap?.querySelector("[data-form]");
  if (!wrap || !form) return;

  const config = JSON.parse(wrap.querySelector("[data-form-config]").textContent);
  const alertBox = form.querySelector("[data-form-alert]");
  const submit = form.querySelector("[data-form-submit]");
  const submitLabel = form.querySelector("[data-form-submit-label]");
  const result = wrap.querySelector("[data-form-result]");
  const resultTitle = wrap.querySelector("[data-form-result-title]");
  const idleLabel = submitLabel.textContent;
  let busy = false;

  // Validation messages are ours (in Spanish), not the browser's.
  form.noValidate = true;

  const fields = [
    { input: form.elements.nombre, error: config.errors.name, valid: (value) => value.length >= 2 },
    { input: form.elements.telefono, error: config.errors.phone, valid: (value) => value.replace(/\D/g, "").length >= 10 },
    { input: form.elements.email, error: config.errors.email, valid: (value) => value === "" || EMAIL.test(value) },
    { input: form.elements.mensaje, error: config.errors.message, valid: (value) => value.length >= 5 },
  ];

  const mark = (field, ok) => {
    const message = document.getElementById(`${field.input.id}-error`);
    if (ok) field.input.removeAttribute("aria-invalid");
    else field.input.setAttribute("aria-invalid", "true");
    message.textContent = ok ? "" : field.error;
    message.hidden = ok;
  };

  const check = (field) => {
    const ok = field.valid(field.input.value.trim());
    mark(field, ok);
    return ok;
  };

  const showAlert = (text) => {
    alertBox.hidden = false;
    alertBox.textContent = text;
  };

  const hideAlert = () => {
    alertBox.hidden = true;
    alertBox.textContent = "";
  };

  const showResult = () => {
    form.hidden = true;
    result.hidden = false;
    resultTitle.focus();
  };

  // Once a field has been flagged, clear the flag as soon as it is fixed.
  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      if (field.input.hasAttribute("aria-invalid")) check(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (busy) return;
    hideAlert();

    const invalid = fields.filter((field) => !check(field));
    if (invalid.length) {
      showAlert(config.errors.summary);
      invalid[0].input.focus();
      return;
    }

    if (config.mode === "endpoint") send();
    else handOff();
  });

  /* ---------- "endpoint" mode ---------- */

  const setBusy = (value) => {
    busy = value;
    form.setAttribute("aria-busy", String(value));
    submit.setAttribute("aria-disabled", String(value));
    submitLabel.textContent = value ? config.sending : idleLabel;
  };

  async function send() {
    const data = new FormData(form);

    // A filled trap field means a bot, or an autofill accident: nothing is sent and nothing is claimed.
    if (data.get("_gotcha")) {
      form.elements._gotcha.value = "";
      showAlert(config.sendError);
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams(data),
      });
      // Only a JSON answer that does not report a problem counts as "received".
      const answer = await response.json();
      const refused = answer.success === false || answer.ok === false || Boolean(answer.error) || Boolean(answer.errors);
      if (!response.ok || refused) throw new Error(`Form service answered ${response.status}`);

      form.reset();
      showResult();
    } catch (error) {
      console.error(error);
      showAlert(config.sendError);
    } finally {
      setBusy(false);
    }
  }

  /* ---------- "mailto" mode ---------- */

  const preview = wrap.querySelector("[data-form-preview]");
  const copyButton = wrap.querySelector("[data-form-copy]");
  const copyStatus = wrap.querySelector("[data-form-copy-status]");
  const editButton = wrap.querySelector("[data-form-edit]");

  const compose = () => {
    const data = new FormData(form);
    const value = (name) => String(data.get(name) ?? "").trim();
    const lines = [value("mensaje"), ""];
    for (const name of ["nombre", "telefono", "email", "tipo_cliente", "tema"]) {
      if (value(name)) lines.push(`${config.labels[name]}: ${value(name)}`);
    }
    lines.push("", config.signature);
    // The subject names the topic, unless it is still the general first option.
    const specific = form.elements.tema.selectedIndex > 0;
    return {
      subject: specific ? `${config.subject}: ${value("tema")}` : config.subject,
      body: lines.join("\n"),
    };
  };

  function handOff() {
    const { subject, body } = compose();
    preview.value = body;
    copyStatus.textContent = "";
    showResult();
    // Same as the visitor tapping an email link: opens their email app with the message ready.
    const link = document.createElement("a");
    const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`;
    link.href = `mailto:${config.email}?${query}`;
    link.click();
  }

  copyButton?.addEventListener("click", async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(preview.value);
      copied = true;
    } catch {
      preview.focus();
      preview.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
    }
    copyStatus.textContent = copied ? config.copied : config.copyFailed;
  });

  editButton?.addEventListener("click", () => {
    result.hidden = true;
    form.hidden = false;
    form.elements.mensaje.focus();
  });
}
