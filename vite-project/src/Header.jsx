import React, { useContext} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
          <Navbar.Brand className="gap-3">SWEEP</Navbar.Brand>
            <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
            <Nav.Link href="/guidelines" className='nav-link'>Guidelines</Nav.Link>

            <NavDropdown title="Input" id="basic-nav-dropdown">
              <NavDropdown.Item href="/map">Map</NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown title="Output" id="basic-nav-dropdown">
              <NavDropdown.Item href="/route_tables">Route Tables</NavDropdown.Item>
              <NavDropdown.Item href="/summary_tables">Summary Tables</NavDropdown.Item>
              
            </NavDropdown>
            {/* <Nav.Link href="/map" className='nav-link'>Map</Nav.Link>
            <Nav.Link href="/route_tables" className='nav-link'>Route Tables</Nav.Link>
            <Nav.Link href="/summary_tables" className='nav-link'>Summary Tables</Nav.Link> */}
            <img className='logo' src={vt_logo} alt='VT Logo'></img>
        
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


          
            <NavDropdown title="Input" id="basic-nav-dropdown">
              <NavDropdown.Item href="/map">Map</NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown title="Output" id="basic-nav-dropdown">
              <NavDropdown.Item href="/route_tables">Route Tables</NavDropdown.Item>
              <NavDropdown.Item href="/summary_tables">Summary Tables</NavDropdown.Item>
              
            </NavDropdown>

*/