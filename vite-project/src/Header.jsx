import React, { useContext} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import MyMap from "./MyMap";
import Guidelines from "./Guidelines";
import RouteTable from "./RouteTable";
import SummaryTables from "./SummaryTables";
import "./Header.css";
//import vt_logo from "./assets/vt-logo2.png"
import vt_logo from "./assets/vt-white.png"


function Header() {
    
    return (
      <>
        <Navbar bg="primary" variant="dark" className="header">
        
          <Container >
          <Navbar.Brand className="main-header">SWEEP</Navbar.Brand>
            <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
            <Nav.Link href="/guidelines" className='nav-link'>Guidelines</Nav.Link>
            <Nav.Link href="/map" className='nav-link'>Map</Nav.Link>
            <Nav.Link href="/route_tables" className='nav-link'>Route Tables</Nav.Link>
            <Nav.Link href="/summary_tables" className='nav-link'>Summary Tables</Nav.Link>
            <img className='logo' style={{ width: 150, height: 40 }} src={vt_logo} alt='VT Logo'></img>
        
          </Container>
      </Navbar>
     <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/guidelines' element={<Guidelines />}></Route>
        <Route path='/map' element={<MyMap />}></Route>
        <Route path='/route_tables' element={<RouteTable />}></Route>
        <Route path='/summary_tables' element={<SummaryTables />}></Route>
      
      </Routes>
    </>
    );
  }
export default Header;  


/*

 {appContext.summaryTableKey==true?<Nav.Link href="/table" className='nav-link'>Summary 1</Nav.Link>:null}


          
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

*/