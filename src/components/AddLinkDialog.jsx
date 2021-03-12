import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddLinkDialog = ({
  subject, open, setOpen, url, setUrl, description, setDescription, handleAddLink,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleUrl = (e) => {
    e.preventDefault();
    setUrl(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add link</DialogTitle>
        <DialogContent>
          {subject ? (
            <DialogContentText>
              Add a new link for subject:
              {' '}
              {subject.name}
            </DialogContentText>
          ) : (
            <DialogContentText>
              Add a new link:
            </DialogContentText>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            value={url}
            onChange={handleUrl}
            type="url"
            fullWidth
          />
          <TextField
            margin="dense"
            id="linkDescription"
            label="Description"
            value={description}
            onChange={handleDescription}
            type="description"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="addLink" onClick={handleAddLink} color="primary">
            Add link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLinkDialog;
