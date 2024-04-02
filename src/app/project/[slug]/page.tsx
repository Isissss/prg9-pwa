"use client";

import { getProject } from "@/lib/projects";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectT } from "@/app/page";
import Image from "next/image"; 
import ProjectPage from "@/components/ProjectPage";
import ScrolProgessComponent from "@/components/ScrollProgessComponent";
 
export default function Page({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const [project, setProject] = useState<ProjectT | null>(null);

    useEffect(() => {
        getProject(slug).then((data) => {
            setProject(data);
        });
    }, []);

    if (!project) return ( <div className="flex justify-center items-center h-screen">No project found...</div> )

    return <>
    {project && ( 
     <><ScrolProgessComponent /><ProjectPage {...project} /></>
    )}
    </>
}