import {
  Button,
  Card, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import AddGoalDialog from './AddGoalDialog';

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

const Goals = ({
  goals, subjects, id, snack,
}) => {
  const classes = useStyles();
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  return (
    <>
      <AddGoalDialog
        open={addGoalOpen}
        setOpen={setAddGoalOpen}
        subjects={subjects}
        id={id}
        snack={snack}
      />

      <Grid item>
        <Typography variant="h5">My Goals</Typography>
        <Button id="addLink-button" variant="text" size="small" onClick={() => setAddGoalOpen(true)}>Add goal</Button>
        <br />
        <Typography variant="h6">Open</Typography>
        {goals
          .filter((g) => !g.passed)
          .map((g) => (
            <Card key={g.description} className={classes.root}>
              <Typography variant="body2">{g.description}</Typography>
            </Card>
          ))}
        <br />
        <Typography variant="h6">Passed</Typography>
        {goals
          .filter((g) => g.passed)
          .map((g) => (
            <Card key={g.description} className={classes.root}>
              <Typography variant="body2">{g.description}</Typography>
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default Goals;
