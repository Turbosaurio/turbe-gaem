import { useState, useContext } from "react"

export default initialValues => {
  const [inputs, setInputs] = useState(initialValues)
  const handleInputChange = event => {
    event.persist()
    setInputs(currentInputs => ({
      ...currentInputs,
      [event.target.name]: event.target.value
    }))
  }
  return { inputs, handleInputChange }
}
