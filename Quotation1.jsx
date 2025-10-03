import React, { useState } from "react";

const productList = [
  {
    systemId: 1,
    systemName: "System 1 - Mineral Water Plant",
    products: [
      { id: 101, name: "Mineral Water Plant Excel-2000 LPH", type: "semi-auto", price: 635000 },
      { id: 102, name: "Mineral Water Plant Excel-2000 LPH", type: "automatic", price: 700000 }
    ]
  },
  {
    systemId: 2,
    systemName: "System 2 - Storage Tank",
    products: [
      { id: 201, name: "MVP Tank 2000 LTR", type: "SS Steel", price: 77000 },
      { id: 202, name: "MVP Tank 2000 LTR", type: "Plastic", price: 55000 }
    ]
  },
  {
    systemId: 3,
    systemName: "System 3 - Bottle Filling",
    products: [
      { id: 301, name: "Semi-Automatic Bottle Filling Machine", type: "24 BPM", price: 575000 }
    ]
  }
];

const Quotation1 = () => {
  const [cart, setCart] = useState([]);

  const handleSelect = (product, quantity) => {
    if (quantity > 0) {
      setCart((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity } : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    } else {
      setCart((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const getTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const gst = subtotal * 0.18;
    return { subtotal, gst, total: subtotal + gst };
  };

  const { subtotal, gst, total } = getTotal();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Mineral Water Project Pricing</h2>

      {productList.map((system) => (
        <div key={system.systemId} style={{ marginBottom: "20px" }}>
          <h3>{system.systemName}</h3>
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {system.products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      defaultValue="0"
                      onChange={(e) =>
                        handleSelect(p, Number(e.target.value))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h3>Bill Summary</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} ({item.type}) x {item.quantity} = ₹
            {(item.price * item.quantity).toLocaleString()}
          </li>
        ))}
      </ul>
      <p>Subtotal: ₹{subtotal.toLocaleString()}</p>
      <p>GST (18%): ₹{gst.toLocaleString()}</p>
      <h2>Total Payable: ₹{total.toLocaleString()}</h2>
    </div>
  );
};

export default Quotation1;