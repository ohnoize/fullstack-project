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
  text1: {
    fontSize: 25
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    margin: 5
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

  const totalTime = sessions.data.allSessions
    .map(s => s.totalLength)
    .reduce((a, b) => a + b);

  console.log(totalTime);
  return (
    <Grid 
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
    >
    
    <Typography variant='h3'>{currentUser.username} - {currentUser.instrument}</Typography>
    <br />
    <Typography variant='caption'>Member since {new Date(currentUser.joined).toLocaleDateString()}</Typography>
    <Typography variant='caption'>Total time practiced: {timeParser(totalTime)}</Typography>
    <br />
    <Typography variant='h5'>Your previous sessions</Typography>
    <br />
    <Box>
      {sessions.data.allSessions.map((s, index) => 
        <Card key={index} className={classes.root}>
          <Typography className={classes.title}>{new Date(s.date).toLocaleDateString()}</Typography>
          <Typography className={classes.title}>Total length: {timeParser(s.totalLength)}</Typography>
          <Typography className={classes.title}>Subjects practiced:</Typography>
            {s.individualSubjects.map((i, index) => 
              <ul key={index}><Typography className={classes.title} key={index}>{i.name} {timeParser(i.length)}</Typography></ul>
            )}
          <Typography className={classes.title}>Notes: {s.notes}</Typography>
        </Card>
      )}
    </Box>
    </Grid>
  )
}

export default SessionHistory;