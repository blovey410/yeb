import { request } from '../utils/service';

const initMenu = (router, store) => {
  if (store.routers.length > 0) {
    return;
  }
  request('system/config/menu', 'get');
};
