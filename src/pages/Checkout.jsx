import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // adjust path if your cart context lives elsewhere
import styles from "./Checkout.module.css";

const STEPS = ["Address", "Payment", "Review"];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart(); // expects these from your CartContext

  const [step, setStep] = useState(0); // 0=Address, 1=Payment, 2=Review
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");

  /* ── Address state ── */
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  /* ── Payment state ── */
  const [payMethod, setPayMethod] = useState("upi"); // "upi" | "card" | "cod"
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const subtotal = cartTotal ?? 0;
  const shipping = subtotal > 0 ? (subtotal >= 10000 ? 0 : 250) : 0;
  const total = subtotal + shipping;

  /* ── Validation per step ── */
  const validateAddress = () => {
    const { name, phone, line1, city, state, pincode } = address;
    if (!name || !phone || !line1 || !city || !state || !pincode) {
      setError("Please fill in all required address fields.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number.");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setError("Enter a valid 6-digit pincode.");
      return false;
    }
    setError("");
    return true;
  };

  const validatePayment = () => {
    if (payMethod === "upi") {
      if (!/^[\w.-]+@[\w]+$/.test(upiId)) {
        setError("Enter a valid UPI ID (e.g. name@bank).");
        return false;
      }
    }
    if (payMethod === "card") {
      const { number, name, expiry, cvv } = card;
      if (!number || !name || !expiry || !cvv) {
        setError("Please fill in all card details.");
        return false;
      }
      if (!/^\d{16}$/.test(number.replace(/\s/g, ""))) {
        setError("Card number must be 16 digits.");
        return false;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        setError("Enter a valid CVV.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const goNext = () => {
    if (step === 0 && !validateAddress()) return;
    if (step === 1 && !validatePayment()) return;
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart?.();
    }, 1600);
  };

  /* ── Order success screen ── */
  if (placed) {
    return (
      <div className={styles.page}>
        <div className={styles.stars} aria-hidden="true">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className={styles.star}
              style={{
                left: `${(i * 19.1 + 4) % 100}%`,
                top: `${(i * 11.3 + 6) % 100}%`,
                animationDelay: `${((i * 0.31) % 4).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✦</div>
          <h2 className={styles.successTitle}>Order Confirmed</h2>
          <p className={styles.successText}>
            Your cosmic pieces are being prepared. A confirmation has been sent
            to your registered details.
          </p>
          <p className={styles.orderId}>
            Order ID: AST-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <button className={styles.primaryBtn} onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
          <Link to="/account" className={styles.secondaryLink}>
            View Order History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.stars} aria-hidden="true">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${(i * 19.1 + 4) % 100}%`,
              top: `${(i * 11.3 + 6) % 100}%`,
              animationDelay: `${((i * 0.31) % 4).toFixed(2)}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🔮</span>
            <span className={styles.logoText}>Astrotring</span>
          </Link>
          <Link to="/shop" className={styles.backLink}>
            ← Back to Shop
          </Link>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          {STEPS.map((label, i) => (
            <div key={label} className={styles.stepItem}>
              <div
                className={`${styles.stepCircle} ${
                  i === step ? styles.stepActive : i < step ? styles.stepDone : ""
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ""}`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ""}`} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {/* ── Main panel ── */}
          <div className={styles.mainPanel}>
            {error && <p className={styles.error}>{error}</p>}

            {/* STEP 1: ADDRESS */}
            {step === 0 && (
              <div className={styles.panelCard}>
                <h3 className={styles.panelTitle}>Shipping Address</h3>

                <label className={styles.label}>
                  Full Name *
                  <input
                    className={styles.input}
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="Ayansh Pandey"
                  />
                </label>

                <label className={styles.label}>
                  Phone Number *
                  <input
                    className={styles.input}
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </label>

                <label className={styles.label}>
                  Address Line 1 *
                  <input
                    className={styles.input}
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    placeholder="House no., street"
                  />
                </label>

                <label className={styles.label}>
                  Address Line 2
                  <input
                    className={styles.input}
                    value={address.line2}
                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                    placeholder="Landmark, area (optional)"
                  />
                </label>

                <div className={styles.row3}>
                  <label className={styles.label}>
                    City *
                    <input
                      className={styles.input}
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                  </label>
                  <label className={styles.label}>
                    State *
                    <input
                      className={styles.input}
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    />
                  </label>
                  <label className={styles.label}>
                    Pincode *
                    <input
                      className={styles.input}
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      maxLength={6}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 1 && (
              <div className={styles.panelCard}>
                <h3 className={styles.panelTitle}>Payment Method</h3>

                <div className={styles.payOptions}>
                  {[
                    { id: "upi", label: "UPI", icon: "📱" },
                    { id: "card", label: "Credit / Debit Card", icon: "💳" },
                    { id: "cod", label: "Cash on Delivery", icon: "💰" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`${styles.payOption} ${
                        payMethod === opt.id ? styles.payOptionActive : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        value={opt.id}
                        checked={payMethod === opt.id}
                        onChange={() => setPayMethod(opt.id)}
                        className={styles.radio}
                      />
                      <span className={styles.payIcon}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                {payMethod === "upi" && (
                  <label className={styles.label} style={{ marginTop: "1rem" }}>
                    UPI ID *
                    <input
                      className={styles.input}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@bank"
                    />
                  </label>
                )}

                {payMethod === "card" && (
                  <div style={{ marginTop: "1rem" }}>
                    <label className={styles.label}>
                      Card Number *
                      <input
                        className={styles.input}
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </label>
                    <label className={styles.label}>
                      Name on Card *
                      <input
                        className={styles.input}
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                      />
                    </label>
                    <div className={styles.row2}>
                      <label className={styles.label}>
                        Expiry *
                        <input
                          className={styles.input}
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </label>
                      <label className={styles.label}>
                        CVV *
                        <input
                          className={styles.input}
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {payMethod === "cod" && (
                  <p className={styles.codNote}>
                    Pay in cash when your order is delivered. A small COD fee may apply.
                  </p>
                )}
              </div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 2 && (
              <div className={styles.panelCard}>
                <h3 className={styles.panelTitle}>Review Your Order</h3>

                <div className={styles.reviewBlock}>
                  <div className={styles.reviewHeader}>
                    <span>Shipping To</span>
                    <button className={styles.editBtn} onClick={() => setStep(0)}>
                      Edit
                    </button>
                  </div>
                  <p className={styles.reviewText}>
                    {address.name} · {address.phone}
                    <br />
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}
                    <br />
                    {address.city}, {address.state} – {address.pincode}
                  </p>
                </div>

                <div className={styles.reviewBlock}>
                  <div className={styles.reviewHeader}>
                    <span>Payment Method</span>
                    <button className={styles.editBtn} onClick={() => setStep(1)}>
                      Edit
                    </button>
                  </div>
                  <p className={styles.reviewText}>
                    {payMethod === "upi" && `UPI — ${upiId}`}
                    {payMethod === "card" &&
                      `Card ending in ${card.number.replace(/\s/g, "").slice(-4) || "----"}`}
                    {payMethod === "cod" && "Cash on Delivery"}
                  </p>
                </div>

                <div className={styles.reviewBlock}>
                  <div className={styles.reviewHeader}>
                    <span>Items ({cartItems?.length ?? 0})</span>
                  </div>
                  {cartItems?.map((item) => (
                    <div key={item.id} className={styles.reviewItem}>
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className={styles.navRow}>
              {step > 0 ? (
                <button className={styles.secondaryBtn} onClick={goBack}>
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <button className={styles.primaryBtn} onClick={goNext}>
                  Continue
                </button>
              ) : (
                <button
                  className={styles.primaryBtn}
                  onClick={placeOrder}
                  disabled={placing}
                >
                  {placing ? <span className={styles.spinner} /> : "Place Order"}
                </button>
              )}
            </div>
          </div>

          {/* ── Order summary sidebar ── */}
          <div className={styles.summaryPanel}>
            <h3 className={styles.panelTitle}>Order Summary</h3>
            {cartItems?.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <span className={styles.summaryItemName}>
                  {item.name} <span className={styles.qty}>× {item.qty}</span>
                </span>
                <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
              </div>
            ))}

            <div className={styles.summaryDivider} />

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}