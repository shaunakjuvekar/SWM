import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
    return (
      <Navbar class="header">
        <Container>
          <Navbar.Brand>Solid Waste Management System</Navbar.Brand>
        
        </Container>
      </Navbar>
    );
  }
export default Header;