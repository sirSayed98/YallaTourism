/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    console.log(data);
    const url =
      type === 'password'
        ? 'http://localhost:5000/api/v1/auth/updatePassword'
        : 'http://localhost:5000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PUT',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  }catch (err) {
    showAlert('error', err.response.data.error);
  }
};
