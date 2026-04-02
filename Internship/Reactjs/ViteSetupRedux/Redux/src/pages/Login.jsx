import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "yup";
import { useFormik } from "formik";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/slice/authSlice";

const Login = () => {
    const dispatch = useDispatch();
     const navigate = useNavigate();

    const { token, loading } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (token) {
    //         // navigate("/");
    //     }
    // }, [token, navigate]);

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
            dispatch(loginStart());

            try {
                const res = await api.post("/students/login", values);

                const { student, token } = res.data.data;

                // ✅ Redux login
                dispatch(
                    loginSuccess({
                        user: student,
                        token: token,
                    })
                );

                toast.success("Login successful 🚀");

                resetForm();
                 navigate("/dashboard");

            } catch (error) {
                const err = error?.response?.data;

                if (err?.isVerified === false) {
                    dispatch(loginFailure("Account not verified"));
                    toast.error("Account not verified. Please contact support.");
                    return;
                }

                dispatch(loginFailure(err?.message || "Login failed"));
                toast.error(err?.message || "Login failed");

            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
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

                    <button type="submit" disabled={formik.isSubmitting || loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;