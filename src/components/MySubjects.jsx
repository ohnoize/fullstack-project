import {
  Card, Grid, makeStyles, Typography,
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

const MySubjects = ({ mySubjects }) => {
  const classes = useStyles();
  const mySubjectsArr = mySubjects.slice();
  return (
    <Grid item>
      <Typography variant="h5">Subjects practiced:</Typography>
      <br />
      {mySubjectsArr
        .sort((a, b) => b.timePracticed - a.timePracticed)
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
  );
};

export default MySubjects;
