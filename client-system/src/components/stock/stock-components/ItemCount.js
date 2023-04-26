import React, { useState, useEffect } from 'react';

function ProductDetails(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch product details data from API and update state
    fetch('http://localhost:8000/subcategory/get')
      .then(response => response.json())
      .then(data => {
        // Loop over array and extract pLevel and pQuantity values for each product
        const results = data.map(product => ({
          
          pName: product.pName,
          pLevel: product.pLevel,
          pQuantity: product.pQuantity
        }));
        setResults(results);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Check if pLevel and pQuantity are the same for each product
    results.forEach(product => {
      if (product.pLevel === product.pQuantity) {
        // Make POST request to low stock API
        fetch('http://localhost:8000/lowstock/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pName: product.pName })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to post data to low stock API');
            }
            console.log('Data posted to low stock API');
          })
          .catch(error => console.error(error));
      }
    });
  }, [results]);

  return (
    <div>
      {/* Render product details here */}
      {results.map(product => (
        <div key={product.pName} style={{marginTop:"140px"}}>
          <h2>{product.productName}</h2>
          <p>Level: {product.pLevel}</p>
          <p>Quant: {product.pQuantity}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductDetails;


