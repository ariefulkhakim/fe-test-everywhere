"use client";
import ContactForm from "@/components/page/contact/ContactScreen";
import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
