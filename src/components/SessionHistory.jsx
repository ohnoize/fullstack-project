import {
  Card, Grid, Typography, makeStyles,
} from '@material-ui/core';
import React from 'react';
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

const SessionHistory = ({ sessions }) => {
  const classes = useStyles();
  // if (!currentUser) return null;
  if (!sessions) return null;
  const sessionsArr = sessions.slice();
  return (
    <Grid item>
      <Typography variant="h5">Sessions:</Typography>
      {sessionsArr
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((s) => (
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
            {s.notes
              ? (
                <Typography className={classes.title}>
                  Notes:
                  {' '}
                  {s.notes}
                </Typography>
              ) : null}

          </Card>
        ))}
    </Grid>

  );
};

export default SessionHistory;
