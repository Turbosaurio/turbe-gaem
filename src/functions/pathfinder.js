let star_node_start
let star_node_current
let star_node_end
let star_nodes = []
let star_openNodes = []
let star_closedNodes = []
let star_nodesLoop = 0

function star_resetVars(){
	star_openNodes.length = 0
	star_closedNodes.length = 0
	star_nodesLoop = 0
}


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

const findN = (mapArr,initialNode) =>{
	let y=[], x=[]
	for(let g=7; g>=0; g--){
		let one=neighNodes(g).y + initialNode.y
		let two=neighNodes(g).x + initialNode.x

		if(one>=0 && one<mapArr.length && two>=0 && two<mapArr.length){ ///////////existing boundaries
			if(star_nodes[initialNode.y][two]!="u" && star_nodes[one][initialNode.x]!="u"){ ////dont cross corners
				if(star_nodes[one][two]=="i" || star_nodes[one][two]=="o"){
					y.push(one)
					x.push(two)
				}
			}
		}
	}
	return {y,x}
}

const getMinIndex = arr =>{
	////get minimum index of array
	let t=[], q=[], s=[]
	for(let i=0; i<arr.length; i++){
		t.push(arr[i].f);
	}
	for(i=0;i< arr.length; i++){
		if(t[i]==Math.min.apply(null,t)){
			q.push(i)
		}
		s.push(arr[i].h)
	}
	if(q.length>1){
		 return s.indexOf(Math.min.apply(null,s)) ////IN H
	}else{
		 return t.indexOf(Math.min.apply(null,t)) ///// IN F
	}
}

const getHipo = (c1,c2,typ) =>{
	let k, cat1=Math.abs(c1.y-c2.y), cat2=Math.abs(c1.x-c2.x)
	switch(typ){
		case "t": ////Taaales Taaales de Mileto
			return Math.floor(Math.sqrt(Math.pow(cat1,2)+Math.pow(cat2,2))*10)
		case "h": ////Heurisique
			return k=cat1+cat2*10
		default: return null
	}
}

const findRoute = (arr,start) =>{
	let final=[]
	let nodeD={y:arr[arr.length-1][0].id.y,x:arr[arr.length-1][0].id.x}
	let counter=0
	while(counter<arr.length){
		for(var i=0;i<arr.length;i++){
			if(arr[i][0].id.y==nodeD.y && arr[i][0].id.x==nodeD.x){
				final.push(arr[i][0].id);
				nodeD={y:arr[i][0].p.y,x:arr[i][0].p.x};
				break;
			}
		} if (nodeD.y==start.y && nodeD.x==start.x) break
		counter++
	}
	return final
}


const getNodes = (sN,cN,fN,map) =>{
	star_nodes[cN.y][cN.x] = "x";
	const arr=findN(map,cN);
	for(let r=0; r<arr.y.length; r++){//////new or renew star_nodes 1>8
		const mim={y:arr.y[r],x:arr.x[r]}
		if(star_nodes[mim.y][mim.x]=="i"){
			let g,h,f,p
			star_openNodes.push({id: mim,h,g,f,p})
		}
		star_nodes[arr.y[r]][arr.x[r]] = "x"
	};
	for(let i=0; i<star_openNodes.length; i++){
		let nd = star_openNodes[i]
		let par = {y:cN.y,x:cN.x}
		if(nd.h === undefined){
			nd.p = par
			nd.h = getHipo(nd.id,fN,"t")
			nd.g = getHipo(nd.id,cN,"t")
			nd.f = nd.h+nd.g
			star_nodes[nd.id.y][nd.id.x]="o"
		}
		if(nd.g && star_nodes[nd.id.y][nd.id.x]=="o"){////////////open Node recalculate
			if(getHipo(nd.id,cN,"t")<nd.g){
				nd.g = getHipo(nd.id,cN,"t");
				nd.f = nd.h+nd.g;
				star_nodes[nd.id.y][nd.id.x]="c";
			}
		}
		nd.par = par
	}

	const min = getMinIndex(star_openNodes)
	star_closedNodes.push(star_openNodes.splice(min,1))

	const last = star_closedNodes.length-1

	cN.y = star_closedNodes[last][0].id.y
	cN.x = star_closedNodes[last][0].id.x
	
	if(cN.y === fN.y && cN.x === fN.x){
		star_nodesLoop = 1
	}
}


export const getColor = (val, s) =>{
	let e
	if(s === "stairs"){
		e = 100
	}else{
		e = 0
	}
	if(val==2 || val>4 && val<80+e) return 'yellow'
	if(val==182 || val>184 && val<261+e) return 'red'
	if(val==445 || val==446) return 'green'
	if(val==290 || val>199 && val<361) return 'blue'
	if(val>540 && val<581 || val==601 || val==602) return 'street'
	if(val>640 && val<661 || val >684 && val<701 || val==718) return 'storage'
}

export const instanceColor = (val,color) =>{
	switch(color){
		case 'yellow': 
			if(val==2 || val>4 && val<81){
				return true
			}break 
		case 'red': 	
			if(val==182 || val>184 && val<261){
				return true
			}break
		case 'green':
			if(val==445 || val==446){
				return true
			}break
		case 'blue':
			if(val==290 || val>299 && val<361){
				return true
			}break
		case 'street':
			if(val>540 && val<581 || val==601 || val==602){
				return true
			}break
		case 'storage':
			if(val>640 && val<661 || val >684 && val<701 || val==718){
				return true
			}break
		default: break
	}
}


export const starRoute = (arrMap, start, end, farbe) =>{
	star_node_start = {y:start.y,x:start.x}
	star_node_current = {y:start.y,x:start.x}
	star_node_end = {y:end.y,x:end.x}
	for(let g=0; g<arrMap.length; g++){
		star_nodes[g] = addEmptyArr(arrMap.length)
		for(let j=0; j<arrMap[0].length; j++){
			let kak=arrMap[g][j]
			if(instanceColor(kak,farbe)){
				star_nodes[g][j]="i"
			}
		}
	}

	while(star_nodesLoop==0){
		getNodes(star_node_start , star_node_current , star_node_end,arrMap)
	}

	let arr = findRoute(star_closedNodes,start)
	arr.reverse()
	star_resetVars()
	return arr
}
