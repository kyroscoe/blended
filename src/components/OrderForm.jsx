import { useState } from "react";

const formName = "general-inquiry";

const initialFormState = {
  customerName: "",
  email: "",
  phone: "",
  interest: "",
  timing: "",
  message: ""
};

function encodeForm(data) {
  const formData = new URLSearchParams();
  formData.append("form-name", formName);

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
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
        throw new Error("Form submission failed");
      }

      setFormData(initialFormState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="section-shell order-section" id="inquiry" aria-labelledby="inquiry-heading">
      <div className="section-heading">
        <h2 id="inquiry-heading">Start a Conversation</h2>
        <p>
          Tell us what you are interested in and we will follow up to talk through availability, timing, and details. No payment is taken here.
        </p>
      </div>

      <form
        className="order-form"
        name={formName}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value={formName} />
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
          <label>
            Interested in
            <select name="interest" value={formData.interest} onChange={handleChange} required>
              <option value="">Select one</option>
              <option>Bowls</option>
              <option>Cakes</option>
              <option>Private event</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            Preferred timing
            <input
              name="timing"
              type="text"
              placeholder="Example: Friday afternoon, next week, or a future event date"
              value={formData.timing}
              onChange={handleChange}
            />
          </label>
          <label className="full-width-field">
            Details
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you have in mind. Include flavors, bowl choices, quantity, event details, questions, or anything else that would help us follow up."
              required
            />
          </label>
        </div>

        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Inquiry"}
        </button>

        <div className="form-status" aria-live="polite">
          {status === "success" && "Thanks! Your inquiry was sent. We will follow up to continue the conversation."}
          {status === "error" && "Something went wrong. Please try again or email us directly."}
        </div>
      </form>
    </section>
  );
}
