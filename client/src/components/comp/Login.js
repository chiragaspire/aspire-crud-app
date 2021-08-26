import React, { useState, useEffect } from 'react';
import { useHistory,Redirect } from 'react-router-dom'
import './Form.css';
import Layout from '../layout/Layout'
const Login = () => {
  
    
    return (
<Layout>
        <div class="container">
            <form class="row g-3">
  <div class="col-12">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4"/>
  </div>
  <div class="col-12">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword4"/>
  </div>
  
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
            </div>
            </Layout>
   ) 
}
export default Login;