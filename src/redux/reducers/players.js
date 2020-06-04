import{
	GET_PLAYERS,
	MOVE_PLAYER,
	CREATE_PLAYER,
} from '../actions/players'

function insertItem(array, { item, index }) {
	console.log(array)
  let newArray = array.slice()
  newArray.splice(index, 0, item)
  return newArray
}

function removeItem(array, action) {
  let newArray = array.slice()
  newArray.splice(action.index, 1)
  return newArray
}

export default function players ( state = [], action){
	switch(action.type){
		case GET_PLAYERS:
			return [
				...state,
				...action.val
			]
		case MOVE_PLAYER:
			return state.map( player => {
				if(player._id !== action.val.id){
					return player
				}
				return {
					...player,
					position: {
						y: action.val.y,
						x: action.val.x
					}
				}
			})

		case CREATE_PLAYER:
			return insertItem(state, action.val)
			
		default : return state
	}
}