import moment from 'moment';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import { AuthContext } from '../context/Auth';

import { IPost } from '../interfaces';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

interface PostCardProps {
  post: IPost;
}

const { Content, Meta, Description, Header } = Card;

const PostCard: FC<PostCardProps> = ({
  post: { body, createdAt, _id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Header>{username}</Header>
        <Meta as={Link} to={`/posts/${_id}`}>
          {moment(createdAt).fromNow(true)}
        </Meta>
        <Description>{body}</Description>
      </Content>
      <Content extra>
        <LikeButton post={{ _id, likeCount, likes }} />
        <Button labelPosition="right" as={Link} to={`/posts/${_id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={_id} />}
      </Content>
    </Card>
  );
};

export default PostCard;
