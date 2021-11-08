import { useMutation } from '@apollo/client';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/Auth';
import { REGISTER_USER } from '../graphql/Mutation';
import { IRegisterError } from '../interfaces';

const { Input } = Form;

const Register: FC = () => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState<IRegisterError>({});

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: register }) => {
      context.login(register);
      navigate('/');
    },
    onError: (error: any) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Input
          type="text"
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Email.."
          name="email"
          value={values.email}
          error={errors.email}
          onChange={onChange}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password.."
          name="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
