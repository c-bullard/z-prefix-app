import '../App.css';
import './Inventory.css';
import { useState, useEffect } from 'react';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/items/')
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {inventory.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>
                  {item.description?.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
