import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';
 
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Category',
        href: '/editCategory'
    },
];   

type CategoryProps = {
    category: {
        id:number;
        name:string;
    }
}

export default function AddCategory({category}: CategoryProps ) {

    const [categoryName, setCategoryName] = useState(category.name);

    function submitCategory(){
        axios.post(`/updateCategory/${category.id}`, {name : categoryName}).then((response) => {
            alert(response.data.message);
            window.location.href = '/categories';
        }).catch(() => {
            alert('Something is ghalat');
        });
        setCategoryName('');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Edit Category' />

            {/* <div className='grid place-items-center h-full'></div> */}
            {/* <div className='flex items-center mb-35 p-4 w-full h-full'></div> */}
        <div className='rounded-xl shadow-lg shadow-gray-400 border border-gray-200 h-full m-6'>
            <div className='grid md:grid-cols-2 gap-6 p-8'>
                <div className='col-span-1 w-full'>
                    <h1 className='text-2xl font-bold  me-5'>Edit Category</h1>
                    <div className='flex flex-row'>
                    <input type="text" value={categoryName}
                        onChange = {(e) => setCategoryName(e.target.value)}
                        className=' mt-1  border border-gray-600 rounded py-1 px-3 justify-self-start w-130'
                        placeholder='Category Name' />
                    <button onClick={submitCategory} className='ms-2'><ArrowRightIcon className='h-7 w-8' /></button>
                    </div>
                </div>
            </div>
            </div>    
        </AppLayout >
    );
}