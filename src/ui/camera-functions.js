let flipTile = (cam,value) =>{
	let p = 0;
	switch(cam){
		case "rot":
			if(value % 4 === 0) p = -3;
			else p = 1;
			break;
		case "rev":
			if(value % 4 === 1) p = +3;
			else p = -1;
			break;
		case "inv":
			if(value % 4 === 0) p = -2;
			if(value % 4 === 3) p = -2;
			if(value % 4 === 2) p = +2;
			if(value % 4 === 1) p = +2;
			break;
		case "ori":
			p = 0;
			break;
		default: break;
	}
	return p;
}

let addEmptyArr = (tot) =>{
	let e=[];
	for(var h = 0; h < tot.length; h++){
		e.push("u");
	}
	return e;
}

let onlyRotable = (value) =>{
	let rotableTiles = [1,81,161,241,321];
	for(let i of rotableTiles){
		if( i === value){
			return false;
		}else{
			return true;
		}
	}

}

let cameraFloor = (level, cam) =>{
	let arr = level;
	for(let i = 0; i < level.length; i++){
		for(let k = 0; k < level[i].length; k++){
			if(onlyRotable(arr[i][k])){
				arr[i][k] += flipTile(cam, level[i][k]);
			}
		}
	}
	return arr;
}
let flipLevel = (arr, cam) =>{
	let a = [];
	for(let h = 0, j = arr.length-1; h < arr.length; h++, j--){
		a[h] = addEmptyArr(arr);
		for(let n = 0, m = arr.length-1; n < arr.length; n++, m--){
			switch(cam){
				case 'ori':
					a[h][n] = arr[h][n];
					break;
				case "rot":
					a[h][n] = arr[m][h];
					break;
				case "rev":
					a[h][n] = arr[n][j];
					break;
				case "inv":
					a[h][n] = arr[j][m];
					break;
				default: break;
			}
		}
	}
	return a;
}
let changeDirection = (cam, direction) =>{
	let new_cam;
	switch(direction){
		case "left":
			switch (cam){
				case 'ori': new_cam = "rot"; break;
				case 'rot': new_cam = "rev"; break;
				case 'rev': new_cam = "inv"; break;
				case 'inv': new_cam = "ori"; break;
				default: break;
			}
			break;
		case "right":
			switch (cam){
				case 'ori': new_cam = "rev"; break;
				case 'rev': new_cam = "inv"; break;
				case 'inv': new_cam = "rot"; break;
				case 'rot': new_cam = "ori"; break;
				default: break;
			}
			break;
		default: break;
	}
	return new_cam;
}
export let rotateCamera = (cam, arr, direction) =>{
	let newDir = changeDirection(cam, direction);
	let newArr = flipLevel(cameraFloor(arr,newDir), newDir);
	return {
		cam: newDir,
		arr: newArr
	}
}

