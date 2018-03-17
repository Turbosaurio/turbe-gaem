export let flipTileWall = (cam,value) =>{
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