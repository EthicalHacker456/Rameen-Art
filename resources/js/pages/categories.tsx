import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrashIcon, PencilIcon, PlusIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];


type Category = {
    id: number;
    name: string;
}

type CategoriesProps = {
    categories: Category[];
}


export default function Categories({ categories }: CategoriesProps) {

    const [Adding, setAdding] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    const [edit, setEdit] = useState(false);
    const [editInput, setEditInput] = useState('');

    const [editingCategory, setEditingCategory] = useState<number | null>(null);



    function handleEdit(category: Category) {
        setEditingCategory(category.id);
        setEditInput(category.name);
        setEdit(true);
    }

    function editValidation() {
        if (editInput === '') {
            setError('Categroy Required');
            return;
        } else {
            submitEditCategory();
            setEdit(false);
            setEditingCategory(null);
        }
    }

    function validation() {
        if (categoryName === '') {
            setError('Category Required');
            return;
        } else {
            submitCategory();
        }
    }

    function submitEditCategory() {
        axios.post(`/updateCategory/${editingCategory}`, { name: editInput }).then((response) => {
            alert(response.data.message);
            window.location.reload();
        }).catch(() => {
            alert('Something is ghalat');
        });
    }

    function submitCategory() {


        axios.post('/storeCategory', { name: categoryName }).then((response) => {
            setAdding(false);
            alert(response.data.message);
        }).catch(() => {
            alert('Something is ghalat');
        });
        setCategoryName('');
    }

    let content;

    if (!Adding) {
        content = (<div className='grid md:grid-cols-2 transition-all duration-500 ease-in-out'>
            <h1 className='text-2xl font-bold p-5'>Category</h1>
            <div className='flex justify-end items-center me-7'>
                <button className='flex items-center relative py-2 px-8 text-black border text-base font-bold nded-full overflow-hidden bg-white 
                rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 
                before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 
                before:transition-all before:duration-400 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                    onClick={() => setAdding(true)}>

                    <PlusIcon className='h-6 w-10' /><span className='font-bold me-4'>Category</span>
                </button>
            </div>
        </div>);
    } else {
        content = (
            <div className='grid md:grid-cols-2 transition-all duration-500 ease-in-out'>
                <h1 className='text-2xl font-bold p-5'>Category</h1>

                <div className='flex justify-end items-center me-7 gap-2'>
                    <div className='flex flex-col'>
                        <input placeholder='Enter Category' className={`border rounded p-2 mt-1 w-100 ${error ? 'border-red-400 shadow-sm shadow-red-400' : 'border-gray-400'}`}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)} />
                        {error && <p className='text-red-400 text-sm flex justify-start items-center gap-2'>{error}<ExclamationCircleIcon className='h-4 w-4' /></p>}
                    </div>
                    <button onClick={validation} className='ms-4'><svg className="w-6 h-8 me-2 text-gray-800 dark:text-white hover:scale-125 transition-all duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                        <path d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
                    </svg></button>
                    <button className=" text-gray-800 bg-red-500 rounded text-white hover:shadow-lg shadow-gray-400 hover:-translate-y-1 transition-all duration-300 dark:hover:shadow-gray-100"
                        onClick={() => { setAdding(false); setCategoryName(''); setError(''); }}
                    ><XMarkIcon className='h-8 w-8' /></button>
                </div>
            </div>
        );
    }

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            
                <div className='mx-6 my-6 border rounded-xl shadow-lg shadow-gray-400 h-[100%]'>

                    {content}
                    <hr className='border-2' />

                    <div className='grid md:grid-cols-1'>

                        <table className='table-auto w-full'>
                            <thead className='mt-3'>
                                <tr className='text-2xl '>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {categories.map((cat) => (
                                    <tr key={cat.id} className='border-b hover:bg-gray-100'>
                                        <td className='py-5 text-lg'>{cat.id}</td>
                                        <td className='py-5 text-lg'>{cat.name}</td>
                                        <td>
                                            <button onClick={() => router.delete(`/deleteCategory/${cat.id}`)} className='border border-red rounded bg-red-500 me-3 mt-2 p-1 hover:shadow-lg shadow-gray-400 hover:-translate-y-1 transition-all duration-300'>
                                                <TrashIcon className='h-7 w-8 text-white' />
                                            </button>
                                            <button onClick={() => handleEdit(cat)} className='border border-red rounded bg-yellow-400 p-1 hover:shadow-lg shadow-gray-400 hover:-translate-y-1 transition-all duration-300'>
                                                <PencilIcon className='h-7 w-8 text-white' />
                                            </button>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

            {edit && (
                <div className='fixed inset-0 z-10 flex justify-center items-center backdrop-blur-sm transition-all bg-black/30'>
                    <div className='bg-white p-6 rounded-md flex items-center shadow-lg shadow-gray-400 gap-2'>
                        <div className=''>
                            <input
                                className={`rounded p-1 border shadow-lg border ${error ? 'border-red-400 shadow-sm shadow-red-400' : 'border-gray-300'}`}
                                value={editInput}
                                onChange={(e) => setEditInput(e.target.value)} />
                            {error && <p className='text-red-400 text-sm flex flex-row items-center gap-2'>{error}<ExclamationCircleIcon className='h-4 w-4' /></p>}
                        </div>


                        <button onClick={editValidation} className='ms-4'><svg className="w-6 h-8 me-2 text-gray-800 dark:text-white hover:scale-125 transition-all duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                            <path d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
                        </svg></button>
                        <button className="w-8 h-8 text-gray-800 bg-red-500 rounded text-white hover:shadow-lg shadow-gray-400 hover:-translate-y-1 transition-all duration-300 dark:hover:shadow-gray-100"
                            onClick={() => { setEdit(false); setEditingCategory(null); setError(''); }}

                        ><XMarkIcon /></button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}


