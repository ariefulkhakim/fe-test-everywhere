import React from "react";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"
        aria-labelledby={contentLabel}
        onClick={onRequestClose}
      />
      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-96"
          role="dialog"
          aria-labelledby={contentLabel}
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onRequestClose}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">{contentLabel}</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
