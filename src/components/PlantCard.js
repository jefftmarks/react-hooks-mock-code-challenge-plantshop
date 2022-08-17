import React from "react";

function PlantCard({plant, onDeletePlant, onUpdatePrice, onUpdateStock}) {

  const {id, name, image, price , inStock} = plant;

  function onClickStock() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({inStock: !plant.inStock}),
    })
      .then(res => res.json())
      .then(updatedPlant => onUpdateStock(updatedPlant))
  }

  function onClickPrice(event) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({price: event.target.value}),
    })
      .then(res => res.json())
      .then(updatedPlant => onUpdatePrice(updatedPlant))
  }

  function onClickDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => onDeletePlant(id))
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
        value={price}
        onChange={onClickPrice}
      />
      </label>
      {inStock ? (
        <button
          className="primary"
          onClick={onClickStock}
        >
            In Stock
        </button>
      ) : (
        <button
          onClick={onClickStock}
        >
          Out of Stock
        </button>
      )}
      <button onClick={onClickDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
