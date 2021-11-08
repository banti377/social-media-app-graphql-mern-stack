import { useMutation } from '@apollo/client';
import { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { AuthContext } from '../context/Auth';
import { LIKE_POST } from '../graphql/Mutation';
import { GET_POSTS } from '../graphql/Query';
import { ILike } from '../interfaces';

interface LikeButtonProps {
  post: {
    _id: string;
    likeCount: number;
    likes: ILike[];
  };
}

const LikeButton: FC<LikeButtonProps> = ({
  post: { _id, likeCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username))
      setLiked(true);
    else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId: _id,
    },
    refetchQueries: [GET_POSTS],
    errorPolicy: 'all',
  });

  console.log(liked);

  //   const likePost = () => console.log();

  const likeButton = user ? (
    <Button color="teal" basic={!liked}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      content={liked ? 'Unlike Post' : 'Like Post'}
      inverted
      trigger={
        <Button as="div" labelPosition="right" onClick={() => likePost()}>
          {likeButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
};

export default LikeButton;
