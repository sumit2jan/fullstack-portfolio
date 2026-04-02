import React from 'react';
import { useFormik } from 'formik';
import * as v from "yup";
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import OtpModal from "../modals/OtpModal";

//import "./style.css";
const Signup = () => {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    //const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: v.object({
            firstName: v
                .string().min(3, "Min 3 char required").max(12, "max 12 char are required").required("required"),
            lastName: v
                .string().min(3, "Min 3 char required").max(12, "max 12 char are required").required("required"),
            email: v
                .string().email("invalid Email").required("required"),
            password: v
                .string().min(8, "min 8 character are required").required("required"),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await api.post("students/register", values);
                toast.success("OTP sent to your email");
                //email save karo
                setUserEmail(values.email);
                // modal open karo
                setShowOtpModal(true);
                // optional: form reset
                resetForm();
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Signup Unsuccessful");
            } finally {
                setSubmitting(false);
            }
        },
    })
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-heading">
                    Create <span>Account</span>
                </h2>

                <form onSubmit={formik.handleSubmit} className="signup-form">

                    <input type="text" name="firstName" placeholder="FirstName" {...formik.getFieldProps("firstName")} />
                    {formik.touched.firstName && formik.errors.firstName && <p className="error">{formik.errors.firstName}</p>}

                    <input type="text" name="lastName" placeholder="LastName" {...formik.getFieldProps("lastName")} />
                    {formik.touched.lastName && formik.errors.lastName && <p className="error">{formik.errors.lastName}</p>}

                    <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
                    {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

                    <input type="password" name="password" placeholder="Password" {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}

                    <button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
            <OtpModal
                show={showOtpModal}
                handleClose={() => setShowOtpModal(false)}
                email={userEmail}
            />
        </div>
    )
}

export default Signup
