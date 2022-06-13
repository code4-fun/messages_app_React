import React from 'react';
import MyButton from '../ui/button/MyButton';
import classes from './PostItem.module.scss'
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate()

  return (
    <div className="post">
      <div>
        <strong>{props.post.id}. {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <div className={classes.postButtons}>
        <MyButton
            additionalClasses={classes.postItemBtn}
            onClick={() => navigate('/posts/' + props.post.id, { state: { author_name: "John" }})} >
          Открыть
        </MyButton>
        <MyButton
            additionalClasses={classes.postItemBtn}
            onClick={() => props.remove(props.post)}>
          Удалить
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;