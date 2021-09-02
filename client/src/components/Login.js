import React, { useState, useEffect } from 'react';
import { useHistory,Redirect } from 'react-router-dom'
import classes from './Form.module.css';
import Layout from './layout/Layout';
import Card from './UI/Card.js';
const Login = () => {
    
    
    let token = localStorage.getItem('token')
    let user=localStorage.getItem('usertype')
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const handleReset = () => {
        setEmail('');
        setPassword('');
    }
    const submitHandler = async(e) => {
        e.preventDefault();
       
        try {
            const res =await fetch('/login', {
                method: 'POST',
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            const data = await res.json();
            
            if (res.status === 400) {
                throw new Error(data.error)
            }
            console.log(data)
            token = localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", email);
            if (data.usertype === "admin") {
                localStorage.setItem('usertype','admin')
                alert("Admin Login Successfully!!")
                history.push('/admin')
            } else {
                localStorage.setItem('usertype','employee')
                alert("User Login Successfully!!")
                history.push('/homepage')
            }
            
            handleReset()
            
        } catch (e)
        {
            alert(e)
        }
    }
    
    if (token && user==='employee') {
        return <Redirect to="/homepage" />
    }
    if (token && user==='admin') {
        return <Redirect to="/admin" />
    }
    
    return (
        <Layout >
        <Card>
        <form onSubmit={submitHandler}>
            
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
                    <input
                        required
                        type='email'
                        id='email'
                        value={email}
                        onChange={emailHandler}
                    />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
                    <input
                        required
                        type='password'
                        id='password'
                        value={password}
                        onChange={passwordHandler}
                        minLength="7"
                    />
          </div>
          
          <div className={classes.actions}>
            <button  className='btn'>Login</button>
          </div>
        </form>
        </Card>
        </Layout>
   ) 
}
export default Login;