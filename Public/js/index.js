/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { register } from './register'
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';
import { bookTour } from './stripe';
// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const registerForm = document.querySelector('.form--signUp');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const alertMessage = document.querySelector('body').dataset.alert;

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    register(name, email, password, confirmPassword);
  });
}
if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    if (passwordConfirm === newPassword) {
      await updateSettings(
        { currentPassword, newPassword },
        'password'
      );
      document.querySelector('.btn--save-password').textContent = 'Save password';
      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
    }
    else {
      document.querySelector('.btn--save-password').textContent = 'Save password';
      showAlert('error', ' password and confirm don\'t match');
    }
  });
if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });


if (alertMessage) showAlert('success', alertMessage, 8);
