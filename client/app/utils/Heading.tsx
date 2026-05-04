import React from 'react'
import Head from 'next/head'

interface HeadProps {
    title: string;
    description: string;
    keywords: string;
}

export default function Heading({ title, description, keywords }: HeadProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Head>
    )
}