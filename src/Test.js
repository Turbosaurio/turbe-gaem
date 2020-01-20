import React, {useState, useCallback} from 'react'

import {tileStyles} from './styles/jss/styles'
import {useEventListener} from './functions/useEventListener'

const heuristic = (current, target) => {
	const y = Math.abs( current.y - target.y)
	const x = Math.abs( current.x - target.x)
	return y + x * 10
}


const surroundingNodes = node =>{
	switch(node){
		case 0: return { x: -1, y: -1 } //NW
		case 1: return { x: 0, y: -1 }	//N
		case 2: return { x: 1, y: -1 }	//NE
		case 3: return { x: 1, y: 0 }		//E
		case 4: return { x: 1, y: 1 }		//SE
		case 5: return { x: 0, y: 1 }		//S
		case 6: return { x: -1, y: 1 }	//SW
		case 7: return { x: -1, y: 0 }	//W
		default: return
	}
}

const Tile = ({jss, children}) => {
	return(
		<div className={jss}>
			{children}
		</div>
	)
}

const Test = _ => {

	const handler = useCallback(
		({keyCode}) => {
			switch(keyCode){
				case 119 : return moveSelected('up')
				case 97 : return moveSelected('left')
				case 115 : return moveSelected('down')
				case 100 : return moveSelected('right')
				default : return null
			}	
		}
	)

	useEventListener('keypress', handler)

	const moveSelected = direction =>{
		switch(direction){
			case 'up': if(state.selected.y > 0) return handleSelected('y', -1)
			case 'left': if(state.selected.x > 0) return handleSelected('x', -1)
			case 'down': if(state.selected.y < 10) return handleSelected('y', 1)
			case 'right': if(state.selected.x < 10) return handleSelected('x', 1)
			default: return null
		}

	}

	const handleSelected = (key, val) => {
		setState(state => ({
			...state,
			selected:{
				...state.selected,
				[key]: state.selected[key] + val
			}
		}))
	}


	const jss = tileStyles({size: 800})
	const [state, setState] = useState({
		openNodes: [],
		closedNodes: [],
		start:{
			y: 9,
			x: 7,
		},
		selected:{
			y: 9,
			x: 7,
		},
		end:{
			y: 9,
			x: 9,
		},
		level: [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0,1,0],
			[0,0,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0,1,0],
			[0,0,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,0,0,1,0],
		]
	})


	return(
		<div className={jss.box}>
			<div>
				{state.level.map( (row, y) =>
					<div className={jss.row}>
					{row.map( (tile, x) =>{
						const coords = {y,x}
						return <Tile jss={`
							${jss.tile}
							${(y === state.start.y && x === state.start.x) ? 'start' : ''}
							${(y === state.selected.y && x === state.selected.x) ? 'selected' : ''}
							${(y === state.end.y && x === state.end.x) ? 'end' : ''}
							${tile === 1 ? 'blocked' : ''}
						`}>
							<div><span>{y}</span>,<span>{x}</span></div>
							<div>{heuristic(coords, state.start)}</div>
							<div>{heuristic(coords, state.end)}</div>
							<div>{heuristic(coords, state.start) + heuristic(coords, state.end)}</div>
						</Tile>
					})}
					</div>
				)}
			</div>
		</div>
	)
}

export default Test