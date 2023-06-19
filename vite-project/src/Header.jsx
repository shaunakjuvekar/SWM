import React, { useContext} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import MyMap from "./MyMap";
import Table from "./Table";
import "./Header.css";
import vt_logo from "./assets/vt-logo2.png"


function Header() {
    
    return (
      <>
        <Navbar bg="primary" variant="dark" className="header">
          <Container>
            <Navbar.Brand className="main-header">Solid Waste Management System</Navbar.Brand>
            <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
            <Nav.Link href="/map" className='nav-link'>Enter Map</Nav.Link>
            <Nav.Link href="/table" className='nav-link'>Summary 1</Nav.Link>
            <img style={{ width: 150, height: 40 }} src={vt_logo} alt='VT Logo'></img>
          </Container>
      </Navbar>
     <Routes>
     <Route path='/' element={<Home />}></Route>
      <Route path='/map' element={<MyMap />}></Route>

      <Route path='/table' element={<Table />}></Route>
      
      </Routes>
    </>
    );
  }
export default Header;  


/*

 {appContext.summaryTableKey==true?<Nav.Link href="/table" className='nav-link'>Summary 1</Nav.Link>:null}



*/