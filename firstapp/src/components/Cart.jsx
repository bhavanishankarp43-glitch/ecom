import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://ecom-33ef.onrender.com/api/cart?userId=${userId}`)
        .then((res) => setCartItems(res.data.items || []))
        .catch((err) => console.log(err));
    }
  }, [userId]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="cart-logo"
            style={styles.logo}
          />
          <h2 style={styles.headerTitle}>My Shopping Cart</h2>
        </div>

        <div style={styles.content}>
          {/* LEFT SECTION */}
          <div style={styles.itemsSection}>
            {cartItems.length === 0 ? (
              <p style={styles.empty}>Your cart is empty</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} style={styles.itemCard}>
                  <img
                    src={`https://ecom-33ef.onrender.com/uploads/${item.product.image}`}
                    alt={item.product.name}
                    style={styles.productImage}
                  />

                  <div style={styles.itemInfo}>
                    <h4 style={styles.productName}>
                      {item.product.name}
                    </h4>
                    <p style={styles.category}>
                      {item.product.category}
                    </p>
                    <p style={styles.quantity}>
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div style={styles.priceBox}>
                    <p style={styles.price}>
                      ₹{item.product.price}
                    </p>
                    <p style={styles.totalPrice}>
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SECTION */}
          {cartItems.length > 0 && (
            <div style={styles.summarySection}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <span style={{ color: "#2ecc71" }}>FREE</span>
              </div>

              <hr />

              <div style={styles.totalRow}>
                <span>Total</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <button style={styles.checkoutBtn}>
                Proceed to Checkout
              </button>

              <p style={styles.secureText}>
                🔒 Secure & Encrypted Payments
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#f1f3f6",
    minHeight: "100vh",
    padding: "30px",
  },
  container: {
    maxWidth: "1100px",
    margin: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  },
  logo: {
    width: "45px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "700",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "2.5fr 1fr",
    gap: "30px",
  },
  itemsSection: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    borderBottom: "1px solid #eee",
  },
  productImage: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "1px solid #ddd",
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },
  category: {
    fontSize: "13px",
    color: "#888",
  },
  quantity: {
    fontSize: "14px",
    marginTop: "4px",
  },
  priceBox: {
    textAlign: "right",
  },
  price: {
    fontSize: "14px",
    color: "#888",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "700",
  },
  summarySection: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    height: "fit-content",
  },
  summaryTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "700",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "700",
    marginTop: "10px",
  },
  checkoutBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "linear-gradient(135deg,#ff9f00,#ff6f00)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  secureText: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "10px",
    color: "#777",
  },
};

export default Cart;
