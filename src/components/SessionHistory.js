import { useQuery } from '@apollo/client';
import { Box, Card, Container, Grid, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { GET_SESSIONS } from '../graphql/queries';
import { timeParser } from '../utils';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    padding: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SessionHistory = ({ currentUser }) => {
  const classes = useStyles();
  if (!currentUser) return null;
  const sessions = useQuery(GET_SESSIONS, {
    variables: { userID: currentUser.id }
  });
  if (sessions.loading) {
    return (
      <div>Loading...</div>
    )
  }
  console.log(sessions.data.allSessions);
  return (
    <Grid 
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
    <Typography variant='h5'>Previous sessions of {currentUser.username}</Typography>
    <Box>
      {sessions.data.allSessions.map((s, index) => 
        <Card key={index} className={classes.root}>
          <Typography className={classes.title}>{new Date(s.date).toLocaleDateString()}</Typography>
          <Typography className={classes.bullet}>Notes: {s.notes}</Typography>
          <Typography className={classes.bullet}>Total length: {timeParser(s.totalLength)}</Typography>
          <Typography className={classes.title}>Subjects practiced:</Typography>
            {s.individualSubjects.map((i, index) => 
              <Typography className={classes.bullet} key={index}>{i.name} {timeParser(i.length)}</Typography>
            )}
        </Card>
      )}
    </Box>
    </Grid>
  )
}

export default SessionHistory;