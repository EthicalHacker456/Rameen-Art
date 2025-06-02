import NavLayout from '@/pages/user/layout/app';
import React, {useState} from 'react';


const images = [
    '/images/Bird.jpg',
    '/images/Elephant.jpg',
    '/images/Lizard.jpg',
    '/images/Tree.jpg',
]

export default function Home(){

    const [current, setCurrent] = useState(0);

    // const nextSlide = () => {
    //     setCurrent((prev) => (prev + 1) % images.length);
    // }

    // const prevSlide = () => {
    //     setCurrent((prev) => (prev - 1 + images.length) % images.length);
    // }

    return (
        <NavLayout>
        <div className='relative w-[100%] mx-auto overflow-hidden rounded-lg'>
            <div className='relative'>
                <img
                    src={images[current]}
                    alt='#'
                    className="w-full h-[400px]"
                />
                <div className='absolute bottom-4 left-1/2 '>
                    {images.map((_, index) => (
                        <button key={index}
                        onClick={() => setCurrent(index)}
                        >

                        </button>
                    ))}
                </div>
            </div>
        </div>
    </NavLayout>
    )
}