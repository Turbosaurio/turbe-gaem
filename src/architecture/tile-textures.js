export let tileTexture = (num) =>{
	const columns = 4,
				rows = 5,
				perPage = 20,
				x = 150, ////////////sprite width
				y = 300; //////////sprite height
	
	let	a = num % columns,
			path = "url(/textures/tiles" + Math.floor((num-1)/perPage) + ".png)",
			bg_pos_x = a * x * -1,
			bg_pos_y = Math.floor( (num-1) / columns ) % rows * y * -1;

	return {path, coord: bg_pos_x+"px "+bg_pos_y+"px"};
}


