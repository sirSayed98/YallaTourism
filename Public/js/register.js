import axios from 'axios';
import { showAlert } from './alerts';

export const register = async (name, email, password, confirmPassword) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/auth/register',
            data: {
                name,
                email,
                password,
                confirmPassword
            }
        });
        if (res.data.success === true) {
            showAlert('success', 'Welcome to YallaTourism 🤗');
            window.setTimeout(() => {
                location.assign('/');
            }, 100);
        }
    } catch (err) {
        showAlert('error', err.response.data.error);
    }
};