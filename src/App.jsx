import React, { useState } from 'react'
import MapComponent from './components/MapComponent'
import Controls from './components/Controls'
import { poiData } from './data/poiData'
import { socialGroups } from './data/socialGroups'

function App() {
  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(poiData.categories).reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {})
  );
  
  const [selectedSocialGroup, setSelectedSocialGroup] = useState('young_adults');
  const [clickedValue, setClickedValue] = useState(null);
  
  const filteredPOIs = poiData.points.filter(poi => 
    selectedCategories[poi.category]
  );

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSocialGroupChange = (groupId) => {
    setSelectedSocialGroup(groupId);
  };

  const handleMapClick = (value) => {
    setClickedValue(value);
  };

  return (
    <div className="app-container">
      <Controls 
        categories={poiData.categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        socialGroups={socialGroups}
        selectedSocialGroup={selectedSocialGroup}
        onSocialGroupChange={handleSocialGroupChange}
      />
      <div className="map-container">
        <MapComponent 
          pois={filteredPOIs}
          categoryWeights={socialGroups[selectedSocialGroup].weights}
          onMapClick={handleMapClick}
        />
        {clickedValue !== null && (
          <div className="value-display">
            Location Value: {clickedValue.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
