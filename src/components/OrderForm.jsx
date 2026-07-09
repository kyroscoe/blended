import { useState } from "react";
import { bowls } from "../data/bowls.js";

const initialFormState = {
  customerName: "",
  email: "",
  phone: "",
  bowl: bowls[0].name,
  size: "Small - $10",
  quantity: "1",
  pickupTime: "",
  notes: "",
  addons: []
};

const addOns = [
  "Additional fruit",
  "Additional toppings or drizzle",
  "Coconut or Dragonfruit Floater",
  "Coconut or Dragonfruit Base",
  "Base only"
];

function encodeForm(data) {
  const formData = new URLSearchParams();
  formData.append("form-name", "order");

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, Array.isArray(value) ? value.join(", ") : value);
  });

  return formData.toString();
}

export default function OrderForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleAddonChange = (event) => {
    const { value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      addons: checked
        ? [...current.addons, value]
        : current.addons.filter((addon) => addon !== value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(formData)
      });

      if (!response.ok) {
        throw new Error("Order submission failed");
      }

      setFormData(initialFormState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="section-shell order-section" id="order" aria-labelledby="order-heading">
      <div className="section-heading">
        <h2 id="order-heading">Order</h2>
        <p>
          No payment is taken here. Netlify will capture your order, and email
          notifications can be configured later. For now, use{" "}
          <a href="mailto:orders@blendedacaibar.com">orders@blendedacaibar.com</a>.
        </p>
      </div>
      <form
        className="order-form"
        name="order"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="order" />
        <p className="hidden-field">
          <label>
            Do not fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>

        <div className="form-grid">
          <label>
            Customer name
            <input
              name="customerName"
              type="text"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Bowl selection
            <select name="bowl" value={formData.bowl} onChange={handleChange}>
              {bowls.map((bowl) => (
                <option key={bowl.id} value={bowl.name}>
                  {bowl.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Size
            <select name="size" value={formData.size} onChange={handleChange}>
              <option>Kids - $7</option>
              <option>Small - $10</option>
              <option>Large - $13</option>
            </select>
          </label>
          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preferred pickup time
            <input
              name="pickupTime"
              type="text"
              placeholder="Today at 3:30 PM"
              value={formData.pickupTime}
              onChange={handleChange}
            />
          </label>
        </div>

        <fieldset>
          <legend>Add-ons</legend>
          <div className="checkbox-grid">
            {addOns.map((addon) => (
              <label className="checkbox-label" key={addon}>
                <input
                  type="checkbox"
                  name="addons"
                  value={addon}
                  checked={formData.addons.includes(addon)}
                  onChange={handleAddonChange}
                />
                <span>{addon}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          Notes
          <textarea
            name="notes"
            rows="5"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Allergies, swaps, pickup details..."
          />
        </label>

        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Submit Order"}
        </button>

        <div className="form-status" aria-live="polite">
          {status === "success" && "Thanks! Your order was sent."}
          {status === "error" && "Something went wrong. Please try again or email us directly."}
        </div>
      </form>
    </section>
  );
}
