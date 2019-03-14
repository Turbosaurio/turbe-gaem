const heuristic = (a, b) => {
	const newY = Math.abs( a.y - b.y)
	const newX = Math.abs( a.x - b.x)
	return newY + newX * 10
}

const _neighNodes = index =>{
	let x,y
	switch(index){
		case 0: 	x=-1;		y=-1;		break;//NW
		case 1: 	x=0;		y=-1;		break;//N
		case 2: 	x=1;		y=-1;		break;//NE
		case 3: 	x=1;		y=0;		break;//E
		case 4: 	x=1;		y=1;		break;//SE
		case 5: 	x=0;		y=1;		break;//S
		case 6: 	x=-1;		y=1;		break;//SW
		case 7: 	x=-1;		y=0;		break;//W
		default:	break;
	}
	return {y, x}
}


const _getNeighNodes = (arr, start, end) =>{
	let newArr = []
	let i = 0
	while(i < 8){
		const {y, x} = _neighNodes(i)
		const coords = { y: start.y + y, x: start.x + x}
		if(coords.y >= 0 && coords.x >= 0){

			const name = coords.y+'_'+coords.x
			const origin = heuristic(start, coords)
			const destination = heuristic(end, coords)
			const total = origin + destination

			const node = {
				name,
				origin,
				destination,
				total,
				status: 'open',
				parent: start,
			}
	
			newArr.push(node)
		}
		i++
	}
	return newArr
}


const minIndex = (obj, key) =>{
  const arr = Object.keys(obj).map( i => obj[i][key])
  const min = Math.min.apply(null, arr)
  return arr.indexOf(min)
}



export const findPath = (map, start, end) =>{
	let openNodes = _getNeighNodes(map, start, end)
	console.log(openNodes)
}



