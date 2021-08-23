import Layout from './layout/Layout';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Admin() {
  const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        const loadUsers = async () => {
        setLoading(true)
      const res= await fetch("/admingetdata");
      const body=await res.json();
      console.log(body)
      
            setData(body);
            setLoading(false);
    };
    loadUsers();
  }, []);
    return (
    <Layout>
        {loading && <p text-align="center">loading...</p>}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        
        {!loading &&<TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row._id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
              
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
            
    </Layout>
  );
}