export type LoginFormValues = {
  email: string,
  password: string
};

export type RegisterFormValues = LoginFormValues & {
  name: string,
  passwordVerify: string
};

export type ConfirmFormValues = {
  email: string,
  code: string
};
