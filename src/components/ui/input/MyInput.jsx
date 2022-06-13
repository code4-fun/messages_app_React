import React from 'react';
import classes from './MyInput.module.scss'

const MyInput = ({additionalClasses, ...props}) => {
  return (
    <input className={[additionalClasses, classes.input].join(' ')} {...props} />
  );
};

export default MyInput;