import React from 'react'
import "../assest/screen.css"

function Screen({value}) {
  return (
    <div className='screen' mode="single" max={70} >
         {value}
    </div>
  )
}

export default Screen