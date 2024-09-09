import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAction } from '../../../features/automationSlice/automationSlice';
import SharedForm from '../SharedForm/SharedForm';
import styles from './CreateItem.module.css';

const CreateItem = () => {
  const [actions, setActions] = useState([{ id: Date.now(), action: 'Input Field', dataItem: '', value: '' }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleActionChange = (index, field, value) => {
    setActions(prevActions => {
      const updatedActions = [...prevActions];
      if (updatedActions[index]) {
        updatedActions[index][field] = value;
      }
      return updatedActions;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      actions.forEach(action => dispatch(addAction(action)));
      setActions([{ id: Date.now(), action: 'Input Field', dataItem: '', value: '' }]);
      navigate('/home');
    } catch (error) {
      console.error('Error creating configuration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleAddAction = () => {
    setActions(prevActions => [
      ...prevActions,
      { id: Date.now(), action: 'Input Field', dataItem: '', value: '' }
    ]);
  };

  return (
    <div className={styles.createContainer}>
      <SharedForm
        formData={{ actions }}
        handleChange={handleActionChange}
        handleSubmit={handleSubmit}
        handleBack={handleBack}
        handleAddAction={handleAddAction}
        loading={loading}
        errors={errors}
      />
    </div>
  );
};

export default CreateItem;
