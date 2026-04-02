import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


const EditUserModal = ({ user, onClose, onUpdate }) => {
    const fileRef = useRef();
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (user) {
            const img = user.image
                ? `http://localhost:4000${user.image}`
                : "http://localhost:4000/uploads/default.png";

            setPreview(img);
        }
    }, [user]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            _id: user?.studentId || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            age: user?.age || "",
            gender: user?.gender || "",
            phone: user?.phone || "",
            pan: user?.pan || "",
            adhar: user?.adhar || "",
            address: user?.address || "",
            country: user?.country || "",
            hobbies: user?.hobbies?.join(", ") || "",
            dob: user?.dob ? user.dob.split("T")[0] : "",
            image: null
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required("First name required"),
            lastName: Yup.string().required("Last name required"),
            age: Yup.number().required("Age required"),
            gender: Yup.string().required("Gender required"),
            phone: Yup.string().length(10, "Phone must be 10 digits")
        }),

        onSubmit: (values) => {
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key !== "image" && values[key] !== "") {
                    formData.append(key, values[key]);
                }
            });

            if (values.image) {
                formData.append("image", values.image);
            }

            onUpdate(values._id, formData);
        }
    });

    const handleImageClick = () => fileRef.current.click();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    if (!user) return null;

    return (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-4 rounded-4 shadow">

                    {/* PROFILE IMAGE */}
                    <div className="text-center mb-4">
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                                cursor: "pointer"
                            }}
                            onClick={handleImageClick}
                        >
                            <img
                                src={preview}
                                onError={(e) =>
                                (e.target.src =
                                    "http://localhost:4000/uploads/default.png")
                                }
                                alt="profile"
                                className="rounded-circle"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                    border: "4px solid #dc3545",
                                    transition: "0.3s"
                                }}
                            />

                            {/* Hover overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    background: "rgba(0,0,0,0.4)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    opacity: 0,
                                    transition: "0.3s"
                                }}
                                className="hover-overlay"
                            >
                                ✏️
                            </div>
                        </div>

                        <div className="mt-2 text-muted small">
                            Click to change photo
                        </div>

                        <input
                            type="file"
                            hidden
                            ref={fileRef}
                            onChange={handleImageChange}
                        />
                    </div>

                    <h4 className="text-center mb-4 fw-bold">Edit Profile</h4>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">

                            {/* FIRST NAME */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">First Name</label>
                                <input
                                    name="firstName"
                                    className="form-control mb-2"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* LAST NAME */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Last Name</label>
                                <input
                                    name="lastName"
                                    className="form-control mb-2"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Email </label>
                                <input
                                    className="form-control mb-2 bg-light"
                                    value={formik.values.email}
                                    disabled
                                />
                            </div>

                            {/* PHONE */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone Number</label>
                                <input
                                    name="phone"
                                    className="form-control mb-2"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* AGE */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    className="form-control mb-2"
                                    value={formik.values.age}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* GENDER */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Gender</label>
                                <select
                                    name="gender"
                                    className="form-control mb-2"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            {/* PAN */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">PAN</label>
                                <input
                                    name="pan"
                                    className="form-control mb-2 bg-light"
                                    value={formik.values.pan}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* AADHAR */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Aadhaar</label>
                                <input
                                    name="adhar"
                                    className="form-control mb-2 bg-light"
                                    value={formik.values.adhar}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* ADDRESS */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Address</label>
                                <input
                                    name="address"
                                    className="form-control mb-2"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* COUNTRY */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Country</label>
                                <input
                                    name="country"
                                    className="form-control mb-2"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* DOB */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="form-control mb-2"
                                    value={formik.values.dob}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* HOBBIES */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Hobbies</label>
                                <input
                                    name="hobbies"
                                    className="form-control mb-2"
                                    placeholder="e.g. Cricket, Coding"
                                    value={formik.values.hobbies}
                                    onChange={formik.handleChange}
                                />
                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-end mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-danger">
                                Update Profile
                            </button>
                        </div>
                    </form>

                </div>
            </div>

            {/* HOVER CSS */}
            <style>
                {`
                .hover-overlay:hover {
                    opacity: 1 !important;
                }
                `}
            </style>
        </div>
    );
};

export default EditUserModal;