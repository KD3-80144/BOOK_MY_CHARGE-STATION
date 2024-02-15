import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const { state } = useLocation();
  console.log("2222222");
  console.log(state.data);
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const options = {
      key: "rzp_test_W4byT86osE33RE", // Enter the Key ID generated from the Dashboard
      amount: state.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: state.data.data.currency,
      name: "Book My Charge Station",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: state.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:3001/payment/callback/${localStorage.getItem(
        "user_id"
      )}`,
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    displayRazorpay();
  }, []);

  return <></>;
}
