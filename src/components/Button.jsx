import React from 'react'
import "../assest/button.css"

function button({className, value, onClick}) {
  return (
    <button className={className}  onClick={onClick}>{value}</button>
  )
}

export default button