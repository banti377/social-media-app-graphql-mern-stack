import { useQuery } from '@apollo/client';
import moment from 'moment';
import { FC, useContext } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/Auth';

import { GET_POST } from '../graphql/Query';
import { IPost } from '../interfaces';

const { Row, Column } = Grid;

const { Content, Header, Meta, Description } = Card;

const SinglePost: FC = () => {
  const { postId } = useParams();

  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(GET_POST, { variables: { postId } });

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
        </Column>
      </Row>
    </Grid>
  );
};

export default SinglePost;
