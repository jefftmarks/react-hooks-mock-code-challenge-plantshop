import React, { useState } from "react";

function PlantCard({plant, handleOnDeletePlant}) {
  const {id, name, image, price} = plant;

  const [isInStock, setIsInStock] = useState(true);
  const [plantPrice, setPlantPrice] = useState(price);

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

  function onUpdatePrice(event) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({price: event.target.value}),
    })
      .then(res => res.json())
      .then(updatedPlant => setPlantPrice(updatedPlant.price))
  }

  function onDeletePlant() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => handleOnDeletePlant(id))
  }


  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <label htmlFor="price">Price:
      <input
        type="number"
        id="price"
        name="price"
        value={plantPrice}
        onChange={onUpdatePrice}
      />
      </label>
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
      <button onClick={onDeletePlant}>Delete</button>
    </li>
  );
}

export default PlantCard;
