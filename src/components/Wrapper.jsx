import React from 'react'
import "../assest/wrapper.css"

function Wrapper({children}) {
  return (
    <div className='wrapper' >{children}</div>
  )
}

export default Wrapper