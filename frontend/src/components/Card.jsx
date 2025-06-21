import React from 'react'

const Card = ({image, itemName}) => {
  return (
    <div className="card shadow-sm h-100" style={{width: '18rem'}}>
      <img src={image} className="card-img-top" alt="..." style={{height: '200px', objectFit: 'cover'}} />
      <div className="card-body d-flex flex-column">
        <p className="card-text text-center fw-semibold text-dark mb-0 flex-grow-1 d-flex align-items-center justify-content-center">{itemName}</p>
      </div>
    </div>
  )
}

export default Card