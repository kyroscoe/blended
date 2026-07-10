import { useState } from "react";
import { bowls } from "../data/bowls.js";

const formTypes = [
  { id: "bowl-order", label: "Bowl Ordering" },
  { id: "cake-order", label: "Cakes" },
  { id: "private-event", label: "Private Events" },
  { id: "general-question", label: "General Questions" }
];

const initialFormState = {
  customerName: "",
  email: "",
  phone: "",
  bowl: bowls[0].name,
  size: "Small - $10",
  quantity: "1",
  addons: [],
  pickupTime: "",
  cakeDetails: "",
  eventDate: "",
  guestCount: "",
  subject: "",
  message: ""
};

const addOns = [
  "Additional fruit",
  "Additional toppings or drizzle",
  "Coconut or Dragonfruit Floater",
  "Coconut or Dragonfruit Base",
  "Base only"
];

function encodeForm(formName, data) {
  const formData = new URLSearchParams();
  formData.append("form-name", formName);

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, Array.isArray(value) ? value.join(", ") : value);
  });

  return formData.toString();
}

export default function OrderForm() {
  const [activeForm, setActiveForm] = useState(formTypes[0].id);
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");

  const activeLabel = formTypes.find((form) => form.id === activeForm)?.label;

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
        body: encodeForm(activeForm, formData)
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
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
          Choose what you need and send the details. No payment is taken here.
        </p>
      </div>

      <div className="form-tabs" role="tablist" aria-label="Inquiry types">
        {formTypes.map((form) => (
          <button
            key={form.id}
            type="button"
            role="tab"
            aria-selected={activeForm === form.id}
            className={activeForm === form.id ? "form-tab active" : "form-tab"}
            onClick={() => {
              setActiveForm(form.id);
              setStatus("idle");
            }}
          >
            {form.label}
          </button>
        ))}
      </div>

      <form
        className="order-form"
        name={activeForm}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value={activeForm} />
        <input type="hidden" name="inquiryType" value={activeLabel} />
        <p className="hidden-field">
          <label>
            Do not fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>

        <div className="form-grid">
          <label>
            Name
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
            Phone
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          {activeForm === "bowl-order" && (
            <>
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
            </>
          )}

          {activeForm === "cake-order" && (
            <>
              <label>
                Pickup date
                <input
                  name="eventDate"
                  type="text"
                  placeholder="Date needed"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </label>
              <label className="full-width-field">
                Cake details
                <textarea
                  name="cakeDetails"
                  rows="5"
                  value={formData.cakeDetails}
                  onChange={handleChange}
                  placeholder="Size, flavors, message, timing, and any inspiration."
                  required
                />
              </label>
            </>
          )}

          {activeForm === "private-event" && (
            <>
              <label>
                Event date
                <input
                  name="eventDate"
                  type="text"
                  placeholder="Event date"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Guest count
                <input
                  name="guestCount"
                  type="text"
                  value={formData.guestCount}
                  onChange={handleChange}
                />
              </label>
              <label className="full-width-field">
                Event details
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're planning."
                  required
                />
              </label>
            </>
          )}

          {activeForm === "general-question" && (
            <>
              <label>
                Subject
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="full-width-field">
                Question
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}
        </div>

        {activeForm === "bowl-order" && (
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
        )}

        {(activeForm === "bowl-order" || activeForm === "cake-order") && (
          <label>
            Notes
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Anything else we should know?"
            />
          </label>
        )}

        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Submit"}
        </button>

        <div className="form-status" aria-live="polite">
          {status === "success" && "Thanks! Your message was sent."}
          {status === "error" && "Something went wrong. Please try again or email us directly."}
        </div>
      </form>
    </section>
  );
}
