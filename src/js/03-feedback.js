import storageApi from './storage';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
loadPage();

form.addEventListener(
  'input',
  throttle(event => {
    let savedData = storageApi.load(STORAGE_KEY);
    if (!savedData) {
      savedData = {};
    }
    savedData[event.target.name] = event.target.value;
    storageApi.save(STORAGE_KEY, savedData);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(storageApi.load(STORAGE_KEY));
  storageApi.remove(STORAGE_KEY);
  form.reset();
});

function loadPage() {
  const loadedData = storageApi.load(STORAGE_KEY);
  if (loadedData) {
    Object.entries(loadedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
