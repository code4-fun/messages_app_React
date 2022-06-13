import React from 'react';
import PostItem from "./postItem/PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, remove}) => {
  return (
    <div>
      <TransitionGroup>
        {
          posts.map((post) =>
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post" >
              <PostItem
                post={post}
                remove={remove} />
            </CSSTransition>
          )
        }
      </TransitionGroup>
    </div>
  );
};

export default PostList;