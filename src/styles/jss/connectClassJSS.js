import React from "react"
import mapJSS from './mapJSS'

export default function ClassWithJSS (Component, jss){
  return props => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component jss={mapJSS(jss)} {...props} />
  }
}
