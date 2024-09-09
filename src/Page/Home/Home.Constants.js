import { MenuItem, Typography, IconButton , Button } from '@mui/material';
import { IoIosAddCircle } from "react-icons/io";
import { MdEditNote, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

// Action types
export const ACTION_TYPES = [
  'Input Field',
  'Click',
  'Set Dropdown',
  'Sleep',
  'Focus'
];

export const ICON_STYLE = { color: 'rgb(6, 74, 130, 0.9)' };

export const ACTION_MENU_ITEMS = ACTION_TYPES.map(type => (
  <MenuItem key={type} value={type}>{type}</MenuItem>
));

// Icons
export const ADD_ICON = <IoIosAddCircle style={ICON_STYLE} />;
export const EDIT_ICON = <MdEditNote style={ICON_STYLE} />;
export const DELETE_ICON = <MdDelete style={ICON_STYLE} />;
export const VIEW_ICON = <FaEye style={ICON_STYLE} />;

// Pagination settings
export const ITEMS_PER_PAGE = 4;

// Buttons
export const BUTTON_LABELS = {
  CANCEL: 'Cancel',
  SUBMIT: 'Submit',
  UPDATE: 'Update',
  DELETE: 'Delete'
};

// Dialog titles
export const DIALOG_TITLES = {
  EDIT_ACTION: 'Edit Action',
  CREATE_ACTION: 'Create New Action',
  CONFIRM_DELETE: 'Confirm Delete'
};

// Typography
export const TITLE_HEADER = <Typography variant="h4">Web Automa</Typography>;
export const ITEM_TITLE = (text) => <Typography variant="h6">{text}</Typography>;
export const ITEM_LOCATION = (text) => <Typography variant="body2">Location: {text}</Typography>;
export const ITEM_VALUE = (text) => <Typography variant="body2">Value: {text}</Typography>;

// IconButtons
export const ICON_BUTTONS = {  
  ADD: (onClick) => <IconButton size="large" onClick={onClick}>{ADD_ICON}</IconButton>,
  EDIT: (onClick) => <IconButton onClick={onClick}>{EDIT_ICON}</IconButton>,
  DELETE: (onClick) => <IconButton onClick={onClick}>{DELETE_ICON}</IconButton>,
  VIEW: (onClick) => <IconButton onClick={onClick}>{VIEW_ICON}</IconButton>,
};

// Dialog buttons
export const DIALOG_BUTTONS = {
  CANCEL: (onClick) => <Button onClick={onClick}>{BUTTON_LABELS.CANCEL}</Button>,
  SUBMIT: (onClick) => <Button onClick={onClick}>{BUTTON_LABELS.SUBMIT}</Button>,
  UPDATE: (onClick) => <Button onClick={onClick}>{BUTTON_LABELS.UPDATE}</Button>,
  DELETE: (onClick) => <Button onClick={onClick}>{BUTTON_LABELS.DELETE}</Button>
}
