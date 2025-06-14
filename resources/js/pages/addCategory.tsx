import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Category',
        href: '/addCategory'
    },
];

export default function AddCategory() {

    const [categoryName, setCategoryName] = useState('');

    function submitCategory() {
        axios.post('/storeCategory', { name: categoryName }).then((response) => {
            alert(response.data.message);
            window.location.href = '/categories';
        }).catch(() => {
            alert('Something is ghalat');
        });
        setCategoryName('');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Add Category' />

            {/* <div className='grid place-items-center h-full'></div> */}
            {/* <div className='flex items-center mb-35 p-4 w-full h-full'></div> */}

            {/* <div className='grid md:grid-cols-3 place-items-center h-full  mb-35'>
                <h1 className='text-2xl font-bold justify-self-end me-5'>Add New Category</h1>

                <div className='col-span-2 flex items-center w-full'>
                    <input type="text" value={categoryName}
                        onChange = {(e) => setCategoryName(e.target.value)}
                        className='bg-gray-900 mt-1  border border-gray-600 rounded py-1 px-3 justify-self-start w-130'
                        placeholder='Category Name' />

                    <button onClick={submitCategory} className='ms-2'><ArrowRightIcon className='h-7 w-8' /></button>
                </div>
            </div> */}

            <div className='flex flex-col rounded-xl shadow-lg shadow-gray-400 h-full mx-6 my-12 border p-10'>

                {/* <div className='grid md:grid-cols-2 pt-15 ps-15 w-full'>
                    
                </div> */}
                {/* <div className='grid md:grid-cols-2 px-15 pt-1 w-full'></div> */}
                <div className='flex flex-col items-start justify-center w-full h-full mb-10'>

                    <h1 className='text-2xl font-bold'>Category</h1>
                    

                </div>
                {/* <div className='grid md:grid-cols-2 px-15 pt-2 w-full place-items-start'>  
                </div> */}
            </div>
        </AppLayout >
    );
}