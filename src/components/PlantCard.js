import React, { useState } from "react";

function PlantCard({plant}) {
  const {id, name, image, price} = plant;

  const [isInStock, setIsInStock] = useState(true);

  function onClickStock() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({inStock: !isInStock}),
    })
      .then(res => res.json())
      .then(updatedPlant => setIsInStock(updatedPlant.inStock))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button
          className="primary"
          onClick={onClickStock}
        >
            In Stock
        </button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
