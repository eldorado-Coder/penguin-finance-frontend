import { useEffect, useState } from 'react'

/**
 * this simple hook will return true whenever
 * our passed STRING mediaquery is matched
 * else it will returns false
 * i made it to catch unhandled BreakPoints (2000px , 4000px ...) in the useMatchBreakpoints hook
 */

const useMediaQuery = (query: string) => {
  const mediaQuery = window.matchMedia(query)
  const [match, setMatch] = useState(!!mediaQuery.matches)

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [mediaQuery])
  return match
}

export default useMediaQuery
