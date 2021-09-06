import Layout from './layout/Layout';
import React, { useState, useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import classes from './Admin.module.css';
import classes1 from './Form.module.css';

const heading = [
  {id:"id",label:'id',sort:true},
  { id: "name", label: 'name',sort:true },
  {id:"email",label:'email',sort:true},
  {id:"edit",label:'edit',sort:false},
  {id:"delete",label:'delete',sort:false},
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
 function Admin() {
  const history=useHistory();
  
   const [data, setData] = useState([]);
   const [search, setSearch] = useState('');
   const [order, setOrder] = useState('asc');
   const [orderBy,setOrderBy]=useState('id')
   const [headers, setHeaders] = useState(heading);
   const [loading, setLoading] = useState(false);
   const [rowsPerPage, setRowsPerPage] = React.useState(3);
   const [page, setPage] = React.useState(0);
   let token = localStorage.getItem('token')
   let user = localStorage.getItem('usertype')
   console.log(user)
   let sortDirection = order === 'asc' ? 'up' : 'down';
 
    const loadUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch("/admingetdata", {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const body = await res.json();
        if (res.status === 400) {
          throw new Error(body.error);
        }
    console.log(body)
      const EmployeeData = body.filter(user => user.usertype !== 'admin');
        let edata = EmployeeData.map(data => data);
        edata.forEach((edata,i) => {
          edata.id=i
        })
        console.log(edata)
        setData(edata);
          
      }
      catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('usertype')
          alert(e);
          history.push('/login');
      }
      setLoading(false);
  };  
    useEffect(() => {
      
    loadUsers();
  }, []);
    
   const handleAddUser = () => {
     history.push('/register');
  }
  const handleClickEdit=(email)=>{
      console.log(email)
        history.push(`/editEmployee/${email}`);

      
  }
  const handleClickDelete=async(email)=>{
    console.log(email)
    try{
     const res=await fetch(`/deletebyadmin/${email}`,{
       method:'DELETE'
     })
     const data=await res.json();
     console.log(data)
     if(res.status===400){
       throw new Error(data.error);
     }

     alert("successfully");
     loadUsers();

    }catch(e){
       alert(e)
     }
  }
  //  sorting table data by name or email
   const searchData = (data) => {
     const searchd = data.filter(data => {
       return data.name.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase())
       
     })
   
     return searchd
   }
   const handleSearch = (e) => {
     setSearch(e.target.value);
   }
   

  // sorting table by name
  //  const handleSort = (orderby, ordered) => {
    
  //    const sortdata = data.map((data1, index) => [data1, index])
  //    if (ordered === 1) {
  //      sortdata.sort(((a, b) =>{
  //        console.log(a[0][1])
  //      return  a[0].name > b[0].name ? -1 : 1
  //      }))
  //    } else if (ordered === -1) {
  //     sortdata.sort(((a, b) => a[0].name < b[0].name ? -1 : 1))
  //    }

  //   //  setOrder(1*-order)
  //    const head = headers.map(data => data);
  //    head.map(heading => {
  //      if (heading.id === orderby) {
  //        heading.order = -heading.order;
  //      }
  //    })
  //    console.log(head);
  //    console.log(sortdata)
  //    setHeaders(head)
  //    setData(sortdata.map(data => data[0]));
  // }
   
  //  if (order === 1) {
  //    console.log("accending");
  //  } else {
  //   console.log("decending");
  //  }

   const handleRequestSort = (property,sort) => {
     if (!sort) {
       return null;
    }
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

   };
   console.log(order, orderBy)
   


  //  Paging
  let pageLength = searchData(data).length;
  let pagesize = parseInt(pageLength / rowsPerPage);
   console.log(history.location);
   let current = 1;
   if (history.location.hash) {
    current = history.location.hash.replace('#', '');
    current = parseInt(current)
    
   }
    

  const handleChangePrevPage = (event, newPage) => {
    setPage(page - 1);
    current--
  };
  const handleChangeNextPage = (event, newPage) => {
    setPage(page + 1);
    current=current+1
  };
   
   const handleChangePage = (p) => {
     
     setPage(p)
     current = p;
  }
    console.log(current)
  
   
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  if (token === null || user !== 'admin') {
    return <Redirect to="/login" />
}
  return (
 <Layout >
      
        
      <div className={classes.card}>
        
        
      {loading && <p text-align="center">loading...</p>}
      <div className={classes.actions}>
          <button  onClick={handleAddUser}>Add user</button>
        </div>
        <div className={classes1.control}>
        <input type="text" placeholder="Search..." onKeyUp={ handleSearch}/>
          </div>
         
        {!loading && data.length !== 0 && (
           <>
          <table id="example" class="table  table-bordered">
            <thead >
            <tr >
              {headers.map((row,index) => (
               
                <th key={row.id} onClick={() => handleRequestSort(row.id,row.sort)}>{row.label}
                  {orderBy === row.id && row.sort && (
                      <i className={`fas fa-long-arrow-alt-${sortDirection}`}></i>  
                  )}  
                  </th>
              ))}
                </tr>
              
            </thead>
            <tbody>
                
              {stableSort(searchData(data), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                <tr key={row.id}>
                  <td >
                    {row.id}
                  </td>
                  <td >{row.name}</td>
                  <td  >{row.email}</td>
                  <td className={classes.actions}><button onClick={() => handleClickEdit(row.email)}>Edit</button></td>
                  <td className={classes.actions}><button className={classes.delete} onClick={() => handleClickDelete(row.email)}>Delete</button></td>
                          
                </tr>
              ))}
            </tbody>
          </table>
          <nav className={classes.navpage} aria-label="Page navigation example">
            <ul class="pagination">
                
                {page > 0 && (<li class="page-item "  onClick={handleChangePrevPage}><a class="page-link" href={`#${current-1}`}>Previous</a></li>
                )}
                {Array(pagesize + 1).fill(1).map((el, i) => 
                    <li class="page-item " id="pages" onClick={() => handleChangePage(i)} key={i}><a class="page-link" href={`#${i + 1}`}>{i + 1}</a></li>
                ) }
              { page<pagesize && (<li class="page-item" onClick={handleChangeNextPage}><a class="page-link" href={`#${current+1}`}>Next</a></li>
              )}
              </ul>
            </nav>
           
        </>
        )}
        
            </div>


      {/* <div className={classes.adduser}>
          <button className={classes.edit_button} onClick={handleAddUser}>Add user</button>
        </div>
        {loading && <p text-align="center">loading...</p>}
      <TableContainer className={classes.container} component={Paper}>

        
        <Table stickyHeader aria-label="simple table">
          <TableHead className={classes.header}>
            <StyledTableRow>
              <StyledTableCell >Id</StyledTableCell>
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell >Email</StyledTableCell>
              <StyledTableCell >Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {!loading && data.length === 0 && (
            <TableBody >
              <p align='center' className={classes.message}>Employee not found</p>
            </TableBody>
          )}
          {!loading && <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row._id}
                </StyledTableCell>
                <StyledTableCell >{row.name}</StyledTableCell>
                <StyledTableCell  >{row.email}</StyledTableCell>
                <StyledTableCell  ><button className={classes.edit_button} onClick={() => handleClickEdit(row.email)}>Edit</button></StyledTableCell>
                <StyledTableCell ><button className={classes.del_button} onClick={() => handleClickDelete(row.email)}>Delete</button></StyledTableCell>
              
              </StyledTableRow>
            ))}
          </TableBody>}
        </Table>
      </TableContainer> */}
      
        
</Layout>
  );
 }

export default Admin;