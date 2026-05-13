"use client"

import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardWidgets from './Widgets/DashboardWidgets';

type Props = {
    isDashboard?: boolean;
}

export default function DashboardHero({ isDashboard }: Props) {

    const [open, setOpen] = useState(false);

    return (
        <div className="mt-[60px]">
            <DashboardHeader open={open} setOpen={setOpen} />

            {
                isDashboard && (
                    <DashboardWidgets open={open} setOpen={setOpen} />
                )
            }
        </div>
    )
}
