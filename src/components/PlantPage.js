import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(plantData => setPlants(plantData))
  }, [])

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }
  
  function handleDeletePlant(deleteId) {
    setPlants(plants.filter(plant => plant.id !== deleteId))
  }
  
  function handleUpdatePrice(updatedPlant) {
    const newPlants = plants.map(plant => {
      if (plant.id === updatedPlant.id) {
        return {...plant, price: updatedPlant.price};
      } else {
        return plant;
      }
    });
    setPlants(newPlants);
  }

  function handleUpdateStock(updatedPlant) {
    const newPlants = plants.map(plant => {
      if (plant.id === updatedPlant.id) {
        return {...plant, inStock: updatedPlant.inStock};
      } else {
        return plant;
      }
    });
    setPlants(newPlants);
  }

  const filteredPlants = plants.filter(plant => {
    return plant.name.toLowerCase().includes(search.toLowerCase())
  })
    
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={setSearch}/>
      <PlantList
        plants={filteredPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePrice={handleUpdatePrice}
        onUpdateStock={handleUpdateStock}
      />
    </main>
  );
}

export default PlantPage;
