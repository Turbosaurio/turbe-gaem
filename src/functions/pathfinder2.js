
const heuristic = (a, b) => {
	const y = Math.abs( a.y - b.y)
	const x = Math.abs( a.x - b.x)
	return y + x * 10
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

const _nodesMap = (arr, start, end) => {
	let obj = {}
	for(let y = 0; y < arr.length; y++){
		  for(let x = 0; x < arr.length; x++){
			obj[`${y}_${x}`] = {
				open: '',
				parent: '',
				origin: heuristic(start, {y,x}),
				destination: heuristic(end, {y,x}),
				y, x
			}

		}
	}
	return obj
}

const _getNeighNodes = (max, start, end) =>{
	let obj = {}
	let i = 0
	while(i < 8){
		const {y, x} = _neighNodes(i)
		const coords = { y: start.y + y, x: start.x + x}
		if(coords.y >= 0 && coords.x >= 0 && coords.y <= max && coords.x <= max){
			const name = `${coords.y}_${coords.x}`
			const origin = heuristic(start, coords)
			const destination = heuristic(end, coords)
			const total = origin + destination
			obj[name] = {
				coords,
				origin,
				destination,
				total,
				status: 'open',
				parent: start,
			}
		}
		i++
	}
	return obj
}


export const minIndex = (obj, key) =>{

  const names = Object.keys(obj)
  const arr = names.map( i => obj[i][key])
  const min = Math.min.apply(null, arr)

  return obj[names[arr.indexOf(min)]].coords
}


export const getOpenNodes = (start, end) =>{
	return _getNeighNodes(20, start, end)
}

