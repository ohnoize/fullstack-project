import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card, Grid, makeStyles, Typography,
} from '@material-ui/core';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import { timeParser } from '../utils';
import AddGoalDialog from './AddGoalDialog';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
  },
  card: {
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
        <Typography variant="h6">Current</Typography>
        <br />
        {goals
          .filter((g) => (new Date(g.deadline) > new Date()))
          .map((g) => (
            <div key={g.description} className={classes.root}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{g.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className={classes.card}>
                    <Typography className={classes.title}>
                      Subject to practice:
                      {' '}
                      {g.subject}
                    </Typography>
                    <br />
                    <Typography className={classes.title}>
                      Amount of time left to practice:
                      {' '}
                      {timeParser(g.targetTime - g.elapsedTime)}
                    </Typography>
                    <br />
                    <Typography className={classes.title}>
                      Deadline:
                      {' '}
                      {new Date(g.deadline).toLocaleDateString()}
                    </Typography>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        <br />
        <Typography variant="h6">Past</Typography>
        {goals
          .filter((g) => new Date(g.deadline) < new Date())
          .map((g) => (
            <div key={g.description} className={classes.root}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{g.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className={classes.card}>
                    <Typography className={classes.title}>
                      Subject to practice:
                      {' '}
                      {g.subject}
                    </Typography>
                    <br />
                    <Typography className={classes.title}>
                      Succeeded?
                      {' '}
                      {g.passed
                        ? <CheckSharpIcon />
                        : <ClearSharpIcon />}
                    </Typography>
                    <br />
                    <Typography className={classes.title}>
                      Deadline:
                      {' '}
                      {new Date(g.deadline).toLocaleDateString()}
                    </Typography>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
      </Grid>
    </>
  );
};

export default Goals;
