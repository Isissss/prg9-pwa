"use client"
import React from 'react';
import { useConnection } from '../context/ConnectionContext';


export function StateButton() {
    const { isOnline } = useConnection()

    return isOnline  ? (
        <div
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background text-accent-foreground h-9 px-3 border-green-600 pulse translate-y-[-2px] duration-300 ease-in-out rounded-full "
        >
            <span className="h-2 w-2 bg-green-600 rounded-full animate-pulse mr-2" />
            Online
        </div>
    ) : (
        <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background bg-accent text-accent-foreground h-9 px-3 border-gray-300 pulse translate-y-[-2px] duration-300 ease-in-out rounded-full"
        >
            <span className="h-2 w-2 bg-gray-300 rounded-full animate-pulse mr-2" />
            Offline
        </div> 
    );
}

