'use client'

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from 'timeago.js';
import Link from "next/link";

export default function AllCourses() {
    const { isLoading, data } = useGetAllCoursesQuery({});
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.4,
            renderCell: (params) => (
                <span className="font-mono text-xs opacity-60">
                    {String(params.value).slice(-6)}...
                </span>
            )
        },
        {
            field: "title",
            headerName: "Course Title",
            flex: 1,
            renderCell: (params) => (
                <span className="font-medium text-sm">
                    {params.value}
                </span>
            )
        },
        {
            field: "ratings",
            headerName: "Rating",
            flex: 0.3,
            renderCell: (params) => (
                <span className="flex items-center gap-1 text-sm">
                    ⭐ {Number(params.value).toFixed(1)}
                </span>
            )
        },
        {
            field: "purchased",
            headerName: "Students",
            flex: 0.3,
            renderCell: (params) => (
                <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                    {params.value}
                </span>
            )
        },
        {
            field: "created_at",
            headerName: "Created",
            flex: 0.4,
            renderCell: (params) => (
                <span className="text-xs opacity-60">{params.value}</span>
            )
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.2,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Link href={`/admin/edit-course/${params.row.id}`}
                    sx={{ minWidth: "unset", padding: "6px", borderRadius: "8px" }}
                    className={`${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                    <AiOutlineEdit
                        size={18}
                        className={isDark ? "text-blue-400" : "text-blue-600"}
                    />
                </Link>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.2,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: () => (
                <Button
                    sx={{ minWidth: "unset", padding: "6px", borderRadius: "8px" }}
                >
                    <AiOutlineDelete
                        size={18}
                        className={isDark ? "text-red-400" : "text-red-500"}
                    />
                </Button>
            ),
        },
    ];

    const rows = data?.courses?.map((item: any) => ({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt),
    })) || [];

    return (
        <div className="w-full pt-[80px] px-4 800px:px-8 mb-2">

            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-josefin font-bold text-black dark:text-white">
                        All Courses
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-poppins">
                        Manage and monitor all your courses
                    </p>
                </div>
                <div className={`px-4 py-2 rounded-xl text-sm font-poppins font-medium ${isDark ? 'bg-[#1F2A40] text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                    {rows.length} Courses
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
        </div>
    );
}