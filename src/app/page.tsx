"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type CMGTProject = {
  project: {
  id: number;
  title: string;
  header_image: string;
  image: string;
  tagline: string;
  description: string;
  author: string;
  youtube: string | null;
  screenshots: string[];
  spotlight: boolean;
  isValidated: boolean;
  created_at: string;
  updated_at: string;
  };
  links: {
    self: string;
    project: string;
  }
};

export default function Home() {
  const [projects, setProjects] = useState<CMGTProject[]>([]);

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

  async function getCMGTProjects(): Promise<CMGTProject[]> {
   try {
      const req = await fetch("https://cmgt.hr.nl/api/projects");
      const data = await req.json();
      return data.data;
    
   } catch (error) {
     console.error(error);
     return [];
    } 
  }

  useEffect(() => {
    //registerServiceWorker();

    async function getProjects() {
      const data = await getCMGTProjects();
      setProjects(data);
      console.log(data);
        }  

    getProjects(); // Call the getProjects function

  }, []); 

  return (
    <div className="bg-white text-black">
      <h1>Home</h1>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
      {projects.map(({project, links}) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.tagline}</p>
          <Image
            src={project.header_image}
            alt={project.title}
            width={200}
            height={100}
          />
          <p>{project.description}</p>
          <p>{project.author}</p>
          <p>{project.created_at}</p>
          </div>
      ))}
    </div>
  );
}
