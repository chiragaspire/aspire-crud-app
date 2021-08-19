import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import Logout from './components/logout';
function App() {
  // const [data, setData] = useState('');
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('http://localhost:5000/testing');
  //     const data = await res.json();
  //     setData(data.body);
  //   }
  //   fetchData()
  // }, []);

  return (
    <>
    
      <Router>
        
        <Switch >
        <Route exact path="/" component={ Login}/>
          <Route path="/login" component={Login} />
          <Route  path="/register" component={ Register}/>
          <Route path="/homepage" component={Homepage} />
          <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/logout" component={ Logout}/>
          <Route path='*'>
            <Notfound />
            </Route>
          </Switch>
          
      </Router>
      
      {/* <h1>Message: {data}</h1> */}
    </>
  );
}

export default App;
