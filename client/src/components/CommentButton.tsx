import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Popup, Button, Icon, Label } from 'semantic-ui-react';

interface ICommentButtonProps {
  post: {
    _id: string;
    commentCount: number;
  };
}

const CommentButton: FC<ICommentButtonProps> = ({
  post: { _id, commentCount },
}) => {
  return (
    <Popup
      content="Comment on Post"
      inverted
      trigger={
        <Button labelPosition="right" as={Link} to={`/posts/${_id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      }
    />
  );
};

export default CommentButton;
