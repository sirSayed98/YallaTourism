/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/auth/login',
      data: {
        email,
        password
      }
    });
    if (res.data.success === true) {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', "Invalid credentials");
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/auth/logout'
    });
    if (res.data.success === true) {
      showAlert('success', 'Logged out successfully!');
      location.reload(true);
    };
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
}; 
