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

  function handleSearch(query) {
    setSearch(query)
  }
  
  function handleDeletePlant(deleteId) {
    setPlants(plants.filter(plant => plant.id !== deleteId))
  }

  const filteredPlants = plants.filter(plant => {
    return plant.name.toLowerCase().includes(search.toLowerCase())
  })
    

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch}/>
      <PlantList plants={filteredPlants} handleOnDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
