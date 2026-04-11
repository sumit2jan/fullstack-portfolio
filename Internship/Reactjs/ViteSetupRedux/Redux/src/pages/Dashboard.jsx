import React, { useEffect } from "react";
import DataTable from "react-data-table-component/dist/index.es.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
    setSearch,
    setDebouncedSearch,
    setPage,
    setLimit,
    setSort,
    setGender,
    setCountry,
} from "../redux/dashBoard/dashboardSlice";

import { fetchStudentsThunk } from "../redux/dashBoard/dashBoardThunk";

const Dashboard = () => {
    const dispatch = useDispatch();

    const {
        students,
        loading,
        totalRows,
        page,
        limit,
        search,
        debouncedSearch,
        sortBy,
        order,
        gender,
        country,
    } = useSelector((state) => state.dashboard);

    const BASE_URL = "http://localhost:4000";

    //  FETCH USING THUNK
    useEffect(() => {
        dispatch(
            fetchStudentsThunk({
                page,
                limit,
                sortBy,
                order,
                search: debouncedSearch,
                gender,
                country,
            })
        );
    }, [dispatch, page, limit, sortBy, order, debouncedSearch, gender, country]);

    //  RESET PAGE WHEN FILTER CHANGES
    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, debouncedSearch, gender, country]);

    //  DEBOUNCE SEARCH
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setDebouncedSearch(search));
        }, 500);

        return () => clearTimeout(timer);
    }, [dispatch, search]);

    // STILL LOCAL (we'll convert later if needed)
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
                await fetch(`/students/delete/${user._id}`, {
                    method: "DELETE",
                });

                Swal.fire("Deleted!", "Student removed.", "success");

                dispatch(fetchStudentsThunk({ page, limit, sortBy, order, search: debouncedSearch, gender, country }));
            } catch (error) {
                Swal.fire("Error!", "Delete failed.", "error");
            }
        }
    };

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
                await fetch(`/students/verify/${user._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isVerified: !user.isVerified }),
                });

                Swal.fire("Updated!", "Verification changed.", "success");

                dispatch(fetchStudentsThunk({ page, limit, sortBy, order, search: debouncedSearch, gender, country }));
            } catch (error) {
                Swal.fire("Error!", "Update failed.", "error");
            }
        }
    };

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
                Dashboard <span style={{ color: "#dc3545" }}></span>
            </h2>

            {/* 🔍 Search */}
            <div className="mb-3 p-3 border rounded bg-light">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="form-control"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                />
            </div>

            {/* Filters */}
            <div className="mb-3 d-flex gap-2">
                <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => dispatch(setGender(e.target.value))}
                >
                    <option value="">All Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    className="form-select"
                    value={country}
                    onChange={(e) => dispatch(setCountry(e.target.value))}
                >
                    <option value="">All Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                </select>
            </div>

            {/*  Data Table */}
            <DataTable
                columns={columns}
                data={students}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationPerPage={limit}
                paginationRowsPerPageOptions={[5, 10, 20]}
                onChangePage={(page) => dispatch(setPage(page))}
                onChangeRowsPerPage={(newLimit, page) => {
                    dispatch(setLimit(newLimit));
                    dispatch(setPage(page));
                }}
                progressPending={loading}
                highlightOnHover
                persistTableHead
                sortServer
                onSort={(column, sortDirection) => {
                    dispatch(
                        setSort({
                            sortBy: column.sortField || "createdAt",
                            order: sortDirection,
                        })
                    );
                }}
            />
        </div>
    );
};

export default Dashboard;