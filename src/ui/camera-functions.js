let flipTile = (cam,value) =>{
	let p=0;
	switch(cam){
		case "rot":
			if(value%4==0) p=-3;
			else p=1;
			break;
		case "rev":
			if(value%4==1) p=+3;
			else p=-1;
			break;
		case "inv":
			if(value%4==0) p=-2;
			if(value%4==3) p=-2;
			if(value%4==2) p=+2;
			if(value%4==1) p=+2;
			break;
		case "ori":
			p=0;
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
let cameraFloor = (level, cam) =>{
	let arr = level;
	for(let i = 0; i < level.length; i++){
		for(let k = 0; k < level[i].length; k++){
			arr[i][k] += flipTile(cam, level[i][k]);
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

export let rotateCamera = (arr, cam) =>{
	return cameraFloor(flipLevel(arr, cam), cam);
}

