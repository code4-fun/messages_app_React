import React from 'react';
import classes from './MyPageButtons.module.scss'
import {getPagesArray} from "../../../utils/pages";

const MyPageButtons = ({totalPages, currentPage, changePage}) => {

  const pagesArray = getPagesArray(totalPages)

  return (
      <div className = {classes.pageWrapper}>
        {
          pagesArray.map(i => <div
              key = {i}
              onClick={() => changePage(i)}
              className = {
                currentPage === i
                    ? [classes.pageButton, classes.currentPageButton].join(' ')
                    : classes.pageButton}>{i}</div>)
        }
      </div>
  );
};

export default MyPageButtons;