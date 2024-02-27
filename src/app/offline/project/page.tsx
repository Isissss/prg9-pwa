"use client";

import { getProject } from "@/lib/projects";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectT } from "@/app/page";
import Image from "next/image";  
import ProjectPage from "@/components/ProjectPage";
import ScrollScaleComponent from "@/components/ScrollComponent";

export default function Page() {
    const [project, setProject] = useState<ProjectT | null>(null);

    useEffect(() => {
        const projectSlug = window.location.pathname.split('/').pop() || "natuurdekkers";

        getProject(projectSlug).then((data) => {
            setProject(data);
        }
        );
    }, []);

    if (!project) return <div>Loading...</div>;
     

    return <>
    {project && ( 
     <><ScrollScaleComponent /><ProjectPage {...project} /></>    
    )}
    </>
}