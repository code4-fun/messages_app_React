import React, {useState} from 'react';
import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";
import classes from './PostForm.module.scss'

const PostForm = ({create}) => {

  const [post, setPost] = useState({title: '', body: ''})

  const addPost = (e) => {
    e.preventDefault()
    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost)
    setPost({title: '', body: ''})
  }

  return (
    <form>
      <h3>Создание поста</h3>
      <MyInput
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
        type='text'
        placeholder='Post name'
        additionalClasses={classes.formInput}/>
      <MyInput
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
        type='text'
        placeholder='Post body'
        additionalClasses={classes.formInput}/>
      <MyButton
        onClick={addPost}
        additionalClasses={[classes.formBtn].join(' ')}>
          Создать
      </MyButton>

    </form>
  );
};

export default PostForm;