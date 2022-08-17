import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onDeletePlant, onUpdatePrice, onUpdateStock}) {
  return (
    <ul className="cards">
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDeletePlant={onDeletePlant}
          onUpdatePrice={onUpdatePrice}
          onUpdateStock={onUpdateStock}
        />
      ))}
    </ul>
  );
}

export default PlantList;
