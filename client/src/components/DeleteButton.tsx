import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { DELETE_POST } from '../graphql/Mutation';

interface IDeleteButtonProps {
  postId: string;
}

const DeleteButton: FC<IDeleteButtonProps> = ({ postId }) => {
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const onCancel = () => setConfirmOpen(false);

  const onClick = () => setConfirmOpen(true);

  const [deletePost] = useMutation(DELETE_POST, {
    update: () => {
      setConfirmOpen(false);
      navigate('/');
    },
    variables: {
      postId,
    },
    awaitRefetchQueries: true,
  });

  return (
    <>
      <Button as="div" color="red" floated="right" onClick={onClick}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={onCancel}
        onConfirm={() => deletePost()}
      />
    </>
  );
};

export default DeleteButton;
