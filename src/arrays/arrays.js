export let rotateArr = (arr) =>{
	const limit = arr.length * 2 - 1;
	let	iso=[],
			a,
			b;
	for(let k = 0, m = limit; k < limit; k++, m--){
		let	y = k, x = 0, u = k;
		if(k > arr.length-1){
			y = arr.length-1;
			x = k-arr.length+1;
			u = m-1;
		}
		iso.push( [ [y,x] ] );
		a = iso[k][0][0];
		b = iso[k][0][1];
		for(let g = 0; g < u; g++){
			a--;
			b++;
			iso[k].push( [a,b]) ;
		}
	}
	return iso;
}

export let rhombus = (e) =>{
	e++;
	let arr = [];
	for(let i = 1; i<e*2; i++){
		let qui = 0,
				aux =  i>e ? e-i%e : i;
		for(let h = 1; h < aux; h++){
			aux / 2 !== Math.ceil(aux/2) ? qui++ : qui = h%aux;
			arr.push( [qui + h - aux]);
		};
	};
	return arr;
}


export let Sqaure = (e) =>{
	let a = []; 
	for(let i = 0; i < e; i++){
		for(let j = 0; j < e; j++){
			a.push(i);
		}
	}
	return a;
}