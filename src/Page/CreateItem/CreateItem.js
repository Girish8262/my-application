import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedForm from '../SharedForm/SharedForm';

const CreateItem = () => {
  const [actions, setActions] = useState([{ action: 'Input Field', dataItem: '', value: '' }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleActionChange = (index, field, value) => {
    const updatedActions = [...actions];
    updatedActions[index][field] = value;
    setActions(updatedActions);
  };

  const validateForm = () => {
    const newErrors = {};
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted'); 

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await saveData(actions);
      console.log('Actions data:', actions);
      setActions([{ action: 'Input Field', dataItem: '', value: '' }]);
      navigate('/home'); 
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div>
      <SharedForm
        formData={{}}
        handleChange={handleActionChange}
        handleSubmit={handleSubmit}
        handleBack={handleBack}
        loading={loading}
        errors={errors}
      />
    </div>
  );
};

const saveData = async (data) => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default CreateItem;
