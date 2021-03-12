import React from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Accordion, AccordionDetails, AccordionSummary, Card, makeStyles, Typography,
} from '@material-ui/core';
import { timeParser } from '../utils';

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

const GoalsDialog = ({
  goals, open, setOpen, handleStart,
}) => {
  const classes = useStyles();
  if (!goals) return null;
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubject = (subject) => {
    handleStart(subject);
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">My goals</DialogTitle>
        <DialogContent>
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
                      <Button size="small" onClick={() => handleSubject(g.subject)}>Start practicing</Button>
                    </Card>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GoalsDialog;
