export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};
