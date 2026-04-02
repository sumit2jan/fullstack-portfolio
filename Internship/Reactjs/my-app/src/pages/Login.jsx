import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "yup";
import { useFormik } from "formik";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import OtpModal from "../modals/OtpModal";

const Login = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpEmail, setOtpEmail] = useState("");

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: v.object({
            email: v
                .string()
                .trim()
                .email("Invalid Email")
                .required("Required"),

            password: v
                .string()
                .min(8, "Min 8 characters required")
                .required("Required"),
        }),

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await api.post("/students/login", values);

                const { student, token } = res.data.data;

                login(token, student);

                toast.success("Login successful 🚀");

                resetForm();
                navigate("/");

            } catch (error) {
                const err = error?.response?.data;

                if (err?.isVerified === false) {
                    toast.error("Please verify your account");

                    setOtpEmail(err.email);     // backend email
                    setShowOtpModal(true);      // open modal

                    return;
                }
                toast.error(err?.message || "Login failed");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-heading">
                        Welcome <span>Back</span>
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="login-form">

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="error">{formik.errors.email}</p>
                        )}

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="error">{formik.errors.password}</p>
                        )}

                        <button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>

            <OtpModal
                show={showOtpModal}
                handleClose={() => setShowOtpModal(false)}
                email={otpEmail}
            />
        </>
    );
};

export default Login;