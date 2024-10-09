import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Routes, Route, Link} from "react-router-dom";
import Home from "./Home";
import MyMap from "./MyMap";
import CSVInput from "./CSVInput";
import Feasibility from "./Feasibility";
import Guidelines from "./Guidelines";
import RouteTable from "./RouteTable";
import SummaryTables from "./SummaryTables";
import BingMap from "./BingMap";
import "./Header.css";
import vt_logo from "./assets/vt-white.png"

function Header() {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="md" className="header">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="gap-3">SWEEP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className='nav-link'>Home</Nav.Link>
                            <Nav.Link as={Link} to="/guidelines" className='nav-link'>Guidelines</Nav.Link>
                            <Nav.Link as={Link} to="/bing-map" className='nav-link'>Bing Map</Nav.Link>
                            <NavDropdown title="Input" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/map">Map</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/csv_input">CSV Input</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Output" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/route_tables">Route Tables</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/summary_tables">Summary Tables</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <img className='logo' src={vt_logo} alt='VT Logo'></img>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/guidelines'>
                    <Route index element={<Guidelines />} />
                    <Route path="feasibility" element={<Feasibility />}></Route>
                </Route>
                <Route path='/bing-map' element={<BingMap />}></Route>
                <Route path='/map' element={<MyMap />}></Route>
                <Route path='/csv_input' element={<CSVInput />}></Route>
                <Route path='/route_tables' element={<RouteTable />}></Route>
                <Route path='/summary_tables' element={<SummaryTables />}></Route>
            </Routes>
        </>
    );
}

export default Header;
