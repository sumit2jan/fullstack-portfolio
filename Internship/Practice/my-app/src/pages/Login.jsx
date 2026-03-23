import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import * as v from "yup";
import { useFormik } from 'formik';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/Authcontext'

const Login = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();
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
                .string().trim().email("invalid Email").required("required"),
            password: v
                .string().min(8, "min 8 character are required").required("required"),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await api.post("api/user/login", values);
                //console.log(res.data.data);
                const { user, token } = res.data.data;
                // localStorage.setItem("token", res.data.data.token);
                // localStorage.setItem("user", JSON.stringify(res.data.data.user));
                login(token, user);
                toast.success("Login successfull");
                resetForm();
                navigate("/");
            } catch (error) {
                //console.error(error);
                toast.error(error?.response?.data?.message || "Login Unsuccessful");
            } finally {
                setSubmitting(false);
            }
        },

    })
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-heading">
                    Welcome <span>Back</span>
                </h2>

                <form onSubmit={formik.handleSubmit} className="login-form">

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}

                    /*{
                     value: formik.values.email,
                     onChange: formik.handleChange,
                     onBlur: formik.handleBlur

                     in sbb ka shortcut hai ye  {...formik.getFieldProps("email")}\
                    } */
                    />
                    {formik.touched.email && formik.errors.email &&
                        <p className="error">{formik.errors.email}</p>
                    }

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <p className="error">{formik.errors.password}</p>
                    }

                    {/* Button with isSubmitting */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
