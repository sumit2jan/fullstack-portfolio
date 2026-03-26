import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../api/axios";
import { toast } from "react-toastify";
import EditUserModal from "../modals/EditUserModal";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");



    // Fetch Users
    const getUsers = async () => {
        try {
            setLoading(true);

            const res = await api.get(
                `/api/user/read?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`);
            setUsers(res.data.data);
            setTotalRows(res.data.totalUsers);

        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, [page, debouncedSearch, limit, sortBy, order]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    //search logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);



    // Open Edit Modal
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    // Update User
    const handleUpdate = async (updatedUser) => {
        try {
            //const token = localStorage.getItem("token");

            await api.put(`/api/user/update/${updatedUser._id}`, updatedUser, {
                //headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Updated User:", updatedUser);

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
                await api.delete(`/api/user/delete/${user._id}`, {
                    //headers: { Authorization: `Bearer ${token}` },
                });

                Swal.fire("Deleted!", "User has been deleted.", "success");
                if (users.length === 1 && page > 1) {
                    setPage(page - 1);
                } else {
                    getUsers();
                }
            } catch (error) {
                Swal.fire("Error!", "Delete failed.", "error");
            }
        }
    };

    // Table Columns
    const columns = [
        { name: "Name", selector: (row) => row.name, sortable: true, sortField: "name" },
        { name: "Email", selector: (row) => row.email },
        { name: "Age", selector: (row) => row.age, sortable: true, sortField: "age" },
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
                data={users}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationPerPage={limit}
                paginationRowsPerPageOptions={[2, 4, 6, 10]}
                onChangePage={(page) => setPage(page)}
                onChangeRowsPerPage={(newLimit, page) => {
                    setLimit(newLimit);
                    setPage(page);
                }}
                progressPending={loading}
                highlightOnHover
                persistTableHead
                sortServer
                onSort={(column, sortDirection) => {
                    setSortBy(column.sortField);
                    setOrder(sortDirection);
                    setPage(1); //best practice
                }}
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