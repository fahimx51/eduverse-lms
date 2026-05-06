import React from 'react'
import Protected from '../hooks/useProtected'

export default function page() {
    return (
        <>
            <Protected>
                <h1 className='text-2xl text-black dark:text-white'>Profile</h1>
            </Protected>
        </>
    )
}