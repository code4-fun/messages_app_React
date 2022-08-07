import React, {useEffect, useRef, useState} from 'react'
import PostList from "../../components/PostList";
import PostForm from "../../components/postForm/PostForm";
import MySelect from "../../components/ui/select/MySelect";
import MyInput from "../../components/ui/input/MyInput";
import MyModal from "../../components/ui/modal/MyModal";
import MyButton from "../../components/ui/button/MyButton";
import classes from './Posts.module.scss'
import {usePosts} from "../../hooks/usePosts";
import PostService from "../../api/PostService";
import Loader from "../../components/ui/loader/Loader";
import {useSpinner} from "../../hooks/useSpinner";
import {getPageCount} from "../../utils/pages";
import MyPageButtons from "../../components/ui/pageButton/MyPageButtons";
import {useObserver} from "../../hooks/useObserver";

function Posts() {
  const [posts, setPosts] = useState([])
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [selectedPostsPresentation, setSelectedPostsPresentation] = useState('pagination')
  const lastElement = useRef()

  const sortedAndSearchedPosts = usePosts(posts, selectedSort, searchQuery)
  const [fetchPosts, isPostsLoading, postError] = useSpinner(async () => {
    const response = await PostService.getAll(currentPage, limit)

    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))

    if(response.data.length === 0){
      setCurrentPage(1)
      return
    }

    if(selectedPostsPresentation === 'pagination'){
      setPosts(response.data)
    } else {
      setPosts([...posts, ...response.data])
    }
  })

  useEffect(() => {
    fetchPosts()
        .then(data => {
          return data
        })

  }, [currentPage, limit])

  useObserver(
    selectedPostsPresentation,
    lastElement,
    currentPage < totalPages,
    isPostsLoading,
    () => {setCurrentPage(currentPage + 1)}
  )

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModalVisible(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(i => i.id !== post.id))
  }

  return (
      <div>
        <div className={classes.appControls}>
          <MyButton
              onClick={() => setModalVisible(true)}
              additionalClasses={classes.createPostBtn} >
            Создать пост
          </MyButton>
          <MyInput
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              pleceholder='Поиск'
              additionalClasses={classes.appInput} />
          <MySelect
              value={selectedPostsPresentation}
              onChange={setSelectedPostsPresentation}
              options={[
                {value: 'pagination', name: 'Пагинация'},
                {value: 'infiniteScroll', name: 'Бесконечная прокрутка'}
              ]}
          />
          <MySelect
              value={limit}
              onChange={i => {
                setCurrentPage(1)
                setLimit(i)
              }}
              options={[
                {value: 10, name: '10'},
                {value: 25, name: '25'},
                {value: -1, name: 'Показать все'}
              ]}
          />
          <MySelect
              value={selectedSort}
              onChange={setSelectedSort}
              options={[
                {value: '', name: 'Сортировка', disabled: true},
                {value: 'title', name: 'По заголовку'},
                {value: 'body', name: 'По описанию'}
              ]}
          />
        </div>
        <MyModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}>
          <PostForm
              create={createPost} />
        </MyModal>
        {
          postError &&
          <h3>Произошла ошибка ${postError}</h3>
        }

        {
          selectedPostsPresentation === 'pagination' &&
          <div>
            {
              isPostsLoading
                  ? <Loader />
                  : <PostList
                      posts={sortedAndSearchedPosts}
                      remove={removePost} />
            }
            <MyPageButtons
                totalPages = {totalPages}
                currentPage = {currentPage}
                changePage={page => setCurrentPage(page)} />
          </div>
        }

        {
          selectedPostsPresentation === 'infiniteScroll' &&
          <div>
            <PostList
                posts={sortedAndSearchedPosts}
                remove={removePost} />
            {
              isPostsLoading && <Loader />
            }
            <div ref={lastElement}></div>
          </div>
        }
      </div>
  )
}

export default Posts
