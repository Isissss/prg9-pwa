
"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Modal } from './Modal';
import { getProject } from '@/lib/projects';
import { useEffect, useState } from 'react';
import { ProjectT } from '@/app/page';
import Image from 'next/image';
import ScrollScaleComponent from '@/components/ScrollComponent';

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
     <ScrollScaleComponent /> 
         <div className="relative flex justify-center flex-col ">
  
        <div className="relative w-full h-72 lg:h-96">
         <img src={project.project.header_image}  className="w-full -z-20 absolute inset-0 h-full  object-cover" alt={project.project.title} />
         <div className=" content-['']  absolute  -z-10  inset-0  w-full h-full bg-gradient-to-t from-black/80"></div>
          
      <div className="mt-40 lg:mt-52 slide-in-from-bottom-1/2 animate-in transition-transform duration-200  bottom-0 max-w-2xl md:mx-auto mx-[15px] z-20 ">
       
       <div className="bg-[#2e635b] w-fit p-4">
        <h1 className="font-bold text-5xl text-white">{project.project.title}</h1>
        <p className="text-gray-300 italic">{project.project.tagline}</p> 
        <p className="my-3">
            {project.project.tags.map((tag, index) => ( 
                <span key={index} className="bg-[#4a9b8e] text-white px-3 pb-2 pt-1 rounded-full  mr-2">{tag.name}</span>
            ))
                
            }
        </p>
        </div>
        </div>
        <div className="  absolute bg-[#d3104c] text-white w-fit p-5 rounded-sm top-0 right-0 md:mx-auto  z-20 "> 
            <p className="font-bold">{project.project.author}</p> 
        </div>
        
         </div>
        <div className="max-w-2xl   my-5   md:mx-auto mx-[15px] slide-in-from-bottom-1/2 animate-in transition-all duration-200">
        
        <div className="flex flex-row justify-between space-x-3 mt-6">
            <p className="font-bold">{project.project.author}</p>  
            <time> {new Date(project.project.created_at).toLocaleDateString()}</time>
        </div>

        <div  className="my-6 whitespace-break-spaces text-lg ">
            <p>{project.project.description}</p>
        </div>

 
        <h2 className="font-bold text-2xl mb-2"> Screenshots ({project.project.screenshots.length})</h2>
    
    <Carousel className="mx-12">
        <CarouselPrevious className="text-black" />
        <CarouselContent>
            {project && project.project.screenshots.map((screenshot, index) => (
            <CarouselItem key={index}  className="md:basis-1/2 ">
                <img
                src={screenshot}
                alt={`Screenshot ${index}`}
                />
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselNext  className="text-black"  />
    </Carousel>  
    </div>
    </div>  
  </Modal>;
}