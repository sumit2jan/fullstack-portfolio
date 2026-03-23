import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../api/axios";
import { toast } from "react-toastify";
import EditUserModal from "../modals/EditUserModal";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);


    // Fetch Users
    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/api/user/read", {
                //headers: { Authorization: `Bearer ${token}` },
            });
            //console.log(res)

            setUsers(res.data.data);
            setFilteredUsers(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Search
    useEffect(() => {
        const result = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(result);
    }, [search, users]);

    // Open Edit Modal
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    // Update User
    const handleUpdate = async (updatedUser) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(`/api/user/update/${updatedUser._id}`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("User updated");
            setIsEditOpen(false);
            getUsers();
        } catch (error) {
            toast.error("Update failed");
        }
    };

    // Open Delete Modal
    const handleDeleteClick = async (user) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token");

                await api.delete(`/api/user/delete/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                Swal.fire("Deleted!", "User has been deleted.", "success");
                getUsers();
            } catch (error) {
                Swal.fire("Error!", "Delete failed.", "error");
            }
        }
    };

    // Table Columns
    const columns = [
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email },
        { name: "Age", selector: (row) => row.age },
        { name: "Gender", selector: (row) => row.gender },
        {
            name: "Actions",
            cell: (row) => (
                <>
                    <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(row)}
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClick(row)}
                    >
                        Delete
                    </button>
                </>
            ),
        },
    ];

    return (
        <div className="container mt-4">

            <h2>
                Dashboard <span style={{ color: "#dc3545" }}>Users</span>
            </h2>

            <input
                type="text"
                placeholder="Search by name or email..."
                className="form-control my-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <DataTable
                columns={columns}
                data={filteredUsers}
                pagination
                highlightOnHover
            />

            {/* EDIT MODAL */}
            {isEditOpen && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => setIsEditOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default Dashboard;