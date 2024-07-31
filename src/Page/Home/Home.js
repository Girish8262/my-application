import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { MdEditNote, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
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
      const modifiedData = data.slice(0, 3).map(item => ({
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

  const titleUrl = 'https://example.com/title-url';   // Dummy title URL

  return (
    <div className="home-container">
      <div className="title-header">
        <div>
        <h2>Web Automa</h2>
        <p className="title-url">{titleUrl}</p>
        </div>

        <Link className='add-icon' to="/home/create">
          <IconButton size="large">
            <IoIosAddCircle style={{ color: 'rgb(6, 74, 130, 0.9)' }} />
          </IconButton>
        </Link>
      </div>

      {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}

      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <div className="item-content">
              <h3>{item.title}</h3>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
            </div>
            <div className="icon-group">
              <IconButton onClick={() => handleView(item.url)}><FaEye style={{ color: 'rgb(6, 74, 130, 0.9)' }} /></IconButton>
              <IconButton onClick={() => handleEdit(item.id)}><MdEditNote style={{ color: 'rgb(6, 74, 130, 0.9)' }} /></IconButton>
              <IconButton onClick={() => handleDeleteClick(item.id)}><MdDelete style={{ color: 'rgb(6, 74, 130, 0.9)' }} /></IconButton>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="url"
              label="URL"
              type="url"
              fullWidth
              variant="standard"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPopupOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeletePopupOpen} onClose={() => setIsDeletePopupOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="primary">Confirm</Button>
          <Button onClick={() => setIsDeletePopupOpen(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
