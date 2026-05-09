import Protected from '../hooks/useProtected'
import Header from '../components/Header'
import ProfileWrapper from '../components/profile/ProfileWrapper';

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | Eduverse',
    description: 'Elearning platform for students to learn and get help from teachers',
    keywords: 'Programming, Web Development, Machine Learning, MERN Stack'
}

export default function Page() {
    return (
        <>
            <Protected>
                <Header />
                <ProfileWrapper>
                </ProfileWrapper>
            </Protected>
        </>
    )
}