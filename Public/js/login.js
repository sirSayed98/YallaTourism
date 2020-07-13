/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/login',
      data: {
        email,
        password
      }
    });
    if (res.data.success === true) {
      showAlert('success', 'Welcome 😍',7);
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.error);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/auth/logout'
    });
    if (res.data.success === true) {
      showAlert('success', 'See You Soon... Goodbye 😪');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    };
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
}; 
