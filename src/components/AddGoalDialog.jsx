import React, { useState } from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../graphql/mutations';

const AddGoalDialog = ({
  open, setOpen, subjects, id, snack,
}) => {
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [targetTime, setTargetTime] = useState(0);

  const [addGoal] = useMutation(ADD_GOAL);

  if (!subjects) return null;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubject = (e) => {
    e.preventDefault();
    setSubject(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleTargetTime = (e) => {
    e.preventDefault();
    setTargetTime(e.target.value);
  };

  const handleAddGoal = () => {
    const goal = {
      description,
      subject,
      deadline: deadline.toISOString(),
      targetTime: parseInt(targetTime, 10) * 3600,
    };
    const entry = {
      id,
      goal,
    };
    addGoal({ variables: { ...entry } });
    setDescription('');
    setSubject('');
    setTargetTime(0);
    setDeadline(null);
    handleClose();
    snack(true);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add goal</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="goalDescription"
              label="Description: (e.g. Practice chords for 10 hours this week)"
              value={description}
              onChange={handleDescription}
              type="description"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="subject-label">Choose subject</InputLabel>
              <Select
                labelId="subject-label"
                id="goalSubjectMenu"
                value={subject}
                onChange={handleSubject}
              >
                {subjects
                  .map((s) => <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="targetTime"
              label="Amount of hours"
              value={targetTime}
              onChange={handleTargetTime}
              type="number"
            />
            <br />
            <DateTimePicker
              variant="dialog"
              margin="normal"
              id="date-picker-inline"
              label="Choose deadline"
              value={deadline}
              onChange={setDeadline}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button id="addGoalButton" onClick={handleAddGoal} color="primary">
              Add goal
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default AddGoalDialog;
