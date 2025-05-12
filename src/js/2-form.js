const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

// Початковий об'єкт formData
let formData = {
  email: '',
  message: '',
};

// ▸ Завантаження з localStorage
loadFormData();

// ▸ Обробник input (делегування)
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// ▸ Обробник submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  // Очистити форму, localStorage і formData
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});

// ▸ Функція для завантаження збережених даних
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      emailInput.value = formData.email || '';
      messageInput.value = formData.message || '';
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }
}