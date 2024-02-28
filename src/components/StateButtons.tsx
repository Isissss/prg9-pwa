"use client"
import React, { useState } from 'react';
import { useConnection } from '../context/ConnectionContext';


export function StateButton({ className }: { className?: string }) {
    const { isOnline } = useConnection()
    const [dismissed, setDismissed] = useState(false);

    return <>
        {(!isOnline && !dismissed) && (
            <div className="w-full items-center text-center bg-white py-2">
                Currently in Offline Mode. Please connect to the internet to get the latest updates and use all features.
                <button onClick={() => setDismissed(true)} className="bg-cmgt-red text-white px-3 py-1 rounded-full ml-3">X</button>
            </div>
        )}
    </>
}

