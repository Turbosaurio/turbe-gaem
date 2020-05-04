import { useEffect } from 'react'

const useInterval = ( callback, delay ) => {
	useEffect( () => {
		let interval = setInterval( callback, delay)
		return () => clearInterval(interval)
	}, [delay])
}

export default useInterval