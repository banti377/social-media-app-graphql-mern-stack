import moment from 'moment';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';

import { IPost } from '../interfaces';

interface PostCardProps {
  post: IPost;
}

const { Content } = Card;

const PostCard: FC<PostCardProps> = ({
  post: { body, createdAt, _id, username, likeCount, commentCount, likes },
}) => {
  const likePost = () => console.log();

  const commentOnPost = () => console.log();

  return (
    <Card fluid>
      <Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${_id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Content>
      <Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Content>
    </Card>
  );
};

export default PostCard;
