import { Divider } from 'antd';
import React from 'react';
import { Nav, Navbar, Form, FormControl ,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components';
const Styles = styled.div`
  .navbar { background-color: #6842bc; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: #efefef; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    font-weight:bold;
    cursor:pointer;
    &:hover { color: #efefef; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
  .vl {
    border-left: 2px solid #ffffff40;
    height: 20px;
    margin-top: 10px;

  }
`;
const NavBar = (props) => (
  <Styles>
   <Navbar variant="dark">
    <Navbar.Brand onClick={()=>props.history.push('/')}>LuckyDraw</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={()=>props.history.push('/')}>Winner</Nav.Link>
      <div class="vl"></div>
      <Nav.Link onClick={()=>props.history.push('/winnerList')}>List</Nav.Link>
      
    </Nav>
    <Form inline>
     
    </Form>
  </Navbar>
  </Styles>
)

export default withRouter(NavBar);