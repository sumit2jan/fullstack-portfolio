import React from 'react';
import { useFormik } from 'formik';
import * as v from "yup";
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

//import "./style.css";
const Signup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            gender: "",
            email: "",
            password: "",
        },
        validationSchema: v.object({
            name: v
                .string().min(3, "Min 3 char required").max(12, "max 12 char are required").required("required"),
            age: v
                .number().min(18, "age must be 18").required("required"),
            gender: v
                .string().oneOf(["male", "female", "other"], "Invalid gender").required("required"),
            email: v
                .string().email("invalid Email").required("required"),
            password: v
                .string().min(8, "min 8 character are required").required("required"),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                await api.post("api/user/create", values);
                toast.success("Sign Up successfull");
                resetForm();
                navigate("/");
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

                    <input type="text" name="name" placeholder="Name" {...formik.getFieldProps("name")} />
                    {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}

                    <input type="number" name="age" placeholder="Age" {...formik.getFieldProps("age")} />
                    {formik.touched.age && formik.errors.age && <p className="error">{formik.errors.age}</p>}

                    <select name="gender" {...formik.getFieldProps("gender")}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && <p className="error">{formik.errors.gender}</p>}

                    <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
                    {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

                    <input type="password" name="password" placeholder="Password" {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}

                    <button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
