const neighNodes = ind =>{
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



const arrCoord = (arr, {y, x}) =>{
	return arr[y][x]
}

const heuristic = (a, b) => {
	const newY = Math.abs( a.y - b.y)
	const newX = Math.abs( a.x - b.x)
	return newY + newX * 10
}

const emptyArray = (arr, start, end) => {
	let newArr = []
	for(let y = 0; y < arr.length; y++){
		let inner = []
		for(let x = 0; x < arr.length; x++){
			const coords = {y, x}
			inner.push({
				open: false,
				parent: '',
				origin: heuristic(start, coords),
				destination: heuristic(end, coords),
				coords,
			})			
		}
		newArr.push(inner)
		inner = []
	}
	return newArr
}

export const findPath = (map, start, end) =>{
	let openNodes = []
	let currentNode = start
	let nodesMap = emptyArray(map, start, end)

	for(let i = 0; i < 8; i++){
		const {y, x} = neighNodes(i)
		const newY = currentNode.y + y
		const newX = currentNode.x + x
		if(newY >= 0 && newX >= 0){
			let node = nodesMap[newY][newX]
			if(!node.open){
				node.parent = currentNode
				openNodes.push(node)
			}
		}
	}
	console.log(openNodes)
}