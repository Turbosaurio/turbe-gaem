
export default function finish (state = {}, action){
	switch(action.type){
		case 'FINISH': 
			return{
				...state,
				...action.val
			}
		default: return state
	}
}