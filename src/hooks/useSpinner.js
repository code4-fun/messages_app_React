import {useState} from 'react'

export const useSpinner = (callback) => {
  const [isWorking, setIsWorking] = useState(false)
  const [error, setError] = useState('')

  const working = async (...args) => {
    try {
      setIsWorking(true)
      await callback(...args)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsWorking(false)
    }
  }

  return [working, isWorking, error]
}