import React from 'react';

const Controls = ({ 
  categories, 
  selectedCategories, 
  onCategoryToggle, 
  socialGroups, 
  selectedSocialGroup, 
  onSocialGroupChange 
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <h3>Social Group</h3>
        <select 
          className="social-group-selector"
          value={selectedSocialGroup}
          onChange={(e) => onSocialGroupChange(e.target.value)}
        >
          {Object.entries(socialGroups).map(([id, group]) => (
            <option key={id} value={id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <h3>POI Categories</h3>
        <div className="checkbox-group">
          {Object.entries(categories).map(([id, category]) => (
            <div key={id} className="checkbox-item">
              <input
                type="checkbox"
                id={`category-${id}`}
                checked={selectedCategories[id]}
                onChange={() => onCategoryToggle(id)}
              />
              <label htmlFor={`category-${id}`} style={{ color: category.color }}>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;
