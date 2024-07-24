import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; 
import './CreateItem.css';
import { IoEnter } from "react-icons/io5";

const CreateItem = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ title: '', description: '' });
  };
  const handleBack = () => {
    navigate('/home'); 
  };

  return (
    <div className="create-container">
      <div className="create-item-container">
      <div className='back-icon' style={{ fontSize: '35px' }} onClick={handleBack}> <IoArrowBackCircleOutline /> </div>
        <h2>Create New Item : </h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className="submit-icon" style={{ fontSize: '40px' }} onClick={handleSubmit} ><IoEnter /> </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
