import React from 'react';

const Page = () => {
    return (
        <>
            <iframe
                src="/test/test.html" // Path to your test.html in the public directory
                title="Simulation" // Good practice for accessibility
                width="100%" // Adjust as needed
                height="2000px" // Adjust as needed
                style={{ border: 'none' }} // Optional: Remove iframe border
            ></iframe>
        </>
    );
};

export default Page;