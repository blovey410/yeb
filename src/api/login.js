import { request } from '../utils/service';

export const loadCode = method => {
  return request(
    {
      url: '/captcha?time=' + new Date(),
    },
    method
  );
};
export const login = (data, method) => {
  return request(
    {
      url: '/login',
      data,
    },
    method
  );
};
