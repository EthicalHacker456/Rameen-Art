

import NavLayout from '@/pages/user/layout/app';
import React, { useState } from 'react';


const videos = [
    {
        src: '/videos/dots.mp4',
        title: 'See What We Have Done',
        description: 'A mesmerizing dots animation that creates a fluid motion effect.',
        buttonText: 'See Work',
        buttonLink: '/work'
    },{
        src: '/videos/fluid.mp4',
        title: 'See What We Have Done',
        description: 'A mesmerizing dots animation that creates a fluid motion effect.',
        buttonText: 'See Work',
        buttonLink: '/services'
    },{
        src: '/videos/colors.mp4',
        title: 'See What We Have Done',
        description: 'A mesmerizing dots animation that creates a fluid motion effect.',
        buttonText: 'See Work',
        buttonLink: '/blog'
    },{
        src: '/videos/smoke.mp4',
        title: 'See What We Have Done',
        description: 'A mesmerizing dots animation that creates a fluid motion effect.',
        buttonText: 'See Work',
        buttonLink: '/solution'
    }
    
    
    
    
]

export default function Home() {

    const [current, setCurrent] = useState(0);

    // const nextSlide = () => {
    //     setCurrent((prev) => (prev + 1) % images.length);
    // }

    // const prevSlide = () => {
    //     setCurrent((prev) => (prev - 1 + images.length) % images.length);
    // }

    return (
        <NavLayout>
            <div className='relative w-full mx-auto overflow-hidden rounded-lg h-full flex justify-center'>
                <div className='w[80vw] overflow-hidden'>
                <div className='flex gap-6 transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${current * 86}vw)` }}>

                    {videos.map((video, index) => (
                       <div key={index} className='flex-shrink-0 w-[85vw]'> 
                        <div className='relative overflow-hidden rounded-lg'>
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                src={video.src}
                                className="w-full h-[80vh] object-cover rounded-lg"
                            />
                            <div className='absolute inset-0 flex flex-col items-center justify-center text-center gap-4'>
                                <h2 className='text-4xl text-white'>{video.title}</h2>
                                <p className='text-white text-lg'>{video.description}</p>
                                <a href={video.buttonLink}
                                   className='bg-white/5 backdrop-blur-sm rounded-xl px-18 py-3 text-white text-lg font-semibold hover:bg-white/15 transition-colors duration-300'>
                                    {video.buttonText}
                                </a>
                            </div>
                        </div>
                        </div>
                        
                    ))}


                </div>
                <div>
                    <div className='absolute bottom-4 left-1/2'>
                        {videos.map((_, index) => (
                            <button key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-2 w-2 rounded-full me-2 ${current === index ? 'bg-white' : 'bg-gray-400'}`}
                            >
                            </button>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </NavLayout>
    )
}