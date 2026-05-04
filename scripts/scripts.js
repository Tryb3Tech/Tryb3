document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contact');
  const button = form.querySelector('.form-submit');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    button.disabled = true;
    button.innerText = "Sending...";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showSuccessPopup();
        saveToLocal(data);
        form.reset();
      } else {
        alert("Something went wrong. Try again.");
      }

    } catch (error) {
      alert("Network error. Please try again.");
    }

    button.disabled = false;
    button.innerText = "SEND REQUEST";
  });
});

function showSuccessPopup() {
  document.getElementById("success-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("success-popup").style.display = "none";
}

function saveToLocal(formData) {
  const entry = {
    name: formData.get("name"),
    email: formData.get("email"),
    category: formData.get("category"),
    message: formData.get("message"),
    date: new Date().toISOString()
  };

  let submissions = JSON.parse(localStorage.getItem("tryb3_requests")) || [];
  submissions.push(entry);

  localStorage.setItem("tryb3_requests", JSON.stringify(submissions));
}