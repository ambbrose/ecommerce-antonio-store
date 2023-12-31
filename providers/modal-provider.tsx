"use client";

import {useState, useEffect} from 'react';

import PreviewModal from "@/components/preview-modal";

const ModalProvider = () => {
    
    const [isMounted, setIsMounted] = useState<boolean>(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    };

    return (
        <>
            <PreviewModal />
        </>
    );
};

export default ModalProvider;