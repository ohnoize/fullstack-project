import { useQuery } from '@apollo/client';
import {
  Card, Grid, Typography, makeStyles,
} from '@material-ui/core';
import React from 'react';
import { CURRENT_USER, GET_SUBJECTS } from '../graphql/queries';
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
});

const SessionHistory = () => {
  const classes = useStyles();
  // if (!currentUser) return null;
  const userQuery = useQuery(CURRENT_USER);
  const subjects = useQuery(GET_SUBJECTS);
  if (userQuery.loading || subjects.loading) {
    return (
      <div>Loading...</div>
    );
  }
  const { sessions } = userQuery.data.me;
  const { subjectNotes } = userQuery.data.me;
  const currentUser = userQuery.data.me;
  if (!sessions) return null;
  const subjectsPracticed = sessions
    .map((s) => s.individualSubjects.map((i) => i.name))
    .reduce((a, b) => a.concat(b));
  const subjectTimes = sessions.map((s) => s.individualSubjects);

  // Following function finds all the sessions with entered subject and returns it's combined time
  const subjectTimeParser = (subjectName) => {
    const times = subjectTimes.map((s) => s.filter((n) => n.name === subjectName));
    return times
      .filter((t) => t.length > 0)
      .map((t) => t
        .map((s) => s.length)
        .reduce((a, b) => a + b))
      .reduce((a, b) => a + b);
  };
  // console.log(subjectTimeParser('scales'));
  const subjectArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < subjectsPracticed.length; i++) {
    if (!subjectArr.includes(subjectsPracticed[i])) {
      subjectArr.push(subjectsPracticed[i]);
    }
  }
  // console.log(subjectArr);
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
          {subjects.data.allSubjects
            .filter((s) => subjectArr.includes(s.name))
            .map((s) => (
              <Card key={s.id} className={classes.root}>
                <Typography key={s.id} variant="h6">{s.name}</Typography>
                <br />
                <Typography variant="button" className={classes.title}>
                  Total time:
                  {' '}
                  {timeParser(subjectTimeParser(s.name))}
                </Typography>
                <br />
                {subjectNotes
                  .filter((n) => n.subjectID === s.id)
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
