import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { MdEditNote, MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '' });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false); 
  const popupRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
        setIsDeletePopupOpen(false);
      }
    };

    if (isPopupOpen || isDeletePopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen, isDeletePopupOpen]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const modifiedData = data.slice(0, 2).map(item => ({
        id: item.id,
        title: item.title,
        url: `https://example.com/${item.id}`
      }));
      setItems(modifiedData);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ title: '', url: '' });
    setIsPopupOpen(false);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    setItems(items.filter(item => item.id !== itemToDelete));
    setIsDeletePopupOpen(false);
    setItemToDelete(null);
  };

  const handleEdit = (id) => { console.log('Edit item with ID:', id); };
  const handleView = (url) => { window.open(url, '_blank'); };

  return (
    <div className="home-container">
      <div className="title-header">
        <h2>Configurations</h2>
        <Link className='add-icon' style={{ fontSize: '40px' }} to="/home/create"><IoIosAddCircle /></Link> 
      </div>
      {loading && <div className="spinner" style={{ fontSize: '40px' }}><ImSpinner6 /></div>}
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <div className="item-content">
              <h3>{item.title}</h3>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
            </div>
            <div className="icon-group" style={{ fontSize: '25px' }}>
              <div className='icon' onClick={() => handleView(item.url)}><FaEye /></div>
              <div className='icon' onClick={() => handleEdit(item.id)}><MdEditNote /></div>
              <div className='icon' onClick={() => handleDeleteClick(item.id)}><MdDelete /></div>
            </div>
          </li>
        ))}
      </ul>

      {isPopupOpen && (
        <div className="popup" ref={popupRef}>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              name="url"
              placeholder="URL"
              value={formData.url}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {isDeletePopupOpen && ( 
        <div className="popup" ref={popupRef}>
          <h3>Are you sure you want to delete this item?</h3>
          <div className="icon-group">
            <div className='popup-icon' style={{ fontSize: '50px' }} onClick={confirmDelete}><TiTick /></div>
            <div className='popup-icon' style={{ fontSize: '25px' }} onClick={() => setIsDeletePopupOpen(false)}><ImCross /></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
