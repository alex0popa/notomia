import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';

import UserPool from './userPool';
import { LinkToLogin, LinkToRegister } from '../links';
import { Container, FormError } from '../customElements';
import { pattern, required } from './constants';
import { FORM_STYLE } from '../../styles';
import { ConfirmFormValues } from './types';

export const ConfirmRegistration = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<ConfirmFormValues>();

  const onSubmit = ({ email, code }: ConfirmFormValues) => {
    const userData = {
      Username: email,
      Pool: UserPool
    }

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, data) => {
      err && alert(err);

      data && navigate('/my-crypto');

      reset();
    });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLE}>
        <h3 style={{ marginTop: 0 }}>
          Confirm registration
        </h3>
        <input
          placeholder="email"
          type="email"
          {...register('email', { required, pattern })}
        />
        <FormError error={errors.email?.message} />
        <input
          placeholder="code"
          {...register('code', { required })}
          type="text"
          />
        <FormError error={errors.code?.message} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type='submit'>
            Confirm
          </button>
          <LinkToLogin />
          <LinkToRegister />
        </div>
      </form>
    </Container>
  );
};
