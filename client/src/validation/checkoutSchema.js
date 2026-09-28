import * as Yup from "yup";

const checkoutSchema = Yup.object({
    fullName: Yup.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long").required("Full name is required"),

    phone: Yup.string().trim().matches(/^[0-9]{11}$/, "Phone number must contain 11 digits").required("Phone number is required"),

    address: Yup.string().trim().min(5, "Address must be at least 5 characters").max(200, "Address is too long").required("Address is required"),

    city: Yup.string().trim().min(2, "City must be at least 2 characters").max(50, "City is too long").required("City is required"),

    postalCode: Yup.string().trim().matches(/^[0-9]{5}$/, "Postal code must contain 5 digits").required("Postal code is required"),
});

export default checkoutSchema;
