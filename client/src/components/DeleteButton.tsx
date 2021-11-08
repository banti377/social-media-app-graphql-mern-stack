import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';

import { DELETE_COMMENT, DELETE_POST } from '../graphql/Mutation';
import { GET_POST, GET_POSTS } from '../graphql/Query';

interface IDeleteButtonProps {
  postId: string;
  commentId?: string;
}

const DeleteButton: FC<IDeleteButtonProps> = ({ postId, commentId }) => {
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const onCancel = () => setConfirmOpen(false);

  const onClick = () => setConfirmOpen(true);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId,
    },
    refetchQueries: [GET_POSTS],
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: {
      commentId,
      postId,
    },
    refetchQueries: [{ query: GET_POST, variables: { postId } }],
  });

  const onConfirm = () => {
    setConfirmOpen(false);
    commentId ? deleteComment() : deletePost();
    !commentId && navigate('/');
  };

  return (
    <>
      <Popup
        content={commentId ? 'Delete Comment' : 'Delete Post'}
        inverted
        trigger={
          <Button as="div" color="red" floated="right" onClick={onClick}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm open={confirmOpen} onCancel={onCancel} onConfirm={onConfirm} />
    </>
  );
};

export default DeleteButton;
