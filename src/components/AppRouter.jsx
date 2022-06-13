import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/about/About";
import Posts from "../pages/posts/Posts";
import Post from "../pages/post/Post";
import Main from "../pages/main/Main";

const AppRouter = () => {
  return (
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/welcome' element={<Main />} />
        <Route exact path='/posts' element={<Posts />} />
        <Route exact path='/posts/:id' element={<Post />} />
        <Route path="/*" element={<Navigate to="/posts" replace />} />
      </Routes>
  );
};

export default AppRouter;