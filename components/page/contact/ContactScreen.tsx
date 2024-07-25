import Modal from "@/components/reusable/Modal";
import { useContact } from "@/hooks/useContact";
import React from "react";

const ContactForm = () => {
  const {
    closeModal,
    errors,
    handleChange,
    handleSubmit,
    isLoading,
    isModalOpen,
    submittedData,
    formValues,
  } = useContact();

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows={4}
          />
          <p>{formValues.message.length}/80</p>
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="px-6 py-3 bg-slate-900 text-white rounded-md shadow-md text-[16px]"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Submitted Successfully!"
      >
        {submittedData && (
          <div className="flex flex-col gap-3 mt-8">
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Message:</strong> {submittedData.message}
            </p>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-slate-900 text-white rounded-md shadow-md "
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactForm;
