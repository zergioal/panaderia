// Menú móvil
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

// Scroll suave
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

// Formulario + localStorage + envío por WhatsApp
const form = document.getElementById("contactForm");
const numeroWhatsApp = "70745899"; // tu número

// Cargar datos guardados
window.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = JSON.parse(localStorage.getItem("formData"));
  if (datosGuardados) {
    Object.entries(datosGuardados).forEach(([key, value]) => {
      const input = form.elements[key];
      if (input) input.value = value;
    });
  }
});

// Guardar datos a medida que se escribe
form.addEventListener("input", () => {
  const formData = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem("formData", JSON.stringify(formData));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Validación
  if (data.nombre.trim().length < 2) {
    alert("Por favor, escribe tu nombre.");
    return;
  }
  if (!/^\+?\d[\d\s-]{6,}$/.test(data.telefono)) {
    alert("Escribe un número de WhatsApp válido.");
    return;
  }
  if (data.mensaje.trim().length < 5) {
    alert("El mensaje es demasiado corto.");
    return;
  }

  // Construir el mensaje para WhatsApp
  const texto = `Hola Panadería Neythan! 👋
Soy ${data.nombre}.
Mi número es ${data.telefono}.
Mensaje: ${data.mensaje}`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    texto
  )}`;

  // Borrar datos guardados y abrir WhatsApp
  localStorage.removeItem("formData");
  window.open(url, "_blank");
  form.reset();
});
