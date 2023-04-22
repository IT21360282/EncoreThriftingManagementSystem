import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemComponent = () => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get('/subcategory/get')
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (item && item.pQuantity <= item.pLevel) {
    return (
      <div style={{marginTop:"140px"}}>
        <h1>{item.name}</h1>
      </div>
    );
  } else {
    return null;
  }
};

export default ItemComponent;