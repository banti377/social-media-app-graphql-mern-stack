import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { CREATE_POST } from '../graphql/Mutation';
import { GET_POSTS } from '../graphql/Query';

const { Input } = Form;

const PostForm: FC = () => {
  const [values, setValues] = useState({ body: '' });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update: () => {
      setValues({ body: '' });
    },
    errorPolicy: 'all',
    refetchQueries: [GET_POSTS],
    variables: values,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <Form onSubmit={onSubmit}>
      <h1>Create Post:</h1>
      <Input
        placeholder="Say something.."
        name="body"
        onChange={onChange}
        value={values.body}
        error={error?.message}
      />
      <Button style={{ marginBottom: error && 20 }} type="submit" color="teal">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
