import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static" style={{ backgroundColor: "white", boxShadow: "none", borderBottom: "1px solid #e0e0e0", fontFamily: "Segoe UI", fontWeight: "bold", fontSize: "0.9rem" }}>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <img src="/FlowLogo.png" alt="Logo" height="50px" />
                <div style={{ marginLeft: "auto" }}>
                    <Button onClick={() => navigate('/taskpage')} style={{textTransform: "none",color: "white",backgroundColor: "orange",borderRadius: "15px",padding: "5px 15px"}} className="specialTab" color="inherit">What do I do?</Button>
                    <Button onClick={() => navigate('/')} style={{textTransform: "none", color: "black"}} >Goal tracker</Button>
                    <Button style={{textTransform: "none", color: "black"}} >Task tracker</Button>
                    <IconButton style= {{color: "black"}} edge="end"  aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
