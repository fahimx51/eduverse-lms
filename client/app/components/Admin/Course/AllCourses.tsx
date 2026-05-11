'use client'

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";

export default function AllCourses() {

    const { isLoading, data, error } = useGetAllCoursesQuery({});

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.3,
        },

        {
            field: "title",
            headerName: "Course Title",
            flex: 1,
        },

        {
            field: "ratings",
            headerName: "Ratings",
            flex: 0.3,
        },

        {
            field: "purchased",
            headerName: "Purchased",
            flex: 0.3,
        },

        {
            field: "created_at",
            headerName: "Created At",
            flex: 0.5,
        },

        {
            field: "edit",
            headerName: "Edit",
            flex: 0.2,
            sortable: false,
            align: "center",
            headerAlign: "center",

            renderCell: () => (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        sx={{
                            minWidth: "unset",
                            padding: 0,
                        }}
                    >
                        <AiOutlineEdit
                            className={
                                theme === "dark"
                                    ? "text-white"
                                    : "text-black"
                            }
                            size={20}
                        />
                    </Button>
                </Box>
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
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        sx={{
                            minWidth: "unset",
                            padding: 0,
                        }}
                    >
                        <AiOutlineDelete
                            className={
                                theme === "dark"
                                    ? "text-white"
                                    : "text-black"
                            }
                            size={20}
                        />
                    </Button>
                </Box>
            ),
        },
    ];

    const rows = data?.courses?.map((item: any) => ({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: item.createdAt,
    })) || [];


    return (
        <div className="mt-12">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box
                        sx={{
                            mt: "120px",
                            height: "calc(100vh - 120px)",
                            width: "100%",
                            px: 2,
                            pb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                width: "100%",

                                // MAIN GRID
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#111C43"
                                            : "#fff",
                                },

                                // REMOVE WHITE HEADER
                                "& .MuiDataGrid-topContainer": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#3e4396 !important"
                                            : "#A4A9FC !important",
                                },

                                // HEADER
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#3e4396 !important"
                                            : "#A4A9FC !important",
                                    color:
                                        theme === "dark"
                                            ? "#fff !important"
                                            : "#000 !important",
                                    borderBottom: "none",
                                },

                                "& .MuiDataGrid-columnHeader": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#3e4396 !important"
                                            : "#A4A9FC !important",
                                },

                                // HEADER TITLE
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    fontWeight: "700",
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                },

                                // SPACE BETWEEN TEXT & SORT ICON
                                "& .MuiDataGrid-columnHeaderTitleContainer": {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                },

                                // SORT ICON FIX
                                "& .MuiDataGrid-sortIcon": {
                                    opacity: "1 !important",
                                    color:
                                        theme === "dark"
                                            ? "#162456 !important"
                                            : "#000000 !important",
                                },

                                // HEADER ICON BUTTON COLOR
                                "& .MuiDataGrid-iconButtonContainer": {
                                    color:
                                        theme === "dark"
                                            ? "#ffffff !important"
                                            : "#000000 !important",
                                    marginLeft: "6px",
                                },

                                "& .MuiDataGrid-iconSeparator": {
                                    display: "none",
                                },

                                "& .MuiDataGrid-menuIcon button": {
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                },

                                // ROWS
                                "& .MuiDataGrid-row": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#1F2A40"
                                            : "#fff",
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                },

                                // ROW HOVER
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#2A3A5A !important"
                                            : "#f5f5f5 !important",
                                },

                                // SELECTED ROW
                                "& .MuiDataGrid-row.Mui-selected": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#2F4B6E !important"
                                            : "#e3f2fd !important",
                                },

                                "& .MuiDataGrid-row.Mui-selected:hover": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#3A5A80 !important"
                                            : "#dbefff !important",
                                },

                                // CELLS
                                "& .MuiDataGrid-cell": {
                                    borderBottom:
                                        theme === "dark"
                                            ? "1px solid rgba(255,255,255,0.12)"
                                            : "1px solid #ccc",
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                    display: "flex",
                                    alignItems: "center",
                                },

                                // REMOVE FOCUS BORDER
                                "& .MuiDataGrid-cell:focus": {
                                    outline: "none",
                                },

                                "& .MuiDataGrid-columnHeader:focus": {
                                    outline: "none",
                                },

                                // BODY
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#1F2A40"
                                            : "#F8F9FB",
                                },

                                // FOOTER
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor:
                                        theme === "dark"
                                            ? "#3e4396"
                                            : "#A4A9FC",
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                    borderTop: "none",
                                },

                                "& .MuiTablePagination-root": {
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                },

                                "& .MuiSvgIcon-root": {
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
                                },

                                "& .MuiCheckbox-root": {
                                    color:
                                        theme === "dark"
                                            ? "#b7ebde !important"
                                            : "#000 !important",
                                },

                                "& .MuiDataGrid-selectedRowCount": {
                                    color:
                                        theme === "dark"
                                            ? "#fff"
                                            : "#000",
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
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )
            }
        </div>
    );
}