import { useMutation } from '@apollo/client';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Button, Message } from 'semantic-ui-react';
import { AuthContext } from '../context/Auth';
import { LOGIN_USER } from '../graphql/Mutation';
import { ILoginError } from '../interfaces';

const { Input } = Form;

const Login: FC = () => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState<ILoginError>({});

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login } }) => {
      context.login(login);
      navigate('/');
    },
    onError: (error: any) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
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
          type="password"
          label="Password"
          placeholder="Password.."
          name="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {errors.general && (
        <Message negative list={[Object.values(errors.general)]} />
      )}
    </div>
  );
};

export default Login;
