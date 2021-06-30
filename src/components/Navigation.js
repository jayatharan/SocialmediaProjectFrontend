import React from 'react'
import { Navbar, Nav, Form, NavDropdown, FormControl, Button } from 'react-bootstrap';

const Navigation = () => {
    return (
        <>
            <Navbar expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="#home">OurAppName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link className="active" href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Profile</Nav.Link>
                    <NavDropdown title="Jayatharan" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>  
        </>
    )
}

export default Navigation
