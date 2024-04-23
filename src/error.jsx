import React from 'react'
import { Link } from 'react-router-dom'

const error=()=>{
  return (
    <>
    <div className="container">
<div className="row">
    <div className="col-12">
    <div className="error">
    <h2>404</h2>
    <h3>Page Not Found</h3>
    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
    <Link to="/">Go back home</Link>
    </div>
    </div>
    </div>
</div>
    </>
  )
}

export default error