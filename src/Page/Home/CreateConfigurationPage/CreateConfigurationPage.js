import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedForm from './SharedForm'; 

const CreateConfigurationPage = () => {
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      await saveData(actions);
      console.log('Configuration created:', actions);
      setActions([{ action: 'Input Field', dataItem: '', value: '' }]);
      navigate('/configurations');
    } catch (error) {
      console.error('Error creating configuration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {    
    navigate('/configurations');
  };

  return (
    <SharedForm
      formData={{}}
      handleChange={handleActionChange}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
      loading={loading}
      errors={errors}
    />
  );
};

const saveData = async (data) => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default CreateConfigurationPage;
