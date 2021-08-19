import { useEffect, useState } from 'react';
import { NavLink ,Link, Redirect} from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  var token = localStorage.getItem('token');
  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    token=null
  }
  const homeHandler = () => {
    
  }
  useEffect(() => {
    if (token == null) {
      <Redirect to='/login' />
    }
  },[token])
  
  return (
    <header className={classes.header}>
      <div className={classes.logo}><img  src="/img/mainlogo.jpg" /></div>
      <nav className={classes.nav}>
        <ul>
          {!token && (<li>
            
            {/* <button onClick={logoutHandler} className={classes.button}> */}
              <NavLink  to='/login' activeClassName={classes.active}>Login
              </NavLink>
            {/* </button> */}
            
          </li>)}
          {!token && (<li>
            {/* <button onClick={logoutHandler} className={classes.button}> */}
            <NavLink to='/register' activeClassName={classes.active}>
              Register
            </NavLink>
            {/* </button> */}
          </li>)}
          {token && (<li>
            {/* <button onClick={homeHandler} className={classes.button}> */}
              <NavLink to='/homepage' onClick={homeHandler} activeClassName={classes.active}> Home</NavLink> 
              {/* </button> */}
          </li>)}
          {token && (<li>
            {/* <button onClick={homeHandler} className={classes.button}> */}
              <NavLink to='/updateprofile' activeClassName={classes.active}> Update Profile</NavLink> 
              {/* </button> */}
          </li>)}
          {token && (<li>
            {/* <button onClick={logoutHandler} className={classes.button}> */}
              <NavLink to='/login' onClick={logoutHandler} activeClassName={classes.active}> Logout</NavLink> 
              {/* </button> */}
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;