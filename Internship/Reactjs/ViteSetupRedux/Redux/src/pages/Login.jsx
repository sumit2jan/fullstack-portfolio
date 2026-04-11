import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/auth/authThunk"; // ✅ IMPORT THUNK
import { authSelector } from "../redux/auth/authSelectors";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, loading } = useSelector(authSelector);

    //  Auto redirect if already logged in
    useEffect(() => {
        if (token) {
            navigate("/dashboard");
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

        // UPDATED SUBMIT
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            const resultAction = await dispatch(loginThunk(values));
            resetForm();
            //  SUCCESS CASE
            if (loginThunk.fulfilled.match(resultAction)) {
                toast.success("Login successful 🚀");
                navigate("/dashboard");
            }

            //  ERROR CASE
            else {
                const errorMessage = resultAction.payload;

                if (errorMessage === "Account not verified") {
                    toast.error("Account not verified. Please contact support.");
                } else {
                    toast.error(errorMessage || "Login failed");
                }
            }

            setSubmitting(false);
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