import { useQuery } from '@apollo/client';
import { FC } from 'react';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import { GET_POSTS } from '../graphql/Query';
import { IPost } from '../interfaces';

const { Row, Column } = Grid;

const Home: FC = () => {
  const { loading, data } = useQuery(GET_POSTS);

  return (
    <Grid columns={3}>
      <Row className="page-title">
        <h1>Recent Posts</h1>
      </Row>
      <Row>
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          data?.getPosts?.map((post: IPost) => (
            <Column key={post._id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Column>
          ))
        )}
      </Row>
    </Grid>
  );
};

export default Home;
