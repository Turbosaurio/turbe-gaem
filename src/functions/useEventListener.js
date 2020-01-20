import React, {useEffect, useRef} from 'react'

export const useEventListener = (eventName, handler, element = window) =>{
	const savedHandler = useRef()
	useEffect( _ => {
		savedHandler.current = handler
	}, [handler])

	useEffect( _ => {
		const isSupported = element && element.addEventListener
		if(!isSupported) return

		const eventListener = event => savedHandler.current(event)
		element.addEventListener(eventName, eventListener)

		return _ => { element.removeEventListener(eventName, eventListener)}
		
	}, [eventName, element])
}


/*

	example of how to use


	const useMousePosition = _ => {
	const [mouse, setMouse] = useState({x: 0, y: 0})
	const handler = useCallback(
		({clientX, clientY}) => {
			setMouse({x: clientX, y: clientY})
		}
	)
	useEventListener('mousemove', handler)
	return mouse
}
	

*/