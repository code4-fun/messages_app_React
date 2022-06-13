import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useSpinner} from "../../hooks/useSpinner";
import PostService from "../../api/PostService";
import Loader from "../../components/ui/loader/Loader";

const Post = () => {
  const {id} = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const [fetchPostById, isLoading] = useSpinner(async (id) => {
    const post = await PostService.getById(id)
    const comments = await PostService.getCommentsById(id)
    setPost(post.data)
    setComments(comments.data)
  })

  useEffect(() => {
    fetchPostById(id)
        .then(data => {
          return data
        })
  }, [])


  return (
      <div>
        <h3>Post {id}</h3>
        {isLoading
            ? <Loader />
            : <div>
                {post.id} {post.title}
                <h3>Комментарии</h3>
                <div>
                  {
                    comments.map(comment =>
                        <div key={comment.id}>
                          <h5>{comment.email}</h5>
                          <div>{comment.body}</div>
                        </div>
                    )
                  }
                </div>
              </div>
        }
      </div>
  );
};

export default Post;
















