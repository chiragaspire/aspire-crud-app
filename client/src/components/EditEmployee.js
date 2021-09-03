import React, { useState, useEffect } from 'react';
import classes from './Form.module.css';
import Card from './UI/Card.js';
import {useHistory, useParams,Redirect} from 'react-router-dom' 
import Layout from './layout/Layout';
import axios from 'axios';
const EditEmployee = (props) => {
    const history = useHistory();
    let token = localStorage.getItem('token')
    let user=localStorage.getItem('usertype')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    const [file, setFile] = useState('');
    
    const initemail=useParams();
    console.log(initemail.email);
    const imageurl = `/users/${initemail.email}/avatar`;
    const hashUrl =Date.now()
    const loadUsers = async () => {
        try {
            const res = await fetch(`/getdata/${initemail.email}`, {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
          });
          const body=await res.json();
            if (res.status === 400) {
                localStorage.removeItem('token')
                localStorage.removeItem('userEmail')
                localStorage.removeItem('usertype')
                throw new Error(body.error);
          }
            console.log(body)
          
                setName(body.name);
                setEmail(body.email);
                setPassword(body.password);
            setOldpassword(body.password)
            
        } catch (e) {
            alert(e)
        }
        
    };  
    useEffect(() => {

        loadUsers();
    }, []);
    
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const profileHandler = (e) => {
        setFile(e.target.files[0]);
    }
    const handleReset = () => {
        setName('');
        setEmail('');
        setPassword('');
        
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }
        
        formData.append('name', name);
        formData.append('email', email);
        
        if (password !== oldpassword) {
            formData.append('password', password); 
        }
        
        try {
            const res =await axios.patch(`/updateEmployee/${initemail.email}`,formData, {
                method: 'PATCH',
                headers: {
                    "content-type":"multipart/form-data"
                },
                
            })
            // if (!res.ok) {
            //     throw new Error("Error")
            // }
            const data = await res.data;
            if (data.error) {
                console.log(data)
                throw new Error(data.error)
            }
            console.log("res:",data)
            
            
            alert("User Update Successfully!!")
            handleReset()
            
            history.replace('/admin')
        } catch (e)
        {
                alert(e)
        }
    }
    const handleClickCancle = ()=>{
        history.push('/admin');
    }

    if (token === null || user !== 'admin') {
        return <Redirect to="/login" />
    }
    return (
        <Layout >
        <Card>
            <form onSubmit={submitHandler}>
            <div className={classes.imgcontrol}>
                    
            <img src={`${imageurl}?${hashUrl}`}  alt="..."/>
                </div>
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
            <label htmlFor='profile'>Profile Image</label>
                    <input
                        
                        type='file'
                        id='profile'
                        
                        onChange={profileHandler}
                        
                    />
          </div>
          <div className={classes.actions}>
                <button className='btn'>Update</button> &nbsp;
                <button type="button" onClick={handleClickCancle} className='btn'>Cancel</button>
          </div>
          
        </form>
        </Card>
        </Layout>
   ) 
}
export default EditEmployee;