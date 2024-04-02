
"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Modal } from './Modal';
import { getProject } from '@/lib/projects';
import { useEffect, useState } from 'react';
import { ProjectT } from '@/app/page';
import Image from 'next/image';
import ScrollScaleComponent from '@/components/ScrollProgessComponent';
import ProjectPage from '@/components/ProjectPage';

export default function PhotoModal({
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
  }, [slug]);

  if (!project) return <div>Loading...</div>

  return <Modal> 
     <ProjectPage {...project} />
  </Modal>;
}