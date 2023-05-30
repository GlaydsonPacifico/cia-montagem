import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { config } from '../config/config';

export const WooCommerce = new WooCommerceRestApi({
  url: config.URL,
  consumerKey: config.CONSUMER_KEY,
  consumerSecret: config.CONSUMER_SECRET,
  version: 'wc/v3',
  queryStringAuth: true,
  axiosConfig: {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
});
