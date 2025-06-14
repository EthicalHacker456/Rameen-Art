import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { TrashIcon, PencilIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ReactPaginate from 'react-paginate';
import { useState} from 'react';
import {usePage} from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product'
    },
];

type Product = {
    id: number;
    category_id: number;
    name: string;
    price: number;
    image: File;
    rating: number;
}

type ProductProps = {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number
    
    }
};


export default function Products({ products }: ProductProps) {
    // const itemsPerPage = 4;

    // const [currentPage, setCurrentPage] = useState(0);
    // const offSet = currentPage * itemsPerPage;
    // const currentItems = products.slice(offSet, offSet + itemsPerPage);
    // const pageCount = Math.ceil(products.length/itemsPerPage);

    const handlePageClick = ({selected}: {selected: number}) => {
        router.get('/product', {page: selected + 1});
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className=' mx-5  my-4 border rounded-xl shadow-lg shadow-gray-400 h-full'>
                
                
                <div className='grid md:grid-cols-2'>
                    <h1 className='text-2xl font-bold p-5 '>Products</h1>
                    <div className='flex justify-end items-center me-7'>
                        <button className='flex items-center relative py-2 px-8 text-black border text-base font-bold nded-full overflow-hidden bg-white 
                            rounded-full transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 
                            before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 
                            before:transition-all before:duration-400 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0' onClick={() => router.get('/pageAddProduct')}>
                            <PlusIcon className='h-6 w-10' /><span className='font-bold me-4'>Product</span>
                        </button>
                    </div>
                </div>

                <hr className='border-2 '/>

                <div className='m-2 grid md:grid-cols-1 '>
                 <div className=''>
                    <table className='table-auto w-full'>
                        <thead className=' mt-3'>
                            <tr className='text-xl'>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {products.data.map((product, $index) => (
                                <tr key={product.id} className='hover:bg-gray-100 border-b'>
                                    <td className='py-5 text-lg'>{product.category_id}</td>
                                    <td className='py-5 text-lg'>
                                        <img src={`/uploads/${product.image}`} className="h-10 w-14 object-cover mx-auto rounded-md"/>
                                    </td>
                                    <td className='py-5 text-lg'>{product.name}</td>
                                    <td className='py-5 text-lg'>$ {product.price}</td>
                                    <td className='py-5 text-lg'>{product.rating}</td>
                                    <td>
                                        <button onClick={() => router.get(`/api/deleteProduct/${product.id}`)} className='border border-red rounded bg-red-500 me-3 mt-2 p-1 hover:shadow-lg shadow-gray-400 hover:-translate-y-1 transition-all duration-300'>
                                            <TrashIcon className='h-7 w-8 text-white' />
                                        </button>

                                        <button onClick={() => router.get(`/editProduct/${product.id}`)} className='border border-red rounded bg-yellow-400 me-3 mt-2 p-1 hover:shadow-lg shadow-gray-400 hover:-translate-y-1 transition-all duration-300'>
                                            <PencilIcon className='h-7 w-8 text-white' />
                                        </button>
                                    </td>
                                </tr>  
                            ))}
                        </tbody>
                        
                    </table>
                    <div className='flex justify-center items-end mt-2'>
                            <ReactPaginate
                            previousLabel = {<ChevronLeftIcon className='h-6 w-3'/>}
                            nextLabel = {<ChevronRightIcon className='h-6 w-3'/>}
                            pageCount={products.last_page}
                            forcePage={products.current_page - 1}
                            onPageChange={handlePageClick}
                            containerClassName='flex'
                            pageClassName='border rounded px-2 mx-1'
                            pageLinkClassName='cursor-pointer'
                            previousClassName='border rounded px-2'
                            previousLinkClassName='cursor-pointer'
                            nextClassName='border rounded px-2'
                            nextLinkClassName='cursor-pointer'
                            activeClassName='bg-gray-900 text-white'
                            />
                        </div>
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}