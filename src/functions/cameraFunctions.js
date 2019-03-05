export const onlyRotable = value =>{
	const rotableTiles = [1,81,181,241,321];
	const rotable = _ => {
		let res = true
		for(let tile of rotableTiles){
			if(tile === value) res = false
		}
		return res
	}
	return rotable()
}

const addEmptyArr = total =>{
	let e = []
	for(let e of total){ e.push("u") }
	return e
}

export const rotateLevel = (arr, cam) =>{
	let a = []
	for(let h = 0, j = arr.length-1; h < arr.length; h++, j--){
		a[h] = addEmptyArr(arr);
		for(let n = 0, m = arr.length-1; n < arr.length; n++, m--){
			switch(cam){
				case 'ori':
					a[h][n] = arr[h][n]
					break
				case "rot":
					a[h][n] = arr[m][h]
					break
				case "rev":
					a[h][n] = arr[n][j]
					break
				case "inv":
					a[h][n] = arr[j][m]
					break
				default: break
			}
		}
	}
	return a
}

export const rotatePlayer = (y, x, cam, max) =>{
	switch(cam){
		case 'ori': return {y, x}
		case "rot": return {y: y, x: max-x}
		case "inv": return {y: max-y, x: max-x}
		case "rev": return {y: max-y, x: x}
		default: return {y,x}
	}
}