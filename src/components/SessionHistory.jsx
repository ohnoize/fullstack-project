import { useQuery } from '@apollo/client';
import {
  Card, Grid, Typography, makeStyles, CircularProgress,
} from '@material-ui/core';
import React from 'react';
import { CURRENT_USER } from '../graphql/queries';
import { timeParser } from '../utils';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    padding: 10,
  },
  text1: {
    fontSize: 25,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    margin: 5,
  },
  pos: {
    marginBottom: 12,
  },
  centerScreen: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 100,
  },
});

const SessionHistory = () => {
  const classes = useStyles();
  // if (!currentUser) return null;
  const userQuery = useQuery(CURRENT_USER);
  if (userQuery.loading) {
    return (
      <div className={classes.centerScreen}>
        <CircularProgress />
      </div>
    );
  }

  const { sessions } = userQuery.data.me;
  const { mySubjects } = userQuery.data.me;
  const currentUser = userQuery.data.me;
  if (!sessions) return null;

  let totalTime = 0;
  if (sessions) {
    if (sessions.length >= 1) {
      totalTime = sessions
        .map((s) => s.totalLength)
        .reduce((a, b) => a + b);
    }
  }

  // console.log(sessions.data.allSessions);
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
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
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h5">Sessions:</Typography>
          {sessions.map((s) => (
            <Card key={s.id} className={classes.root}>
              <Typography
                variant="h6"
              >
                {new Date(s.date).toLocaleDateString()}
              </Typography>
              <Typography className={classes.title}>
                Total length:
                {' '}
                {timeParser(s.totalLength)}
              </Typography>
              <Typography variant="button" className={classes.title}>Subjects practiced:</Typography>
              {s.individualSubjects.map((i) => (
                <ul key={i.name}>
                  <Typography className={classes.title}>
                    {i.name}
                    {' '}
                    {timeParser(i.length)}
                  </Typography>
                </ul>
              ))}
              <Typography className={classes.title}>
                Notes:
                {' '}
                {s.notes}
              </Typography>
            </Card>
          ))}
        </Grid>
        <Grid item>
          <Typography variant="h5">Subjects practiced:</Typography>
          <br />
          {mySubjects
            .map((s) => (
              <Card key={s.subjectID} className={classes.root}>
                <Typography key={s.id} variant="h6">{s.subjectName}</Typography>
                <br />
                <Typography variant="button" className={classes.title}>
                  Total time:
                  {' '}
                  {timeParser(s.timePracticed)}
                </Typography>
                <br />
                {s.subjectNotes
                  .map((n) => (
                    <Typography variant="body2" key={n.date} className={classes.title}>
                      {new Date(n.date).toLocaleDateString()}
                      :
                      {' '}
                      {n.notes}
                    </Typography>
                  ))}
              </Card>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SessionHistory;
