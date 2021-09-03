import React, { useState, useEffect } from 'react';
import classes from './Form.module.css';
import Card from './UI/Card.js';
import {useHistory,Redirect} from 'react-router-dom' 
import Layout from './layout/Layout';
import axios from 'axios';
const Register = () => {
    const history = useHistory();
    let token = localStorage.getItem('token')
    let user=localStorage.getItem('usertype')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [usertype, setUsertype] = useState('employee');
    const [file, setFile] = useState('');
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
    const profileHandler = (e) => {
        setFile(e.target.files[0]);
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
        const formData = new FormData();
        formData.append('profile', file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('usertype', usertype);

        if (password !== cpassword) {
            return alert("Password must be same!!")
        }
        
        try {
            const res =await axios.post('/register',formData, {
                method: 'POST',
                headers: {
                    "content-type":"multipart/form-data"
                },
                
            })
            const data = await res.data;
            if (data.error) {
                console.log(data)
                throw new Error(data.error)
            }
            console.log("res:",data)
            
            alert("User Registation Successfully!!")
            handleReset()
            
            history.push('/login')
        } catch (e)
        {
            console.log(e)
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
            <label htmlFor='profile'>Profile Image</label>
                    <input
                        required
                        type='file'
                        id='profile'
                        
                        onChange={profileHandler}
                        
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