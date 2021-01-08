import React,{useState} from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from "../components/login/login";
import ListWinners from "../components/list/list"
import Home from "../components/home/home"
import Navbar from "../components/Navbar/navbar"
import ChangePass from "../components/changePass/changePass"

import WinnerNumber from './winnerNumber/winnerNumber';
import '../App.css';
//routes

const Routes = () => {


  function PrivateRoute({ children, ...rest }) {
    const token = localStorage.getItem('accessToken');


    return (
      <Route
        {...rest}
        render={({ location }) =>

          token ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/login/for/admin",
                  state: { from: location }
                }}
              />
            )
        }
      />
    );
  }


  const isAuthenticated = () => {
    let val = localStorage.getItem("accessToken");
    if (val) {
      if (val.length === 149) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  isAuthenticated();

  
  return (
    <Router>
      <div>

      <Navbar />
        <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/winnerList' component={ListWinners} />
        <Route exact path='/login/for/admin' component={Login} />
        <PrivateRoute exact path='/change'><ChangePass/></PrivateRoute>
        <PrivateRoute exact path='/Number'><WinnerNumber/></PrivateRoute>
       
        </Switch>
      </div>
    </Router>
  )

}

export default Routes