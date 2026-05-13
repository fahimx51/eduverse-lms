"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { format } from 'timeago.js';

import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

type Props = {
    isDashboard?: boolean;
};

export default function AllInvoices({ isDashboard = false }: Props) {
    const { theme } = useTheme();

    const { data, isLoading } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === "dark";

    const orderData = useMemo(() => {
        if (!data?.orders) return [];

        return data.orders.map((item: any) => {
            const user = usersData?.users?.find(
                (user: any) => user._id === item.userId
            );

            const course = coursesData?.courses?.find(
                (course: any) => course._id === item.courseId
            );

            return {
                id: item._id,
                userName: user?.name || "Unknown",
                userEmail: user?.email || "Unknown",
                title: course?.name || "Unknown",
                price: `$${course?.price || 0}`,
                createdAt: format(item.createdAt),
            };
        });
    }, [data, usersData, coursesData]);

    if (!mounted) return null;

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.4,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <span className="text-xs opacity-70">
                    {String(params.value).slice(-6)}
                </span>
            ),
        },
        {
            field: "userName",
            headerName: "NAME",
            flex: 0.5,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "userEmail",
            headerName: "EMAIL",
            flex: 0.8,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "title",
            headerName: "COURSE",
            flex: 0.7,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "price",
            headerName: "PRICE",
            flex: 0.3,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "createdAt",
            headerName: "DATE",
            flex: 0.4,
            align: "center",
            headerAlign: "center",
        },
    ];

    return (
        <div
            className={`w-full ${isDashboard
                ? "h-[380px] px-4"
                : "px-6 mt-[80px]"
                }`}
        >
            {!isDashboard && (
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-black dark:text-white">
                        All Invoices
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage all orders and invoices
                    </p>
                </div>
            )}

            <div
                className={`rounded-xl overflow-hidden border ${isDark
                    ? "bg-[#111C43] border-white/10"
                    : "bg-white border-gray-200"
                    }`}
            >
                <Box
                    sx={{
                        width: "100%",

                        height: isDashboard ? "320px" : "calc(100vh - 170px)",

                        "& .MuiDataGrid-root": {
                            border: "none",
                            backgroundColor: "transparent",
                            color: isDark ? "#fff" : "#000",
                            fontFamily: "inherit",
                        },

                        // HEADER
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: isDark
                                ? "#1a2550 !important"
                                : "#f8fafc !important",
                            borderBottom: "none",
                            minHeight: isDashboard ? "48px !important" : "56px !important",
                            maxHeight: isDashboard ? "48px !important" : "56px !important",
                        },

                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: isDark
                                ? "#1a2550 !important"
                                : "#f8fafc !important",
                        },

                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "600",
                            fontSize: isDashboard ? "11px" : "13px",
                            color: isDark
                                ? "rgba(255,255,255,0.75)"
                                : "rgba(0,0,0,0.7)",
                        },

                        // FIX SORT ICON
                        "& .MuiDataGrid-sortIcon": {
                            opacity: "1 !important",
                            color: isDark
                                ? "#9ca3af !important"
                                : "#4b5563 !important",
                        },

                        "& .MuiDataGrid-menuIcon button": {
                            color: isDark
                                ? "#9ca3af !important"
                                : "#4b5563 !important",
                        },

                        "& .MuiDataGrid-iconButtonContainer": {
                            color: isDark
                                ? "#9ca3af !important"
                                : "#4b5563 !important",
                        },

                        "& .MuiSvgIcon-root": {
                            color: isDark
                                ? "#9ca3af !important"
                                : "#4b5563 !important",
                        },

                        "& .MuiDataGrid-iconSeparator": {
                            display: "none",
                        },

                        // ROWS
                        "& .MuiDataGrid-row": {
                            borderBottom: isDark
                                ? "1px solid rgba(255,255,255,0.05)"
                                : "1px solid #f1f5f9",
                            minHeight: isDashboard ? "42px !important" : "52px !important",
                            maxHeight: isDashboard ? "42px !important" : "52px !important",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: isDark
                                ? "rgba(255,255,255,0.03) !important"
                                : "rgba(0,0,0,0.02) !important",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: isDashboard ? "11px" : "14px",
                            color: isDark ? "#fff" : "#000",
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

                        // FOOTER
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: isDark
                                ? "#1a2550"
                                : "#f8fafc",
                            borderTop: isDark
                                ? "1px solid rgba(255,255,255,0.08)"
                                : "1px solid #e2e8f0",
                            minHeight: isDashboard ? "42px" : "52px",
                        },

                        "& .MuiTablePagination-root": {
                            color: isDark
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.7)",
                            fontSize: isDashboard ? "11px" : "13px",
                        },

                        "& .MuiCheckbox-root": {
                            color: isDark
                                ? "rgba(255,255,255,0.4) !important"
                                : "rgba(0,0,0,0.4) !important",
                        },

                        "& .MuiCheckbox-root.Mui-checked": {
                            color: "#3b82f6 !important",
                        },
                    }}
                >
                    <DataGrid
                        rows={orderData}
                        columns={columns}
                        loading={isLoading}
                        checkboxSelection={!isDashboard}
                        disableRowSelectionOnClick
                        hideFooterSelectedRowCount
                        pageSizeOptions={isDashboard ? [5] : [10, 20, 50]}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: isDashboard ? 5 : 10,
                                },
                            },
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}