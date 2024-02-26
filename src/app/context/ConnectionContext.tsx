"use client";
import { createContext, useContext, useEffect, useState } from "react"; 
import { getCMGTProjects } from "../lib/projects";
import { getTags } from "../lib/tags";

const connectionContext = createContext({ isOnline: true } as ConnectionContextProps);

export const useConnection = () => {
  return useContext(connectionContext);
};



type ConnectionContextProps = {
   isOnline:  boolean; 
   setIsOnline: (status: boolean) => void; 
};
 
 
function ConnectionContext({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [tags, setTags] = useState<string[]>([]); 

  const registerServiceWorker = async () => {
    if (window && "serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/serviceWorker.js", { scope: "/" });

        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  


  useEffect(() => {
    registerServiceWorker(); 

     getTags().then((data) => { 
      setTags(data);
    });

  }, []);

  useEffect(() => {
    window.addEventListener("offline", () => {
        setIsOnline(false);
      console.log("offline");
    });
    window.addEventListener("online", () => {
        setIsOnline(true);
      console.log("online");
    });
 
 
  }, []);

 
  return (
    <connectionContext.Provider value={{ isOnline, setIsOnline  }}>
      {children}
    </connectionContext.Provider>
  );
}

export default ConnectionContext;
