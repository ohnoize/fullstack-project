import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card, Grid, IconButton, makeStyles, Typography,
} from '@material-ui/core';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { timeParser } from '../utils';
import AddGoalDialog from './AddGoalDialog';
import ConfirmDialog from './Confirm';
import { DELETE_GOAL } from '../graphql/mutations';

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
    margin: 2,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
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
  const [confirmText, setConfirmText] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [goalID, setGoalId] = useState('');
  const [deleteGoal] = useMutation(DELETE_GOAL);

  const handleConfirmDelete = (idToDelete) => {
    setGoalId(idToDelete);
    setConfirmText('Delete this goal?');
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    setConfirmOpen(false);
    deleteGoal({ variables: { goalID, userID: id } });
  };

  const pastGoals = goals.filter((g) => new Date(g.deadline) < new Date());

  return (
    <>
      <AddGoalDialog
        open={addGoalOpen}
        setOpen={setAddGoalOpen}
        subjects={subjects}
        id={id}
        snack={snack}
      />
      <ConfirmDialog
        confirmText={confirmText}
        setOpen={setConfirmOpen}
        open={confirmOpen}
        action={handleDelete}
      />

      <Grid item>
        <Typography variant="h5">My Goals</Typography>
        <Button className={classes.button} id="addLink-button" variant="text" size="small" onClick={() => setAddGoalOpen(true)}>Add goal</Button>
        <br />
        {goals.length < 1 ? null
          : (
            <>
              <Typography variant="h6">Active</Typography>
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
                          <br />
                          <IconButton onClick={() => handleConfirmDelete(g.id)} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Card>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              <br />
              {pastGoals.length < 1 ? null : (
                <>
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
                </>
              )}

            </>
          )}

      </Grid>
    </>
  );
};

export default Goals;
