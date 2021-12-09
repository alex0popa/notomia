export const required = 'This field is required';

export const pattern = {
  value: /^\w+([.-]?\w+)*@\w{2}([.-]?\w+)*(\.\w{2,3})+$/,
  message: 'Invalid email address'
};
