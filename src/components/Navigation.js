import React from 'react'
import { Navbar, Nav, Form, NavDropdown, FormControl, Button } from 'react-bootstrap';

const Navigation = ({ logout, user }) => {
    return (
        <>
            <Navbar expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/">OurAppName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="active" href="/">Home</Nav.Link>
                        {user&&(
                            <>
                                <Nav.Link href="#link">Profile</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>    
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation
