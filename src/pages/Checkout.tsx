import { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const stripePromise = loadStripe(
  "pk_test_51PmqbxRp0kMLYuodo6GEboBunyisgpic6zye2zV0pUkRcaYMTKVhfXLS5wUrb59o8jMdYt0PBszeQWq38KVtTWHq00LXAaqKkk"
);

export const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/v1/payments/checkout-session", {
      method: "POST",
      body: JSON.stringify({
        carId: "844fe1ae-b684-4993-892d-13238a1838c4",
        from: "2024-08-16",
        to: "2024-08-17",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};
