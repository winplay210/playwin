import React from 'react';
import { Nav, Navbar, Form, FormControl ,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components';
const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
const NavBar = (props) => (
  <Styles>
   <Navbar bg="primary" variant="dark">
    <Navbar.Brand onClick={()=>props.history.push('/')}>LuckyDraw</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={()=>props.history.push('/')}>Winner</Nav.Link>
      <Nav.Link onClick={()=>props.history.push('/winnerList')}>List</Nav.Link>
      
    </Nav>
    <Form inline>
     
    </Form>
  </Navbar>
  </Styles>
)

export default withRouter(NavBar);