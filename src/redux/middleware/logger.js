
const logger = (store) => (next) => (action) => {
		console.group(action.type)
			console.log('The action: ', action)
			const returnValue = next(action)
			console.log('The new state: ', store.getState())
		console.groupEnd()
		return returnValue
	// if(action.type !== SET_CURRENT_SECTION){
	// }
}

export default logger