"use client"
import React, { useState } from 'react';
import { useConnection } from '../context/ConnectionContext';


export function StateBanner() {
    const { isOnline } = useConnection()

    return <>
        {(!isOnline) && (
            <div className="w-full items-center text-center bg-white py-2">
                Currently in Offline Mode. Please connect to the internet to get the latest updates and use all features.
                
            </div>
        )}
    </>
}

