
export default function finish (state = {}, action){
	switch(action.type){
		case 'FINISH': 
			return action.val
		default: return state
	}
}