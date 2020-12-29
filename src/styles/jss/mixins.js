
export const hover = args => ({
	'&:hover, &:focus':{ ...args }
})

export const stripped_button = _ => ({
	border: 'none',
	padding: 0,
	borderRadius: 5
})

export const theme_button = (colorA, colorB) => {
	return{
		backgroundColor: colorA.background,
		color: colorA.over,
		...hover({
			backgroundColor: colorB.background,
			color: colorB.over
		})
	}
}