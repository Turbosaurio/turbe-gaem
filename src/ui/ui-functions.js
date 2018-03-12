export let flipCamera = (cam,t) =>{
	let to_cam;
	switch(t){
		case "rotateCW":
			switch(cam){
				case 'ori': to_cam = "rot"; break;
				case 'rot': to_cam = "inv"; break;
				case 'inv': to_cam = "rev"; break;
				case 'rev': to_cam = "ori"; break;		
			}break;
		case "rotateCCW":
			switch(cam){
				case 'ori': to_cam = 'rev'; break;
				case 'rev': to_cam = 'inv'; break;
				case 'inv': to_cam = 'rot'; break;
				case 'rot': to_cam = 'ori'; break;
			}break;
		default: break;
	}
	return to_cam;
}