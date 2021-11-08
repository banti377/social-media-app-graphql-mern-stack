import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from 'semantic-ui-react';

import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/Auth';
import { CREATE_COMMENT } from '../graphql/Mutation';
import { GET_POST } from '../graphql/Query';
import { IComment, IPost } from '../interfaces';

const { Row, Column } = Grid;

const { Input } = Form;

const { Content, Header, Meta, Description } = Card;

const SinglePost: FC = () => {
  const { postId } = useParams();

  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const { data, loading } = useQuery(GET_POST, { variables: { postId } });

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body: comment,
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setComment(event.target.value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComment('');
    createComment();
  };

  if (loading && !data) {
    return <p>Loading Post...</p>;
  }

  const {
    _id,
    comments,
    likes,
    username,
    body,
    commentCount,
    likeCount,
    createdAt,
  }: IPost = data.getPost;

  return (
    <Grid style={{ marginTop: 1 }}>
      <Row>
        <Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="small"
            floated="right"
          />
        </Column>
        <Column width={10}>
          <Card fluid>
            <Content>
              <Header>{username}</Header>
              <Meta>{moment(createdAt).fromNow(true)}</Meta>
              <Description>{body}</Description>
            </Content>
            <hr />
            <Content extra>
              <LikeButton post={{ _id, likeCount, likes }} />
              <Button labelPosition="right" as="div">
                <Button color="blue" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={_id} />
              )}
            </Content>
          </Card>
          {user && (
            <Card fluid>
              <Content>
                <p>Post a comment:</p>
                <Form onSubmit={onSubmit} noValidate>
                  <Input
                    placeholder="Write comment..."
                    name="comment"
                    type="text"
                    onChange={onChange}
                    value={comment}
                  />
                  <Button
                    type="submit"
                    color="teal"
                    disabled={comment.trim() === ''}
                  >
                    Submit
                  </Button>
                </Form>
              </Content>
            </Card>
          )}
          {comments.map((comment: IComment) => (
            <Card fluid key={comment._id}>
              <Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={_id} commentId={comment._id} />
                )}
                <Header>{comment.username}</Header>
                <Meta>{moment(comment.createdAt).fromNow(true)}</Meta>
                <Description>{comment.body}</Description>
              </Content>
            </Card>
          ))}
        </Column>
      </Row>
    </Grid>
  );
};

export default SinglePost;
