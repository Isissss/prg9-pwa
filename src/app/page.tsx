"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getCMGTProjects } from "../lib/projects";
import localForage from "localforage";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ScrollScaleComponent from "@/components/ScrollComponent";
import { getTags } from "@/lib/tags";
import clsx from "clsx";
import { useConnection } from "@/context/ConnectionContext";

export type ProjectTagType = {
  id: number;
  name: string;
};

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
    tags: ProjectTagType[];
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
  const [tags, setTags] = useState<ProjectTagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<Number[]>([]);
  const { isOnline } = useConnection();
 

  useEffect(() => {
    getCMGTProjects().then((data) => {
      const sortedProjects = data.sort((a: ProjectT, b: ProjectT) => {
        return parseInt(a.project.id as string) > parseInt(b.project.id as string) ? -1 : 1;
      });

      setProjects(sortedProjects); 

      data.forEach((project: ProjectT) => {
        localForage.setItem(project.project.slug, project)
      });
    }) 

  }, []);

  useEffect(() => { 
    getTags().then((data) => { 
      setTags(data);
    });
  }, []);
  
  const filtered = useMemo(() => {
    if (selectedTags.length === 0) {
      return projects;
    }
    return projects.filter((project) => {
      return selectedTags.some((tagID) => {
        return project.project.tags.some((t) => t.id === tagID);
      });
    });
  }, [projects, selectedTags]);

  const handleTagSelection = (tagID: Number) => {
    setSelectedTags((prev) => {
      if (prev.some((id) => id === tagID)) {
        return prev.filter((id) => id !== tagID);
      } else {
        return [...prev, tagID];
      }
    });
  }

  return (<section className=" max-w-6xl mx-auto"> 
      <div className="mb-6">
        <h1 className="text-5xl font-normal mb-3">Alle projecten</h1>
        <p className="font-light">Bekijk projecten waar studenten nu mee bezig zijn.</p>
      </div>
      {isOnline && <div className="flex flex-row flex-wrap gap-y-2 my-10"> 
        {tags.map((tag, index) => (
          <button onClick={() => handleTagSelection(tag.id)} key={index} className={clsx("bg-gray-300 text-black px-3 py-1 rounded-full  mr-2",  selectedTags.some((id) => id === tag.id) && "bg-gray-500 text-white")}>
            {tag.name}
          </button>
        ))}
       </div>
  }
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((project) => (
        <ProjectCard key={project.project.id} {...project} />
      ))}
    </div>
    </section>
  );
}
