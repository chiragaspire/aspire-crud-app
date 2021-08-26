import React, { useState, useEffect } from 'react';
import classes from './Form.module.css';
import Card from './UI/Card.js';
import {useHistory,Redirect} from 'react-router-dom' 
import Layout from './layout/Layout';
const Register = () => {
    const history = useHistory();
    let token = localStorage.getItem('token')
    let user=localStorage.getItem('usertype')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [usertype, setUsertype] = useState('employee');
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const cpasswordHandler = (e) => {
        setCpassword(e.target.value)
    }
    const handleReset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
    }
    const handleChangeEmployee = (e) => {
        setUsertype('employee');
    }
    const handleChangeAdmin = (e) => {
        setUsertype('admin');
    }
    const cancleHandler = () => {
        history.push('/admin');
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        if (password !== cpassword) {
            return alert("Password must be same!!")
        }
        
        try {
            const res =await fetch('/register', {
                method: 'POST',
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify({name,email,password,usertype})
            })
            // if (!res.ok) {
            //     throw new Error("Error")
            // }
            const data = await res.json();
            if (res.status === 400) {
                throw new Error(data.error)
            }
            
            alert("User Registation Successfully!!")
            handleReset()
            
            history.push('/login')
        } catch (e)
        {
                alert(e)
        }
    }
    if (token === null || user !== 'admin') {
        return <Redirect to="/login" />
    }
    return (
        <Layout >
        <Card>
            <form onSubmit={submitHandler}>
            <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input 
                type='text'
                id='name'
                value={name}
                onChange={nameHandler}
                required        
            />
          </div>
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
          <div className={classes.control}>
            <label htmlFor='cpassword'>Confirm Password</label>
                    <input
                        required
                        type='password'
                        id='cpassword'
                        value={cpassword}
                        onChange={cpasswordHandler}
                        minLength='7'
                    />
          </div>
          <div className={classes.control}>
          <label for="users">Type of user:</label>

          <select name={usertype}  id="users">
            <option value="employee" onClick={handleChangeEmployee}>Employee</option>
            <option value="admin" onClick={handleChangeAdmin}>Admin</option>
            </select>

          </div>
          <div className={classes.actions}>
            <button  >Register</button>  &nbsp; &nbsp;
            <button type="button" onClick={cancleHandler}  className={classes.delete}>Cancel</button>
          </div>
          
        </form>
        </Card>
        </Layout>
   ) 
}
export default Register;