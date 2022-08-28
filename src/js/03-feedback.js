import storageApi from './storage';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';
loadPage();

form.addEventListener('input', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  throttle(() => {
    storageApi.save(STORAGE_KEY, {
      email: email.value,
      message: message.value,
    });
  }, 500)();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  storageApi.remove(STORAGE_KEY);
  console.log({ email: email.value, message: message.value });
  email.value = '';
  message.value = '';
});

function loadPage() {
  if (storageApi.load(STORAGE_KEY)) {
    email.value = storageApi.load(STORAGE_KEY).email;
    message.value = storageApi.load(STORAGE_KEY).message;
  }
}
