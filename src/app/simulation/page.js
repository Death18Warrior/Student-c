'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [iframeHeight, setIframeHeight] = useState('2000px');

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            setIframeHeight('2930px'); // 2000px + 400px for mobile
        }
    }, []);

    return (
        <>
            <iframe
                src="/test/test.html"
                title="Simulation"
                width="100%"
                height={iframeHeight}
                style={{ border: 'none' }}
            ></iframe>
        </>
    );
};

export default Page;
