const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const textareaInput = form.querySelector('textarea[name="message"]');

let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    emailInput.value = formData.email;
    textareaInput.value = formData.message;
  }
});


function fillLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

form.addEventListener('input', e => {
  const { name, value } = e.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
  }
  fillLocalStorage();
});


form.addEventListener('submit', e => {
  e.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert(`Please fill in all fields`);
    return;
  }
  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
