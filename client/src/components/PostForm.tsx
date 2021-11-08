import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { CREATE_POST } from '../graphql/Mutation';
import { GET_POSTS } from '../graphql/Query';

const { Input } = Form;

const PostForm: FC = () => {
  const [values, setValues] = useState({ body: '' });

  const [createPost] = useMutation(CREATE_POST, {
    update: () => {
      setValues({ body: '' });
    },
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
      />
      <Button type="submit" color="teal" disabled={values.body.trim() === ''}>
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
