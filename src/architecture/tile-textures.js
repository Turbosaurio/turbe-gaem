export let tileTexture = (num) =>{
	const	columns = 4,
				rows = 5,
				perPage = 20,
				max = 880, ///////////total textures
				x = 150, ////////////sprite width
				y = 300; //////////sprite height
	
	let	a = num % columns,
			path = "/textures/tiles" + Math.floor((num-1)/perPage) + ".png";

	let	bg_pos_x = a * x * -1,
			bg_pos_y = Math.floor( (num-1) / columns ) % rows * y * -1,
			position = {
				img_path: path,
				img_top: bg_pos_y,
				img_left: bg_pos_x
			} 
	//console.log(position);
	return {position};
}


