import { createUseStyles } from "react-jss"

export default (styles, props) => {
	const map = createUseStyles(styles)(props)
	return (classes = []) => {
    return classes
      .reduce((acc, curr) => {
        if (map[curr]) {
          acc.push(map[curr])
        }
        return acc
      }, [])
      .join(" ")
  }
}