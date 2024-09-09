import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addAction, updateAction, removeAction } from '../../features/automationSlice/automationSlice';
import styles from './Home.module.css';
import { ACTION_MENU_ITEMS, ICON_BUTTONS, TITLE_HEADER, ITEM_TITLE, ITEM_LOCATION, ITEM_VALUE, DIALOG_BUTTONS, DIALOG_TITLES, ITEMS_PER_PAGE } from './Home.Constants';

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.automation);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ action: '', dataItem: '', value: '' });
  const [editingItemId, setEditingItemId] = React.useState(null);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [loading] = React.useState(false);
  const [viewItem, setViewItem] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const popupRef = React.useRef(null);

  React.useEffect(() => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItemId) {
      dispatch(updateAction({ ...formData, id: editingItemId }));
      setEditingItemId(null);
    } else {
      dispatch(addAction({ ...formData, id: Date.now() }));
    }
    setFormData({ action: '', dataItem: '', value: '' });
    setIsPopupOpen(false);
    setIsEditing(false);
  };

  const handleEditClick = (item) => {
    setFormData({ action: item.action, dataItem: item.dataItem, value: item.value });
    setEditingItemId(item.id);
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  const handleViewClick = (item) => {
    setViewItem(item);
    setIsEditing(false);
    setIsPopupOpen(true);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    dispatch(removeAction(itemToDelete));
    setIsDeletePopupOpen(false);
    setItemToDelete(null);
  };

  const sortedItems = [...items].sort((a, b) => a.id - b.id);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, endIndex);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.titleHeader}>
        <div>
          {TITLE_HEADER}
        </div>
        <Link className={styles.addIcon} to="/home/create">
          {ICON_BUTTONS.ADD(() => {})}
        </Link>
      </div>
      {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
      <ul className={styles.itemList}>
        {paginatedItems.map(item => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemContent}>
              {ITEM_TITLE(item.action)}
              {ITEM_LOCATION(item.dataItem)}
              {(item.action === 'Input Field' || item.action === 'Set Dropdown') && ITEM_VALUE(item.value)}
            </div>
            <div className={styles.iconGroup}>
              {ICON_BUTTONS.VIEW(() => handleViewClick(item))}
              {ICON_BUTTONS.EDIT(() => handleEditClick(item))}
              {ICON_BUTTONS.DELETE(() => handleDeleteClick(item.id))}
            </div>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(items.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
        />
      </div>
      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)} ref={popupRef}>
        <DialogTitle>{editingItemId ? DIALOG_TITLES.EDIT_ACTION : DIALOG_TITLES.CREATE_ACTION}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ display: viewItem && !isEditing ? 'none' : 'block' }}>
            <TextField
              autoFocus
              margin="dense"
              name="action"
              label="Action"
              type="text"
              fullWidth
              variant="standard"
              select
              value={formData.action}
              onChange={handleChange}
              disabled={!isEditing}
            >
              {ACTION_MENU_ITEMS}
            </TextField>
            <TextField
              margin="dense"
              name="dataItem"
              label="Enter location; eg:- #data-item"
              type="text"
              fullWidth
              variant="standard"
              value={formData.dataItem}
              onChange={handleChange}
              required
              disabled={!isEditing}
            />
            {(formData.action === 'Input Field' || formData.action === 'Set Dropdown') && (
              <TextField
                margin="dense"
                name="value"
                label="Enter New Value"
                type="text"
                fullWidth
                variant="standard"
                value={formData.value}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            )}
            <DialogActions>
              {DIALOG_BUTTONS.CANCEL(() => setIsPopupOpen(false))}
              {DIALOG_BUTTONS.SUBMIT(() => handleSubmit())}
              {editingItemId && DIALOG_BUTTONS.UPDATE(() => handleSubmit())}
            </DialogActions>
          </form>
          {viewItem && !isEditing && (
            <div>
              <Typography variant="body1"><strong>Action:</strong> {viewItem.action}</Typography>
              <Typography variant="body1"><strong>Location:</strong> {viewItem.dataItem}</Typography>
              {(viewItem.action === 'Input Field' || viewItem.action === 'Set Dropdown') && (
                <Typography variant="body1"><strong>Value:</strong> {viewItem.value}</Typography>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isDeletePopupOpen} onClose={() => setIsDeletePopupOpen(false)}>
        <DialogTitle>{DIALOG_TITLES.CONFIRM_DELETE}</DialogTitle>
        <DialogActions>
          {DIALOG_BUTTONS.CANCEL(() => setIsDeletePopupOpen(false))}
          {DIALOG_BUTTONS.DELETE(() => confirmDelete())}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Home;
