import { NavLink ,Link, Redirect,useHistory} from 'react-router-dom';

import classes from './Footer.module.css';

const Footer = () => {
  const history = useHistory();
  var token = localStorage.getItem('token');
  var usertype = localStorage.getItem('usertype');
  
  
  return (
    
    <footer className={classes.footer}>
      
      <nav className={classes.nav}>
        <ul>
         
          <li>
          Created by Chirag Patel. © 2021
                   
          </li>
         
          
        </ul>
      </nav>
    </footer>

  );
};

export default Footer;