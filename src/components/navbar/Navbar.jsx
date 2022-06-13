import React from 'react';
import classes from './Navbar.module.scss'
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
      <div>
        <ul>
          <li><Link className={classes.active} to='/welcome'>Home</Link></li>
          <li><Link to='/posts'>Posts</Link></li>
          <li style={{float: 'right'}}>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>
  );
};

export default Navbar;