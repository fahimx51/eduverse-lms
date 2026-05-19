"use client";
import React, { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

// Icons
import {
    HomeOutlinedIcon,
    ArrowForwardIosIcon,
    ArrowBackIosIcon,
    PeopleOutlinedIcon,
    ReceiptOutlinedIcon,
    GroupsIcon,
    OndemandVideoIcon,
    VideoCallIcon,
    WebIcon,
    QuizIcon,
    WysiwygIcon,
    ExitToAppIcon,
} from "./Icon";
import { MdOutlineAnalytics, MdTimeline, MdPieChart } from "react-icons/md";

import avatarDefault from "../../../public/avatar.jpeg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { RootState } from "@/redux/store/store";

interface ItemProps {
    title: string;
    to: string;
    icon: React.ReactNode; // Fix applied here
    selected: string;
    setSelected: (title: string) => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
            <Link href={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (mounted) {
            const menuItems = [
                { title: "Dashboard", to: "/admin" },
                { title: "Users", to: "/admin/users" },
                { title: "Invoices", to: "/admin/invoices" },
                { title: "Create Course", to: "/admin/create-course" },
                { title: "Live Courses", to: "/admin/courses" },
                { title: "Hero", to: "/admin/hero" },
                { title: "FAQ", to: "/admin/faq" },
                { title: "Categories", to: "/admin/categories" },
                { title: "Manage Team", to: "/admin/team" },
                { title: "Courses Analytics", to: "/admin/courses-analytics" },
                { title: "Orders Analytics", to: "/admin/orders-analytics" },
                { title: "Users Analytics", to: "/admin/users-analytics" },
            ];
            const currentItem = menuItems.find((item) => item.to === pathname);
            if (currentItem) {
                setSelected(currentItem.title);
            }
        }
    }, [pathname, mounted]);

    if (!mounted) return null;

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${theme === "dark" ? "#0f172a !important" : "#ffffff !important"}`,
                    borderRight: `${theme === "dark" ? "1px solid #1e293b" : "1px solid #f1f5f9"}`,
                },
                "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
                "& .pro-inner-item:hover": { color: "#37a39a !important", backgroundColor: "transparent !important" },
                "& .pro-menu-item.active": {
                    color: "#37a39a !important",
                    background: `${theme === "dark" ? "#1e293b50" : "#f1f5f9"} !important`,
                    borderRadius: "8px",
                },
                "& .pro-inner-item": { padding: "8px 20px !important" },
                "& .pro-menu-item": { color: `${theme === "dark" ? "#94a3b8" : "#475569"}` },
            }}
            className="!bg-white dark:!bg-[#0f172a]"
        >
            <ProSidebar
                collapsed={isCollapsed}
                style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: isCollapsed ? "80px" : "250px", zIndex: 1000 }}
            >
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
                        style={{ margin: "10px 0 20px 0" }}
                    >
                        {!isCollapsed && (
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Link href="/"><h3 className="text-[25px] tracking-tight dark:text-white text-slate-900 font-semibold">EduVerse</h3></Link>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}><ArrowBackIosIcon className="dark:text-slate-400 text-slate-600 !text-[16px]" /></IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box sx={{ mb: "25px", textAlign: "center" }}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Image alt="profile" width={80} height={80} src={user?.avatar?.url || avatarDefault} style={{ borderRadius: "50%", border: "2px solid #37a39a", objectFit: "cover" }} />
                            </Box>
                            <Typography variant="h4" className="dark:text-white text-slate-900 !mt-3 !text-[16px] !font-semibold">{user?.name}</Typography>
                            <Typography variant="h6" className="dark:text-slate-400 text-slate-500 !mt-2 !text-[13px] uppercase tracking-wider">- {user?.role}</Typography>
                        </Box>
                    )}

                    <Box sx={{ paddingLeft: isCollapsed ? undefined : "10px", paddingRight: "10px" }}>
                        <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Users" to="/admin/users" icon={<GroupsIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Invoices" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Create Course" to="/admin/create-course" icon={<VideoCallIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Live Courses" to="/admin/courses" icon={<OndemandVideoIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Hero" to="/admin/hero" icon={<WebIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="FAQ" to="/admin/faq" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Categories" to="/admin/categories" icon={<WysiwygIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Courses Analytics" to="/admin/courses-analytics" icon={<MdOutlineAnalytics size={20} />} selected={selected} setSelected={setSelected} />
                        <Item title="Orders Analytics" to="/admin/orders-analytics" icon={<MdTimeline size={20} />} selected={selected} setSelected={setSelected} />
                        <Item title="Users Analytics" to="/admin/users-analytics" icon={<MdPieChart size={20} />} selected={selected} setSelected={setSelected} />
                        <div onClick={() => console.log("Logout triggered")} className="mt-4">
                            <Item title="Logout" to="/" icon={<ExitToAppIcon />} selected={selected} setSelected={setSelected} />
                        </div>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;