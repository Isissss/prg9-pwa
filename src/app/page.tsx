"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCMGTProjects } from "./lib/projects";
import localForage from "localforage";

type Project = {
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

  const [projects, setProjects] = useState<Project[]>([]);


  useEffect(() => {
    getCMGTProjects().then((data) => {
      setProjects(data);

      localForage.clear().then(function () {
        data.forEach((project) => {
          localForage.setItem(project.project.id.toString(), project);
        }
        );
      }
      );
    }
    );


  }, []);

  return (
    <div>
      {projects.map(({ project, links }) => (
        <div key={project.id}>
          {project.id}
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
