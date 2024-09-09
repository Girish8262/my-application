import React from 'react';
import { Button, TextField, Paper, Grid, Typography, IconButton, MenuItem } from '@mui/material';
import { IoArrowBackCircleOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";

const SharedForm = ({ formData, handleChange, handleSubmit, handleBack, handleAddAction, loading, errors }) => {
  const { actions } = formData;

  const isFormValid = () => {
    return actions.every(action => {
      if (action.action === 'Sleep') {
        return action.value.trim() !== '';
      }
      if (action.action === 'Click' || action.action === 'Focus') {
        return action.dataItem.trim() !== '';
      }
      return action.action === 'Input Field' || action.action === 'Set Dropdown'
        ? action.dataItem.trim() !== '' && action.value.trim() !== ''
        : action.dataItem.trim() !== '';
    });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={handleBack} style={{ fontSize: '35px' }}>
            <IoArrowBackCircleOutline />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">Create New Automation</Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        {actions.map((action, index) => (
          <Grid container spacing={2} key={action.id} style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                select
                label="Action"
                variant="outlined"
                value={action.action}
                onChange={(e) => handleChange(index, 'action', e.target.value)}
              >
                <MenuItem value="Input Field">Input Field</MenuItem>
                <MenuItem value="Click">Click</MenuItem>
                <MenuItem value="Set Dropdown">Set Dropdown</MenuItem>
                <MenuItem value="Sleep">Sleep</MenuItem>
                <MenuItem value="Focus">Focus</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={5}>
              {action.action === 'Sleep' ? (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Enter Duration in Milliseconds"
                  variant="outlined"
                  type="number"
                  value={action.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                  InputProps={{
                    startAdornment: <IoTimeOutline style={{ marginRight: '5px' }} />,
                  }}
                />
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  label={action.dataItem ? "" : "Enter location; eg:- #data-item"}
                  variant="outlined"
                  value={action.dataItem}
                  onChange={(e) => handleChange(index, 'dataItem', e.target.value)}
                  InputProps={{
                    startAdornment: <IoLocationOutline style={{ marginRight: '5px' }} />,
                  }}
                />
              )}
            </Grid>
            {(action.action === 'Input Field' || action.action === 'Set Dropdown') && (
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Enter New Value"
                  variant="outlined"
                  value={action.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              </Grid>
            )}
          </Grid>
        ))}
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={10} sm={5} style={{ textAlign: 'left' }}>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginTop: '10px' }}
              onClick={handleAddAction}
            >
              Add New Action
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              disabled={loading || !isFormValid()}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SharedForm;
