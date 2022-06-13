import React from 'react';
import classes from './MyButton.module.scss'

const MyButton = ({additionalClasses, children, ...props}) => {
  return (
    <button
      {...props}
      className={[additionalClasses, classes.btn].join(' ')}>
        {children}
    </button>
  );
};

export default MyButton;