import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../api/axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");

    const BASE_URL = "http://localhost:4000";

    // 🔥 Fetch Students
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

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, gender, country]);

    // 🔥 Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // ❌ DELETE
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

    // ✅ VERIFY TOGGLE
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
                    isVerified: !user.isVerified,
                });

                Swal.fire("Updated!", "Verification changed.", "success");
                getStudents();
            } catch (error) {
                Swal.fire("Error!", "Update failed.", "error");
            }
        }
    };

    // ✅ Columns (FIXED — no JSX headers)
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
                            objectFit: "cover",
                        }}
                    />
                );
            },
        },
        {
            name: "Name",
            selector: (row) => `${row.firstName} ${row.lastName}`,
            sortable: true,
            sortField: "firstName",
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Age",
            selector: (row) => row.age || "-",
        },
        {
            name: "Gender",
            selector: (row) => row.gender || "-",
        },
        {
            name: "Country",
            selector: (row) => row.country || "-",
        },
        {
            name: "Verified",
            cell: (row) => (
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={row.isVerified}
                        onChange={() => handleToggleVerify(row)}
                    />
                </div>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(row)}
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2>
                Dashboard <span style={{ color: "#dc3545" }}>Students</span>
            </h2>

            {/* 🔍 Search */}
            <div className="mb-3 p-3 border rounded bg-light">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 🔥 Filters OUTSIDE table */}
            <div className="mb-3 d-flex gap-2">
                <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">All Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">All Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                </select>
            </div>

            {/* 📊 Data Table */}
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
                    setSortBy(column.sortField || "createdAt");
                    setOrder(sortDirection);
                }}
            />
        </div>
    );
};

export default Dashboard;