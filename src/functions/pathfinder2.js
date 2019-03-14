const arrCoord = (arr, {y, x}) =>{
	return arr[y][x]
}

const heuristic = (a, b) => {
	const newY = Math.abs( a.y - b.y)
	const newX = Math.abs( a.x - b.x)
	return newY + newX * 10
}


const _mapNodes = (arr, start, end) => {
	let newArr = [], index = 0
	for(let y = 0; y < arr.length; y++){
		let inner = []
		for(let x = 0; x < arr.length; x++){
			const coords = {y, x}
			const origin = heuristic(start, coords)
			const destination = heuristic(end, coords)
			inner.push({
				status: '',
				parent: '',
				total: origin + destination,
				index,
				origin,
				destination,
				coords,
			})			
			index++
		}
		newArr.push(inner)
		inner = []
	}
	return newArr
}


const _neighNodes = ind =>{
	let x,y
	switch(ind){
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
	return{x,y}
}


const _getNeighNodes = (arr, position) =>{
	let newArr = []

	let i = 0

	while(i < 8){
		const {y, x} = _neighNodes(i)
		const newY = position.y + y
		const newX = position.x + x
		if(newY >= 0 && newX >= 0){
			let node = arr[newY][newX]
			if(node.status === ''){
				node.parent = position
				node.status = 'open'
				newArr.push(node)
			}
		}
		i++
	}
	return newArr
}

const _getMinIndex = (arr, key) => {
	let keys = []
	for(let i of arr){
		keys.push(i[key])
	}
	return keys.indexOf(Math.min.apply(Math, keys))
}

const _mergeArrays = (arr1, arr2) =>{
	return arr1.concat(arr2)
}


export const findPath = (map, start, end) =>{
	let currentNode = start

	const nodesMap = _mapNodes(map, start, end)
	const openNodes = _getNeighNodes(nodesMap, currentNode)
	const moreNodes = _getNeighNodes(nodesMap, {y: 5, x: 5})

	while(currentNode !== end){
		
		currentNode = end
	}
	console.log(nodesMap)
	console.log(_mergeArrays(openNodes, moreNodes))
}



