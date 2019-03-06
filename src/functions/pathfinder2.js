import React, {Component} from 'react'
import {connect} from 'react-redux'

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


const mapNodes = (arr, start, end) => {
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

const getMinIndex = (arr, key) => {
	let keys = []
	for(let i of arr){
		keys.push(i[key])
	}
	return keys.indexOf(Math.min.apply(Math, keys))
}


export const findPath = (map, start, end) =>{
	let openNodes = []
	let currentNode = start
	let nodesMap = mapNodes(map, start, end)

	for(let i = 0; i < 8; i++){
		const {y, x} = neighNodes(i)
		const newY = currentNode.y + y
		const newX = currentNode.x + x
		if(newY >= 0 && newX >= 0){
			let node = nodesMap[newY][newX]
			if(node.status !== ''){
				node.parent = currentNode
				node.status = 'open'
				openNodes.push(node)
			}
		}
	}
	return openNodes
}

function Square({position, values}){
	const {y, x} = position
	return(
		<div className={`square ${values.status}`}
			style={{top: y * 165, left: x * 165}}>
			{Object.keys(values).map( i => <div>{`${i}: ${JSON.stringify(values[i])}`}</div>)}
		</div>
	)
}


class MapArray extends Component{
	state = {
		nodes: [],
		openNodes: [],
	}

	_closeNode(coord){
		const {y, x} = coord
		this.setState( state => {
			const {nodes} = state
			const newNode = nodes[y][x]
			return {
				...state,
				nodes: [
					...nodes,
					...newNode
				]
			}
		})
	}

	_openNodes(arr){
		this.setState(
			state => ({
				...state,
				openNodes: state.openNodes.concat(arr)
			})
		)
	}

	componentDidMount(){
		const {map} = this.props
		const start = {y:0,x:0}
		const end = {y:9,x:9}
		this.setState(
			state => ({
				...state,
				nodes: mapNodes(map, start, end),
				start,
				end,
		}))
	}

	render(){
		const {nodes} = this.state
		let nodesGroup = []
		for(let y = 0; y < nodes.length; y++){
			for(let x = 0; x < nodes[y].length; x++){
				nodesGroup.push(
					<Square 
						values={nodes[y][x]}
						position={{y,x}}
					/>
				)
			}
		}

		return(
			<div className='node'>
				{nodesGroup}
			</div>
		)
	}
}

const mapStateToProps = ({levels}) => {
	return { map: levels.level1.tiles }
}

export default connect(mapStateToProps)(MapArray)