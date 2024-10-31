import React from 'react'
import './notF.css';
export const NotFound = () => {
  return (
    <>
 <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! La página que estás buscando no existe..</p>
      <a href="/" className="notfound-button">Regresar ala paguina principal</a>
    </div>
    </>
  )
}
