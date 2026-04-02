import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../api/axios";
import { toast } from "react-toastify";
import EditUserModal from "../modals/EditUserModal";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const BASE_URL = "http://localhost:4000";

    // Fetch Students
    const getStudents = async () => {
        try {
            setLoading(true);

            const res = await api.get("/students/admin/dashboard", {
                params: {
                    page,
                    limit,
                    sortBy,
                    order,
                    search: debouncedSearch || undefined,
                    gender: gender || undefined,
                    country: country || undefined,
                },
            });

            setStudents(res.data.data);
            setTotalRows(res.data.totalStudents);
        } catch (error) {
            toast.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStudents();
    }, [page, debouncedSearch, limit, sortBy, order, gender, country]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, gender, country]);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Edit
    const handleEdit = async (user) => {
        try {
            setLoading(true);

            const res = await api.get(`/students/${user._id}`);
            setSelectedUser(res.data.data);

            setIsEditOpen(true);
        } catch (error) {
            toast.error("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    };

    // Update
    const handleUpdate = async (id, formData) => {
        try {
            await api.put(`/students/edit/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Student updated successfully");
            setIsEditOpen(false);
            getStudents();
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    //  Delete
    const handleDeleteClick = async (user) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete ${user.firstName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/students/delete/${user._id}`);
                Swal.fire("Deleted!", "Student removed.", "success");

                if (students.length === 1 && page > 1) {
                    setPage(page - 1);
                } else {
                    getStudents();
                }
            } catch (error) {
                Swal.fire("Error!", "Delete failed.", "error");
            }
        }
    };

    // VERIFY TOGGLE
    const handleToggleVerify = async (user) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Change verification of ${user.firstName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
            try {
                await api.patch(`/students/verify/${user._id}`, {
                    isVerified: !user.isVerified
                });

                Swal.fire("Updated!", "Verification changed.", "success");
                getStudents();
            } catch (error) {
                Swal.fire("Error!", "Update failed.", "error");
            }
        }
    };

    // Columns
    const columns = [
        {
            name: "Profile",
            cell: (row) => {
                const img = row.image
                    ? `${BASE_URL}${row.image}`
                    : `${BASE_URL}/uploads/default.png`;

                return (
                    <img
                        src={img}
                        alt="profile"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />
                );
            }
        },
        {
            name: "Name",
            selector: (row) => `${row.firstName} ${row.lastName}`,
            sortable: true,
            sortField: "firstName",
        },
        { name: "Email", selector: (row) => row.email },
        { name: "Age", selector: (row) => row.age || "-" },

        {
            name: (
                <div style={{ display: "flex", gap: "5px" }}>
                    <span>Gender</span>
                    <select
                        className="form-select form-select-sm"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Male">M</option>
                        <option value="Female">F</option>
                        <option value="Other">O</option>
                    </select>
                </div>
            ),
            selector: (row) => row.gender || "-",
        },

        {
            name: (
                <div style={{ display: "flex", gap: "5px" }}>
                    <span>Country</span>
                    <select
                        className="form-select form-select-sm"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                    </select>
                </div>
            ),
            selector: (row) => row.country || "-",
        },

        //  VERIFIED TOGGLE
        {
            name: "Verified",
            cell: (row) => (
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={row.isVerified}
                        onChange={() => handleToggleVerify(row)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            )
        },

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
                Dashboard <span style={{ color: "#dc3545" }}>Students</span>
            </h2>

            <div className="mb-3 p-3 border rounded bg-light">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <DataTable
                columns={columns}
                data={students}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationPerPage={limit}
                paginationRowsPerPageOptions={[5, 10, 20]}
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
                }}
            />

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