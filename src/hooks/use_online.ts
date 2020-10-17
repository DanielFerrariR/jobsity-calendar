import { useEffect, useState } from 'react'

/**
 * A hook that shows if the user is online or not
 * @returns A boolean with `true` if the user is online and `false` if not
 */
const useOnline = (): boolean => {
  const [isOnline, setOnline] = useState(window.navigator.onLine)

  useEffect(() => {
    const handleIsOnline = () => {
      setOnline(window.navigator.onLine)
    }

    window.addEventListener('online', handleIsOnline)
    window.addEventListener('offline', handleIsOnline)

    return () => {
      window.removeEventListener('online', handleIsOnline)
      window.removeEventListener('offline', handleIsOnline)
    }
  }, [])

  return isOnline
}

export default useOnline
