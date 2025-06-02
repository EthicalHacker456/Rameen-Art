import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';




type Category = {
    id: number;
    name: string
}

type Product = {
    id: number;
    category_id: number;
    name: string;
    price: number;
    color: string;
}

type Props = {
    categories: Category[];
    product: Product;
}

export default function EditProduct({ product, categories }: Props) {

    
    const [products, setProduct] = useState({
        name: product.name,
        price: product.price.toString(),
        color: product.color,
        category_id: product.category_id.toString(),

    });

    const [error, setError] = useState({
        name: '',
        price: '',
        color: '',
        category_id: ''
    });

    function validation() {

        let isValid = true;
        const newError = {
            name: '',
            price: '',
            color: '',
            category_id: ''
        }

        if (products.name === ''){
            newError.name = 'Required';
            isValid = false;
        }
        if (products.price === ''){
            newError.price = 'Required';
            isValid = false;
        }
        if (products.color === ''){
            newError.color = 'Required';
            isValid = false;
        }
        if (products.category_id === ''){
            newError.category_id = 'Required';
            isValid = false;
        } 
        setError(newError);
        if(isValid){
            submitProduct();
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const inputElement = e.target;
        const inputName = inputElement.name;
        const inputValue = inputElement.value;

        setProduct((previousProduct) => {
            return {
                ...previousProduct,
                [inputName]: inputValue
            }
        });
    } 

    function submitProduct() {
        axios.post(`/api/updateProduct/${product.id}`, products).then((response) => {
            alert(response.data.message);
            window.location.href = '/product';
        }).catch(() => {
            alert('Kam Ni bana');
        });

    }



    return (
        <AppLayout>

            <Head title='Edit Product' />
            <div className='rounded-xl shadow-lg shadow-gray-400 border border-gray-200 h-full m-6'>
                <div className='grid md:grid-cols-2 gap-6 p-8 w-full'>

                    <div className='col-span-1'>
                        <h1 className='text-md font-bold'>Name</h1>
                        <input className={`p-1 border rounded  w-full ${error.name ? 'border-red-500 shadow-sm shadow-red-400': 'border-gray-500'}`}
                        required
                        value={products.name}
                        name='name'
                        onChange={handleChange}
                        type='text'
                        placeholder='Product Name'/>
                        {error.name && <p className='text-red-500 flex items-center gap-2 mt-1 text-sm'>{error.name}<ExclamationCircleIcon className='h-4 w-4'/></p>}
                    </div>

                    <div className='col-span-1'>
                        <h1 className='text-md font-bold'>Price</h1>
                        <input value={products.price}
                        required
                        name='price'
                        onChange={handleChange}
                        type='number'
                        className={`p-1 border  rounded w-full ${error.price ? 'border-red-500 shadow-sm shadow-red-400': 'border-gray-500'}`}
                        placeholder='Enter Price'/>
                        {error.price && <p className='text-red-500 flex items-center gap-2 mt-1 text-sm'>{error.price}<ExclamationCircleIcon className='h-4 w-4'/></p>}

                    </div>

                    <div className='col-span-1'>
                        <h1 className='text-md font-bold'>Color</h1>
                        <input value={products.color}
                        required
                        name='color'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Color'
                        className={`border  rounded p-1 w-full ${error.color ? 'border-red-500 shadow-sm shadow-red-400' : 'border-gray-500'}`}/>
                        {error.color && <p className='text-red-500 flex items-center gap-2 mt-1 text-sm'>{error.color}<ExclamationCircleIcon className='h-4 w-4'/></p>}

                    </div>

                    <div className='col-span-1'>
                        <h1 className='text-md font-bold'>Category</h1> 
                        <select 
                        name='category_id'
                        required
                        onChange={handleChange}
                        value={products.category_id}
                        className={`w-full border rounded p-1 ${error.category_id ? 'border-red-500 shadow-sm shadow-red-400': 'border-gray-500'}`}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {error.category_id && <p className='text-red-500 flex items-center gap-2 mt-1 text-sm'>{error.category_id}<ExclamationCircleIcon className='h-4 w-4'/></p>}
                    </div>
                    <button
                        onClick={validation}
                        type="submit"
                        className="relative bottom-0 flex justify-center items-center gap-2 border border-[#000] rounded-xl text-[#FFF] font-black bg-[#000] uppercase px-8 py-2 z-10 overflow-hidden ease-in-out duration-500 group hover:text-[#000] hover:bg-[#FFF] active:scale-95 active:duration-0 focus:bg-[#FFF] focus:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700"
                        >
                        <span
                            className="truncate eaes-in-out duration-300 group-active:-translate-x-96 group-focus:translate-x-96"
                            >Submit</span>
                        <div
                            className="absolute flex flex-row justify-center items-center gap-2 -translate-x-96 eaes-in-out duration-300 group-active:translate-x-0 group-focus:translate-x-0"
                        >
                            <div
                            className="animate-spin size-4 border-2 border-[#000] border-t-transparent rounded-full"
                            ></div>
                            Processing...
                        </div>
                        <svg
                            className="fill-[#FFF] group-hover:fill-[#000] group-hover:-translate-x-0 group-active:translate-x-96 group-active:duration-0 group-focus:translate-x-96 group-focus:fill-[#000] ease-in-out duration-700"
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"
                            ></path>
                        </svg>
                        </button>
                </div>
            </div>
            {/* <div className='grid md:grid-cols-3 gap-5 mt-20 '>
                <div className='flex justify-end'>
                    <h1 className='text-2xl'>Name</h1>
                </div>
                <input className='col-span-2 px-3 bg-gray-900 border rounded border-gray-500 w-125'
                value={products.name}
                name='name'
                onChange={handleChange}
                type='text'
                placeholder='Product Name' />

                <div className='flex justify-end'>
                    <h1 className='text-2xl'>Price</h1>
                </div>
                <input value={products.price}
                name='price'
                onChange={handleChange}
                type='number'
                className='col-span-2 px-3 bg-gray-900 w-125 border border-gray-500 rounded'
                placeholder='Enter Price'/>

                <div className='flex justify-end'>
                    <h1 className='text-2xl'>Color</h1>
                </div>
                <input value={products.color}
                name='color'
                onChange={handleChange}
                type='text'
                placeholder='Enter Color'
                className='col-span-2 bg-gray-900 w-125 border border-gray-500 rounded px-3'/>

                <div className='flex justify-end'>
                    <h1 className='text-2xl'>Category</h1>
                </div>
                <select name='category_id'
                onChange={handleChange}
                value={products.category_id}
                className='col-span-2 bg-gray-900 w-125 border border-gray-500 rounded px-3'
                >
                    <option value="">Select Category</option>
                    {category.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                    <div className='flex justify-center me-60 col-span-3'>
                    <button onClick={submitProduct} className='col-span-2 bg-gray-100 px-4 py-1 text-gray-900 border rounded'>Submit</button>
                    </div>
            </div> */}


        </AppLayout>
    )
}