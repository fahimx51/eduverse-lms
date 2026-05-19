"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material"; // Added IconButton
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
                // FIXED: Wrapped in IconButton and used component={Link}
                <IconButton
                    component={Link}
                    href={`/admin/edit-course/${params.row.id}`}
                    sx={{ minWidth: "unset", padding: "6px", borderRadius: "8px" }}
                    className={`${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                    <AiOutlineEdit
                        size={18}
                        className={isDark ? "text-blue-400" : "text-blue-600"}
                    />
                </IconButton>
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
                    <Box sx={{ height: "calc(100vh - 220px)", width: "100%", "& .MuiDataGrid-root": { border: "none", outline: "none", fontFamily: "var(--font-Poppins)", color: isDark ? "#fff" : "#000", backgroundColor: "transparent" } }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
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