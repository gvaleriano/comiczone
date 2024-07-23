import Stripe from 'stripe';
import { version } from '../../package.json'
export const stripe = new Stripe(
    "sk_test_Ho24N7La5CVDtbmpjc377lJI",
    {
        apiVersion: '2022-08-01',
        appInfo: {
            name: 'ComicZone',
            version
        }
    }
)