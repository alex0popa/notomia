import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import UserPool from './userPool';
import { FORM_STYLE } from '../../styles';
import { LoginFormValues } from './types';
import { Container, FormError } from '../customElements';
import { LinkToRegister } from '../links';
import { pattern, required } from './constants';
import { useUserContext } from '../UserContext';

export const Login = () => {
  const navigate = useNavigate();
  const { setUserId } = useUserContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<LoginFormValues>();


  const onSubmit = ({ email, password }: LoginFormValues) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        const { username: userId } = data.getAccessToken().decodePayload();

        setUserId(userId);
        navigate('/my-crypto');
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
      },
    });

    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={FORM_STYLE}>
        <h3 style={{ marginTop: 0 }}>
          Login
        </h3>
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type='submit'>
            Login
          </button>
          <LinkToRegister />
        </div>
      </form>
    </Container>
  );
};
