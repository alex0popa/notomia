import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import UserPool from './userPool';
import { FORM_STYLE } from '../../styles';
import { Container, FormError } from '../customElements';
import { LinkToLogin } from '../links';
import { pattern, required } from './constants';
import { RegisterFormValues } from './types';


// user, user@tormails.com, password
export const Register = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    register,
    reset
  } = useForm<RegisterFormValues>();

  const validate = {
    passwordConfirmation: (value: string) => (
      getValues('password') === value || "Passwords should match!"
    )
  };

  const onSubmit = ({ email, name, password }: RegisterFormValues) => {
    const userAttribute = [
      new CognitoUserAttribute({ Name: 'name', Value: name })
    ];

    UserPool.signUp(
      email,
      password,
      userAttribute,
      [],
      (err, data) => {
        err && alert(err);

        data && navigate('/confirm-registration');
        
        reset();
      }
    );

  };
  
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}  style={FORM_STYLE}>
        <h3 style={{ marginTop: 0 }}>
          Register
        </h3>
        <input
          placeholder="name"
          {...register('name', { required })}
          type="text"
        />
        <FormError error={errors.name?.message} />
        <input
          placeholder="email"
          type="email"
          {...register('email', { required, pattern })}
        />
        <FormError error={errors.email?.message} />
        <input
          placeholder="password"
          {...register('password', { required })}
          type="password"
        />
        <FormError error={errors.password?.message} />
        <input
          placeholder="confirm assword"
          {...register('passwordVerify', { required, validate })}
          type="password"
        />
        <FormError error={errors.passwordVerify?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit">
            Register
          </button>
          <LinkToLogin />
        </div>
      </form>
    </Container>
  );
};