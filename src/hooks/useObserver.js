import {useEffect, useRef} from "react";

export const useObserver = (selectedPostsPresentation, ref, canLoad, isLoading, callback) => {
  const observer = useRef()

  useEffect(() => {
    if(isLoading || selectedPostsPresentation === 'pagination'){
      return
    }
    if(observer.current){
      observer.current.disconnect()
    }
    const call_back = (entries) => {
      if(entries[0].isIntersecting && canLoad){
        callback()
      }
    }
    observer.current = new IntersectionObserver(call_back)
    observer.current.observe(ref.current)
  }, [isLoading, selectedPostsPresentation])
}