import { useQuery } from '@apollo/client';
import { FC, useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/Auth';
import { GET_POSTS } from '../graphql/Query';
import { IPost } from '../interfaces';

const { Row, Column } = Grid;

const Home: FC = () => {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(GET_POSTS, { fetchPolicy: 'no-cache' });

  return (
    <Grid columns={3}>
      <Row className="page-title">
        <h1>Recent Posts</h1>
      </Row>
      <Row>
        {user && (
          <Column>
            <PostForm />
          </Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          <Transition.Group>
            {data?.getPosts?.map((post: IPost) => (
              <Column key={post._id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Column>
            ))}
          </Transition.Group>
        )}
      </Row>
    </Grid>
  );
};

export default Home;
