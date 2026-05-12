'use client'

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material"; // Added Modal
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUserDelete, AiOutlineUsergroupAdd, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from 'timeago.js';
import { useGetAllUsersQuery, useUpdateRoleMutation } from "@/redux/features/user/userApi";
import { RiUserAddFill } from "react-icons/ri";
import { toast } from "react-hot-toast";

type Props = {
    isTeam: boolean
}

export default function AllCourses({ isTeam }: Props) {
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState(false);

    // New states for the popup
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const [updateRole, { isSuccess, error }] = useUpdateRoleMutation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    const handleSubmit = async () => {
        // Logic for adding/updating user role goes here
        try {
            await updateRole({ email, role });
            refetch();
            toast.success("User role updated");
        }
        catch (error) {
            toast.error("Failed to update role");
            console.log(error);
        }
        setActive(false);
    };

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            align: "center",
            headerAlign: "center",
            flex: 0.4,
            renderCell: (params) => (
                <span className="font-mono text-xs opacity-60">
                    {String(params.value).slice(-6)}...
                </span>
            )
        },
        {
            field: "name",
            headerName: "Name",
            align: "center",
            headerAlign: "center",
            flex: 0.5,
            renderCell: (params) => (
                <span className="font-medium text-sm">
                    {params.value}
                </span>
            )
        },
        {
            field: "email",
            headerName: "email",
            align: "center",
            headerAlign: "center",
            flex: 0.5,
            renderCell: (params) => (
                <span className="flex items-center gap-1 text-sm">
                    {params.value}
                </span>
            )
        },
        {
            field: "purchased",
            headerName: "Enrolled",
            align: "center",
            headerAlign: "center",
            flex: 0.2,
            renderCell: (params) => (
                <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                    {params.value}
                </span>
            )
        },
        {
            field: "created_at",
            headerName: "Created",
            align: "center",
            headerAlign: "center",
            flex: 0.4,
            renderCell: (params) => (
                <span className="text-xs opacity-60">{params.value}</span>
            )
        },
        {
            field: "delete",
            headerName: "Change Role",
            flex: 0.2,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: () => (
                <Button
                    sx={{ minWidth: "unset", padding: "6px", borderRadius: "8px" }}
                    className={`${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                    <AiOutlineUserDelete
                        size={18}
                        className={isDark ? "text-blue-400" : "text-blue-600"}
                    />
                </Button>
            ),
        },

    ];

    const rows = data?.users
        ?.filter((item: any) =>
            isTeam
                ? item.role === "admin"
                : item.role === "user"
        )
        ?.map((item: any) => ({
            id: item._id,
            name: item.name,
            email: item.email,
            purchased: item.courses.length,
            created_at: format(item.createdAt),
        })) || [];

    return (
        <div className="w-full min-h-screen pt-[80px] px-4 800px:px-8">

            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-josefin font-bold text-black dark:text-white">
                        {isTeam ? "All Admins" : "All Users"}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-poppins">
                        {isTeam ? "Manage and monitor all your admins" : "Manage and monitor all your users"}
                    </p>
                </div>
                <div className="flex  items-center gap-2">
                    <div className={`px-4 py-2 rounded-xl text-sm font-poppins font-medium ${isDark ? 'bg-[#1F2A40] text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                        {rows.length} {isTeam ? "Admins" : "Users"}
                    </div>
                    {
                        isTeam &&
                        <div className="text-blue-950 dark:text-white hover:scale-110 cursor-pointer hover:bg-slate-100 dark:hover:bg-blue-950 rounded-full p-1" onClick={() => setActive(!active)}>
                            <RiUserAddFill size={23} />
                        </div>

                    }
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-[#111C43]' : 'border-slate-200 bg-white'} shadow-sm`}>
                    <Box
                        sx={{
                            height: "calc(100vh - 220px)",
                            width: "100%",
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                                fontFamily: "var(--font-Poppins)",
                                color: isDark ? "#fff" : "#000",
                                backgroundColor: "transparent",
                            },
                            "& .MuiDataGrid-topContainer": {
                                backgroundColor: isDark ? "#1a2550 !important" : "#f8fafc !important",
                                borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: isDark ? "#1a2550 !important" : "#f8fafc !important",
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: isDark ? "#1a2550 !important" : "#f8fafc !important",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: "600",
                                fontSize: "13px",
                                color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            },
                            "& .MuiDataGrid-columnHeaderTitleContainer": {
                                display: "flex",
                                alignItems: "center",
                            },
                            "& .MuiDataGrid-sortIcon": {
                                opacity: "1 !important",
                                color: isDark ? "rgba(3, 73, 131, 0.8) !important" : "rgba(0,0,0,0.4) !important",
                            },
                            "& .MuiDataGrid-iconButtonContainer": {
                                color: isDark ? "rgba(255,255,255,0.5) !important" : "rgba(0,0,0,0.5) !important",
                            },
                            "& .MuiDataGrid-iconSeparator": {
                                display: "none",
                            },
                            "& .MuiDataGrid-menuIcon button": {
                                color: isDark ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-row": {
                                backgroundColor: "transparent",
                                borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #f1f5f9",
                                transition: "background-color 0.15s ease",
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: isDark ? "rgba(255,255,255,0.03) !important" : "rgba(0,0,0,0.02) !important",
                            },
                            "& .MuiDataGrid-row.Mui-selected": {
                                backgroundColor: isDark ? "rgba(59,91,219,0.12) !important" : "rgba(59,91,219,0.06) !important",
                            },
                            "& .MuiDataGrid-row.Mui-selected:hover": {
                                backgroundColor: isDark ? "rgba(59,91,219,0.18) !important" : "rgba(59,91,219,0.09) !important",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                                color: isDark ? "#fff" : "#000",
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                            },
                            "& .MuiDataGrid-cell:focus": {
                                outline: "none",
                            },
                            "& .MuiDataGrid-columnHeader:focus": {
                                outline: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "transparent",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: isDark ? "#1a2550" : "#f8fafc",
                                color: isDark ? "#fff" : "#000",
                                borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                            },
                            "& .MuiTablePagination-root": {
                                color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                                fontFamily: "var(--font-Poppins)",
                                fontSize: "13px",
                            },
                            "& .MuiSvgIcon-root": {
                                color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                            },
                            "& .MuiCheckbox-root": {
                                color: isDark ? "rgba(255,255,255,0.3) !important" : "rgba(0,0,0,0.3) !important",
                            },
                            "& .MuiCheckbox-root.Mui-checked": {
                                color: "#3b5bdb !important",
                            },
                            "& .MuiDataGrid-selectedRowCount": {
                                color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                                fontFamily: "var(--font-Poppins)",
                                fontSize: "13px",
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            pageSizeOptions={[10, 25, 50, 100]}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 10 },
                                },
                            }}
                        />
                    </Box>
                </div>
            )}

            {/* Added Modal for Adding New Member */}
            {active && (
                <Modal
                    open={active}
                    onClose={() => setActive(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-[#111C43] rounded-[8px] shadow p-4 outline-none">
                        <div className="w-full flex justify-end">
                            <AiOutlineClose
                                size={25}
                                className="text-black dark:text-white cursor-pointer"
                                onClick={() => setActive(false)}
                            />
                        </div>
                        <h1 className="text-[25px] font-josefin text-center font-[600] text-black dark:text-white pb-2">
                            Add New Member
                        </h1>
                        <div className="mt-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter user email..."
                                className={`w-full p-2 rounded border font-poppins text-sm bg-transparent outline-none ${isDark ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className={`w-full p-2 mt-4 rounded border font-poppins text-sm bg-transparent outline-none ${isDark ? 'border-white/20 text-white bg-[#111C43]' : 'border-black/20 text-black bg-white'}`}
                            >
                                <option value="admin" className="text-black">Admin</option>
                                <option value="user" className="text-black">User</option>
                            </select>
                            <br />
                            <div
                                className="w-full flex justify-center items-center h-[40px] bg-[#37a39a] text-white font-poppins font-semibold rounded-[5px] mt-6 cursor-pointer hover:bg-[#2b8a82] transition-colors"
                                onClick={handleSubmit}
                            >
                                Submit
                            </div>
                        </div>
                    </Box>
                </Modal>
            )}
        </div>
    );
}