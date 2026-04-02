import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import EditUserModal from "../modals/EditUserModal";

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);


    const getStudent = async () => {
        try {
            const res = await api.get(`/students/${user._id}`);
            setStudent(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, formData) => {
        try {
            await api.put(`/students/edit/${student.studentId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Student updated successfully");

            setIsEditOpen(false);
            getStudent(); // refresh table
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        }
    };



    useEffect(() => {
        getStudent();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card
                className="shadow-lg p-4"
                style={{
                    width: "500px",
                    borderRadius: "20px",
                    background: "#ffffff"
                }}
            >
                {/* Profile Image */}
                <div className="text-center mb-3">
                    <img
                        src={
                            student.image
                                ? `http://localhost:4000${student.image}`
                                : "http://localhost:4000/uploads/default.png"
                        }
                        alt="profile"
                        style={{
                            width: "130px",
                            height: "130px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "4px solid #dc3545"
                        }}
                    />
                </div>

                {/* Name */}
                <h3 className="text-center fw-bold">
                    {student.firstName} {student.lastName}
                </h3>

                {/* Badge */}
                <div className="text-center mb-2">
                    {student.isAdmin ? (
                        <Badge bg="danger">Admin</Badge>
                    ) : (
                        <Badge bg="secondary">User</Badge>
                    )}
                </div>

                <hr />

                {/* Details */}
                <div className="px-2">
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Phone:</strong> {student.phone}</p>
                    <p><strong>Gender:</strong> {student.gender}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>DOB:</strong> {new Date(student.dob).toLocaleDateString()}</p>
                    <p><strong>Country:</strong> {student.country}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>PAN:</strong> {student.pan}</p>
                    <p><strong>Aadhar:</strong> {student.adhar}</p>

                    <p>
                        <strong>Hobbies:</strong>{" "}
                        {student.hobbies?.join(", ")}
                    </p>
                </div>

                <hr />

                {/* Conditional Buttons */}
                <div className="text-center">
                    {student.isAdmin ? (

                        <div>
                            <Button
                                variant="danger"
                                className="me-2"
                                onClick={() => navigate("/dashboard")}
                            >
                                Go to Dashboard
                            </Button>

                            <Button
                                variant="outline-danger"
                                onClick={() => setIsEditOpen(true)}
                            >
                                Update Profile
                            </Button>
                        </div>

                    ) : (
                        <Button
                            variant="outline-danger"
                            onClick={() => setIsEditOpen(true)}
                        >
                            Update Profile
                        </Button>
                    )}
                </div>
            </Card>

            {isEditOpen && (
                <EditUserModal
                    user={student}
                    onClose={() => setIsEditOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default Profile;