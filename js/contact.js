/* ==========================================
   CONTACT PAGE & ACCORDION LOGIC (contact.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initFormValidation();
});

function initAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.style.maxHeight;

      document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
      document.querySelectorAll('.faq-icon').forEach(i => i.innerText = '+');

      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        q.querySelector('.faq-icon').innerText = '-';
      }
    });
  });
}

function initFormValidation() {
  const form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Name Validation
    if(!name.value.trim()){
      setError(name, 'Name is required');
      valid = false;
    } else {
      clearError(name);
    }

    // Email Validation
    if(!email.value.trim() || !email.value.includes('@')){
      setError(email, 'Valid email required');
      valid = false;
    } else {
      clearError(email);
    }

    // Subject
    if(!subject.value.trim()){
      setError(subject, 'Subject required');
      valid = false;
    } else {
      clearError(subject);
    }

    // Message
    if(!message.value.trim()){
      setError(message, 'Message cannot be empty');
      valid = false;
    } else {
      clearError(message);
    }

    if(valid) {
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
    }
  });
}

function setError(input, msg) {
  const err = input.nextElementSibling;
  if(err) err.innerText = msg;
  input.style.borderColor = 'var(--accent-red)';
}

function clearError(input) {
  const err = input.nextElementSibling;
  if(err) err.innerText = '';
  input.style.borderColor = 'var(--border-color)';
}