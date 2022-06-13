import React from 'react';
import classes from './MyModal.module.scss'

const MyModal = ({children, modalVisible, setModalVisible}) => {

  const myModalClasses = [classes.dialog]
  
  if(modalVisible){
    myModalClasses.push(classes.active)
  }

  return (
    <div
      className={myModalClasses.join(' ')}
      onClick={() => setModalVisible(false)}>
      <div
        className={classes.dialogContent}
        onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;