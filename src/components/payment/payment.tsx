"use client";

import React, { useState } from "react";
import strype from "@/src/asseds/svg/stripe.svg";
import bkash from "@/src/asseds/svg/bkash.svg";
import nagat from "@/src/asseds/svg/nagad.svg";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Track the form inputs for each payment method
  const [formData, setFormData] = useState<{
    [key: string]: { [key: string]: string };
  }>({});

  // Payment methods data
  const paymentMethods = [
    {
      id: "bkash",
      name: "BKash",
      icon: bkash.src,
      fields: [
        { label: "Mobile Number", type: "number" },
        { label: "Amount", type: "number" },
        { label: "Pin", type: "password" },
      ],
    },
    {
      id: "strype",
      name: "Strype",
      icon: strype.src,
      fields: [
        { label: "Email", type: "email" },
        { label: "Password", type: "password" },
      ],
    },
    {
      id: "nagat",
      name: "Nagat",
      icon: nagat.src,
      fields: [
        { label: "Account Number", type: "text" },
        { label: "Routing Number", type: "text" },
      ],
    },
  ];

  // Handle input change
  const handleInputChange = (
    methodId: string,
    fieldLabel: string,
    value: string,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [methodId]: {
        ...prevData[methodId],
        [fieldLabel]: value,
      },
    }));
  };

  // Handle form submission (log form data)
  const handleSubmit = () => {
    if (selectedMethod) {
      console.log("Form Data for", selectedMethod, formData[selectedMethod]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>

      {/* Payment Method Header with Icons */}
      <div className="flex space-x-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-xl cursor-pointer ${selectedMethod === method.id ? "bg-blue-200" : "bg-gray-100"}`}
            onClick={() =>
              setSelectedMethod(selectedMethod === method.id ? null : method.id)
            } // Toggle selection
          >
            <img
              src={method.icon}
              alt={method.name}
              className="w-8 h-8 mb-2 mx-auto"
            />
            <p className="text-center">{method.name}</p>
          </div>
        ))}
      </div>

      {/* Payment Method Form Fields */}
      {paymentMethods.map((method) =>
        selectedMethod === method.id ? (
          <div key={method.id} className="space-y-4">
            {method.fields.map((field, index) => (
              <div key={index}>
                <label className="block font-medium">{field.label}</label>
                <input
                  type={field.type}
                  className="w-full p-2 border rounded-md"
                  placeholder={`Enter your ${field.label}`}
                  value={formData[method.id]?.[field.label] || ""}
                  onChange={(e) =>
                    handleInputChange(method.id, field.label, e.target.value)
                  } // Update form data
                />
              </div>
            ))}
          </div>
        ) : null,
      )}

      <div className="mt-6">
        {selectedMethod && (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-xl"
          >
            Proceed with{" "}
            {
              paymentMethods.find((method) => method.id === selectedMethod)
                ?.name
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
