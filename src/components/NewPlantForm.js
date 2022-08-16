import React, { useState } from "react";

const intitialFormState = {name: "", image: "", price: ""}

function NewPlantForm({onAddPlant}) {
  const [formData, setFormData] = useState(intitialFormState)

  function handleOnChange(event) {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  function onSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newPlant => {
        onAddPlant(newPlant);
        setFormData(intitialFormState);
      })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleOnChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleOnChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
