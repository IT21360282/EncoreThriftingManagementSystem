fetch('/subcategory/get/low-stock')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      if (data.lowStockItems.length > 0) {
        // Display low stock items
        const list = document.createElement('ul');
        data.lowStockItems.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.name}: ${item.quantity} (${item.reorderLevel} reorder level)`;
          list.appendChild(listItem);
        });
        document.getElementById('low-stock-items').appendChild(list);
      } else {
        // Display no low stock items message
        const message = document.createElement('p');
        message.textContent = 'No low stock items found.';
        document.getElementById('low-stock-items').appendChild(message);
      }
    } else {
      // Display error message
      const message = document.createElement('p');
      message.textContent = 'Error: ' + data.message;
      document.getElementById('low-stock-items').appendChild(message);
    }
  })
  .catch(err => {
    // Display error message
    const message = document.createElement('p');
    message.textContent = 'Error: ' + err.message;
    document.getElementById('low-stock-items').appendChild(message);
  });
