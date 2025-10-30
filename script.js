// Menú móvil
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

// Scroll suave en anclas internas
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      nav.classList.remove("is-open");
    }
  });
});

// Validación simple del formulario
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Reglas mínimas
  if (data.nombre.trim().length < 2) {
    alert("Por favor, escribe tu nombre.");
    return;
  }
  if (!/^\+?\d[\d\s-]{6,}$/.test(data.telefono)) {
    alert("Escribe un número de WhatsApp válido.");
    return;
  }
  if (data.mensaje.trim().length < 5) {
    alert("Cuéntanos un poco más en el mensaje.");
    return;
  }

  // Simulación de envío (aquí podrían integrar WhatsApp API, EmailJS, etc.)
  alert(`¡Gracias ${data.nombre}! Te contactaremos al ${data.telefono}.`);
  form.reset();
});
