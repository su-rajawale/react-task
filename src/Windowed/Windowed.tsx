import React, { useState, useEffect, SetStateAction } from 'react'
import Draggable from 'react-draggable';
import './Windowed.css'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import CropDinIcon from '@mui/icons-material/CropDin';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';


function Windowed() {
  const [isDraggable, setIsDraggable] = useState(true)
  const [menuItem, setMenuItem] = useState<null | HTMLElement>(null);
  const open = Boolean(menuItem);
  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setMenuItem(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuItem(null);
  };

  const eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  return (
    <div style={{ height: '80vh', width: '100%', padding: '24px', position: 'relative' }} className="schema-builder">
      <Draggable
        axis={isDraggable ? 'both' : 'none'}
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[5, 5]}
        scale={1}
      >
        <div className={isDraggable ? 'drag' : 'maximized'}>
          <div className="handle">
            <span className='window-title'>Drag from here</span>
            <IconButton size='small' className='window-btn'><RemoveOutlinedIcon fontSize='inherit' /></IconButton>
            <span onClick={() => { setIsDraggable((prev) => !prev) }}>{isDraggable ? (<IconButton size='small' className='window-btn'><CropDinIcon fontSize='inherit' /></IconButton>) : (<IconButton size='small' className='window-btn'><FilterNoneOutlinedIcon fontSize='inherit' /></IconButton>)}</span>
            <IconButton size='small' className='window-btn'><CloseOutlinedIcon fontSize='inherit' /></IconButton>
          </div>
          <div className='menu'>
            <List sx={{ display: 'flex', padding: '0', borderInline: '1px solid #b8b8b8' }}>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <ListItemButton
                  dense
                  component="a"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event) => handleMenuClick(event)}
                >
                  <ListItemText primary="File" />
                </ListItemButton>
                <Menu
                  id="basic-menu"
                  anchorEl={menuItem}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><NoteAddOutlinedIcon /></ListItemIcon>
                    <ListItemText>New</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><FileOpenOutlinedIcon /></ListItemIcon>
                    <ListItemText>Open File</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><SaveOutlinedIcon /></ListItemIcon>
                    <ListItemText>Save</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><SaveAsOutlinedIcon /></ListItemIcon>
                    Save As
                  </MenuItem>
                </Menu>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <ListItemButton dense component="a">
                  <ListItemText primary="Edit" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <ListItemButton dense component="a">
                  <ListItemText primary="Help" />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
          <div className='window-content' contentEditable>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tempora modi voluptatem harum quae tenetur nemo ducimus enim consequuntur illum provident distinctio autem veritatis aspernatur aut, unde cumque accusantium pariatur.</p>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Windowed
