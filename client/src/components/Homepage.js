import { Redirect, Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from './Homepage.module.css';
import Card from './UI/Card.js';
import Layout from './layout/Layout';
const Homepage = () => {
    const history = useHistory();
    const [name, setName] = useState('');
   
    let token
    let userEmail = localStorage.getItem('userEmail');
    const fetchData = async () => {
        
            const res = await fetch(`/getUsers/${userEmail}`, {
                method: 'GET',
                headers: {
                    
                   
                }
            })
            
        const data = await res.json();
        console.log(data)
        setName(data.name);
            
    }
    useEffect(() => {
        token =  localStorage.getItem('token');
        fetchData();
    
    },[token])    
    if (token === '') {
        return <Redirect to="/login" />
    }
    
    return (
        <Layout>
            
            <Card>
                <div className={classes.typography}>
                    <h1>Welcome { name}</h1>
                </div>
            </Card>
           
        </Layout>
    );
}
export default Homepage;