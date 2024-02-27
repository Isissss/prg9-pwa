"use client";

import { getProject } from "@/lib/projects";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProjectT } from "@/app/page";
import Image from "next/image"; 
import ProjectPage from "@/components/ProjectPage";
import ScrollScaleComponent from "@/components/ScrollComponent";

export default function Page({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const [project, setProject] = useState<ProjectT | null>(null);

    useEffect(() => {
        getProject(slug).then((data) => {
            setProject(data);
        }
        );
    }, []);

     

    return <>
    {project && ( 
     <><ScrollScaleComponent /><ProjectPage {...project} /></>
    )}
    </>
}