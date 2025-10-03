import React, { useState } from "react";

const productList = [
  { id: 1, name: "Mineral Water Plant Excel-2000 LPH", price: 635000 },
  { id: 2, name: "MVP Tank 2000 LTR (Qty 2)", price: 77000 },
  { id: 3, name: "Semi-Automatic Bottle Filling Machine 24 BPM", price: 575000 },
  { id: 4, name: "Online Batch Coding Machine", price: 195000 },
  { id: 5, name: "Sticker Labeling Machine – Single Head", price: 320000 },
  { id: 6, name: "Semi Auto Group Shrink Wrapping Machine", price: 295000 },
  { id: 7, name: "Semi Auto Pet Blow Moulding Machine – 2 Cavity", price: 830000 },
];

const App1 = () => {
  const [cart, setCart] = useState([]);

  const handleQuantityChange = (id, qty) => {
    const existing = cart.find((item) => item.id === id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    } else {
      const product = productList.find((p) => p.id === id);
      setCart([...cart, { ...product, quantity: qty }]);
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
      <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={(e) =>
                    handleQuantityChange(p.id, Number(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Bill Summary</h3>
      <h2>Subtotal: ₹{subtotal.toLocaleString()}</h2>
      <h3>GST (18%): ₹{gst.toLocaleString()}</h3>
      <h2>Total Payable: ₹{total.toLocaleString()}</h2>
    </div>
  );
};

export default App1;