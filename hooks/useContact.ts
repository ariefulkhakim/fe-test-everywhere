import { ContactFormValues, initialFormValues } from "@/types/contact.type";
import React, { useState } from "react";
export const useContact = () => {
  const validateForm = (values: ContactFormValues) => {
    const errors: Partial<ContactFormValues> = {};
    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (values.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    } else if (values.name.trim().length > 32) {
      errors.name = "Name must be less than 32 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(values.name.trim())) {
      errors.name = "Name can only contain letters and spaces";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email.trim())) {
      errors.email = "Email is not valid";
    }

    if (!values.message.trim()) {
      errors.message = "Message is required";
    } else if (values.message.trim().length < 3) {
      errors.message = "Message must be at least 3 characters";
    } else if (values.message.trim().length > 80) {
      errors.message = "Message must be less than 80 characters";
    }

    return errors;
  };

  const sendContactForm = async (values: ContactFormValues) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  };
  const [formValues, setFormValues] =
    useState<ContactFormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValues = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      message: formValues.message.trim(),
    };

    const validationErrors = validateForm(trimmedValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await sendContactForm(trimmedValues);
      setSubmittedData(trimmedValues);
      setIsModalOpen(true);
      setFormValues(initialFormValues); // Reset form after successful submission
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ message: err.message });
      } else {
        setErrors({ message: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmittedData(null);
  };

  return {
    errors,
    isLoading,
    isModalOpen,
    submittedData,
    formValues,
    closeModal,
    handleSubmit,
    handleChange,
  };
};
