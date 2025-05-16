let currentStep = 0;
const steps = document.querySelectorAll(".step");
const form = document.getElementById("multiStepForm");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

// Define all possible field names used in the form across all steps
const allFieldNames = [
  "firstName", "lastName", "dob", "nic", "status",
  "guarantor1Name", "guarantor1Phone", "guarantor2Name", "guarantor2Phone",
  "businessName", "businessLocation", "businessType",
  "bankName", "branch", "accountNumber", "accountHolder"
];

function showStep(step) {
  steps.forEach((s, i) => s.classList.toggle("active", i === step));
  prevBtn.style.display = step > 0 ? "inline-block" : "none";
  nextBtn.style.display = step < steps.length - 1 ? "inline-block" : "none";
  submitBtn.style.display = step === steps.length - 1 ? "inline-block" : "none";
}

function nextStep() {
  saveStepData();
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

function saveStepData() {
  allFieldNames.forEach(name => {
    const input = form.querySelector(`[name="${name}"]:not([type="hidden"])`);
    let hidden = form.querySelector(`input[name="${name}"][type="hidden"]`);
    if (!hidden) {
      hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = name;
      form.appendChild(hidden);
    }
    hidden.value = input ? input.value : "";
  });
}

showStep(currentStep);

form.addEventListener("submit", function(e) {
  e.preventDefault();
  saveStepData();
  const formData = new FormData(form);
  fetch("https://script.google.com/macros/s/AKfycbx1vag6fqLgs0oQae5gZVHzBS5cp4E0O20olmuqVnr__De_IueKzXVAB-3t41kEM2q1/exec", {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(formData)
  }).then(() => {
    window.location.href = "thankyou.html";
  });
});