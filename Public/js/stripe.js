/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51H43g5Gv5F9rU5eRAIaJa6oRce59wd2J9E00X1rtbZX2liv8DOuEmbkpG99p7HVFmPowETGyLluT8jPFewgna9iD00TitMDHJE');

export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
       
        // 2) Create checkout form + chanre credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.data.id
        });
    } catch (err) {

        showAlert('error', err);
    }
};
