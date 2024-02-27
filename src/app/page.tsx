"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCMGTProjects } from "../lib/projects";
import localForage from "localforage";
import Link from "next/link";

export type ProjectT = {
  project: {
    id: string | number;
    title: string;
    slug: string;
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

  const [projects, setProjects] = useState<ProjectT[]>([]);


  useEffect(() => {
    getCMGTProjects().then((data) => {
      const sortedProjects = data.sort((a: ProjectT, b: ProjectT) => {
        return parseInt(a.project.id as string) > parseInt(b.project.id as string) ? -1 : 1;  
      });

      setProjects(sortedProjects);

   
        data.forEach((project: ProjectT) => {
          localForage.setItem(project.project.slug, project)} 
        ); 
    }
    ) 


  }, []);

  return (
    <div>
      {projects.map(({ project, links }) => (
        <div key={project.id}>
          {project.id}
          <Link passHref href={`/project/${project.slug}`}  > Hello </Link> <Link href="/hello">dwadaw</Link>
          <h2>{project.title}</h2>
          <p>{project.tagline}</p>
          <img 
            src={project.header_image}
            alt={project.title} 
          />
          <p>{project.description}</p>
          <p>{project.author}</p>
          <p>{project.created_at}</p>
        </div>
      ))}
    </div>
  );
}
