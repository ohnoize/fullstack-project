import { useQuery } from '@apollo/client';
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { CURRENT_USER } from '../graphql/queries';
import { timeParser } from '../utils';
import MySubjects from './MySubjects';
import SessionHistory from './SessionHistory';

const AccountPage = () => {
  const [page, setPage] = useState('sessions');
  const userQuery = useQuery(CURRENT_USER);
  if (userQuery.loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  const currentUser = userQuery.data.me;
  const { sessions, mySubjects } = userQuery.data.me;

  let totalTime = 0;
  if (sessions) {
    if (sessions.length >= 1) {
      totalTime = sessions
        .map((s) => s.totalLength)
        .reduce((a, b) => a + b);
    }
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
    >
      <Typography variant="h3">
        {currentUser.username}
        {' '}
        -
        {' '}
        {currentUser.instrument}
      </Typography>
      <br />
      <Typography variant="caption">
        Member since
        {' '}
        {new Date(currentUser.joined).toLocaleDateString()}
      </Typography>
      <Typography variant="caption">
        Total time practiced:
        {' '}
        {timeParser(totalTime)}
      </Typography>
      <br />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item>
          <Grid container direction="column" alignItems="flex-start" justify="flex-start">
            <Button onClick={() => setPage('sessions')}>Sessions</Button>
            <Button onClick={() => setPage('subjects')}>Subjects practiced</Button>
            <Button onClick={() => setPage('goals')}>My goals</Button>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            {page === 'sessions' ? <SessionHistory sessions={sessions} /> : null}
            {page === 'subjects' ? <MySubjects mySubjects={mySubjects} /> : null}
            {page === 'goals' ? <Typography>My goals</Typography> : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountPage;