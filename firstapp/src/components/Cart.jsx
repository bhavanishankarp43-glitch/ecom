import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("Login first");
      navigate("/login");
      return;
    }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/cart", {
        params: { userId },
      });

      if (res.status === 200) {
        setCart(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching cart", err);
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cart?.items?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.product.name}</td>
                  <td>₹{item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end">
            Grand Total: ₹{calculateTotal()}
          </h4>
        </>
      )}
    </div>
  );
}
