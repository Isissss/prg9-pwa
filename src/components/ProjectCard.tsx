import { ProjectT } from '@/app/page';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProjectCard({ project, links }: ProjectT) {
   const { title, tagline, header_image, tags, slug } = project;
   const randomDirection = Math.random() > 0.5 ? 'left' : 'right';

   return (
      <div className={clsx('rounded-md bg-white border shadow-md hover:scale-[105%] transition-transform relative', randomDirection === 'left' ? 'hover:rotate-2' : 'hover:-rotate-2')}>
         <Image unoptimized src={header_image} alt={title} width={300} height={200} className='w-full rounded-t-md' />
         <div className='p-5'>
            <a href={`/project/${slug}`} aria-labelledby={title} className='font-medium text-lg after:contents-[""] after:absolute after:inset-0 after:w-full'>
               <h2 className='line-clamp-1 font-bold text-neutral-700 text-xl mb-2'>{title}</h2>
            </a>
            <p className='line-clamp-3 mb-5 flex-grow text-base font-light h-[4.5rem]'>{tagline}</p>
            <div className='flex flex-row flex-wrap gap-y-2'>
               {tags.map((tag, index) => (
                  <span key={index} className="bg-gray-300 text-black px-3 py-1 rounded-full  mr-2">{tag.name}</span>
               ))}
            </div>
         </div>
      </div>
   )
}