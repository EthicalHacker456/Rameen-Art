import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { TrashIcon, Trash2Icon } from 'lucide-react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Silk from '@/components/silk-background';
import GradientText from '@/components/gradiant-text'
import BlurText from "@/components/blur-text";





const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sale',
        href: '/sale'
    }
];

type Category = {
    id: number;
    name: string;
}

type Product = {
    id: number;
    category_id: number;
    name: string;
    price: number;
    color: string;
}

type Prop = {
    categories: Category[];
    products: Product[];
}

export default function Sale({ categories, products }: Prop) {

    const [customer, setCustomer] = useState('');
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useState<{ name: string; total: number; quant: number }[]>([]);

    const handleAnimationComplete = () => {
    console.log('Animation completed!');
    };

    const [error, setError] = useState({
        customer: '',
        cart: ''
    });

    function validation() {
        const Errors = {
            customer: '',
            cart: ''
        }

        let valid = true;

        if (customer === '') {
            Errors.customer = 'Name Required';
            valid = false;
        }
        if (cart.length === 0) {
            Errors.cart = 'Add Something';
            valid = false;
        }

        setError(Errors);

        if (valid) {
            submitSale();
        }
    }

    function submitSale() {

        const saleData = {
            customer_name: customer,
            items: cart
        }

        axios.post('/api/addSale', saleData).then((response) => {
            alert(response.data.message);
            window.location.href = '/sale';
        }).catch(() => {
            alert('Error');
        });

    }

    const selectedProduct = products.find((prod) => prod.id === Number(product));
    const price = selectedProduct ? selectedProduct.price * quantity : 0;

    const selectedProducts = products.filter((product) => product.category_id === Number(category));
    const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);


    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Sale" />

            {/* <div className='bg-gray-100'>
                <h1 className='self-start text-3xl mx-2 font-bold'>Sale</h1>
            </div> */}


            





            <div className='relative h-full'>
                <div className="absolute inset-0 z-[0] rounded">
                    <Silk
                        speed={5}
                        scale={1}
                        color="#FFFFFF"
                        noiseIntensity={0.5}
                        rotation={0}
                    />
                </div>
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle,_1px,_#d1d5db_1px,_transparent_1px)] [background-size:20px_20px] z-0"></div>     */}
                <div className="absolute inset-0 z-10 flex justify-center items-center">
                    <div className="w-[55%] h-auto max-h-[95%]    bg-white/10 p-6 rounded-lg shadow-lg">
                        
                            
                        <div className='flex flex-col justify-center items-center py-4'>

                            
                            <div className='flex flex-col justify-center items-center w-[85%]'>
                                
                                <BlurText
                                text="Sale"
                                delay={300}
                                animateBy="words"
                                direction="top"
                                onAnimationComplete={handleAnimationComplete}
                                className="text-3xl mb-4 self-start"
                                />
                                
                                
                                <h1 className='self-start text-md '>Customer</h1>

                                <input className={` rounded  w-full p-2 shadow-sm mb-4 ${error.customer ? 'border-red-400 shadow-sm shadow-red-400' : ''}`}
                                    placeholder='Enter Name'
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)} />
                                {error.customer && <p className='text-red-400 text-sm flex  items-center self-start mt-2 gap-2'>{error.customer}<ExclamationCircleIcon className='h-4 w-4' /></p>}
                            </div>


                            <div className='flex flex-col justify-center items-center w-[85%] '>

                                {/* <h1 className='text-md self-start mt-4'>Products</h1> */}
                                <div className='flex flex-col  rounded-md  w-full'>
                                    <div className='flex flex-wrap gap-4 w-full'>
                                        <div className='flex flex-col flex-1 min-w-[120px]'>
                                            <h1 className='text-gray-900 mb-2'>Category</h1>
                                            <select className='shadow-sm rounded  p-2 w-full '
                                                onChange={(e) => setCategory(e.target.value)}
                                                value={category}>
                                                <option>Select Category</option>
                                                {categories.map((cat) => (
                                                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col flex-1 min-w-[120px]'>
                                            <h1 className='text-gray-900 mb-2'>Product</h1>
                                            <select className='shadow-sm rounded  p-2 w-full '
                                                onChange={(e) => { setProduct(e.target.value); setQuantity(1) }}
                                                value={product}>
                                                <option>Select Product</option>
                                                {selectedProducts.map((prod) => (
                                                    <option value={prod.id} key={prod.id}>{prod.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col w-[80px]'>
                                            <h1 className='text-gray-900 mb-2'>Quantity</h1>
                                            <input className='shadow-sm  rounded p-2 w-full '
                                                type='number'
                                                value={quantity}
                                                min={0}
                                                onChange={(e) => setQuantity(Number(e.target.value))} />
                                        </div>



                                    </div>
                                    <div className='flex flex-1 min-w-[120px] gap-6 items-end'>
                                        <div className='flex flex-col flex-1'>
                                            <h1 className='text-gray-900 mb-2'>Price</h1>
                                            <input
                                                className='shadow-sm  rounded p-2 w-3/4 '
                                                value={price}
                                                readOnly
                                            />
                                        </div>
                                        <button className="cursor-pointer transition-all bg-gray-100 text-dark px-6 py-1 rounded-lg w-1/4
                                            border-gray-300
                                            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                                            onClick={() => {
                                                if (selectedProduct && quantity > 0) {
                                                    setCart([
                                                        ...cart,
                                                        {
                                                            name: selectedProduct.name,
                                                            total: selectedProduct.price * quantity,
                                                            quant: quantity
                                                        }
                                                    ]);
                                                    setProduct('');
                                                    setQuantity(0);
                                                }
                                            }}>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[85%] mt-4'>
                                <table className={`table-auto w-full`}>
                                    <thead className='border-b-2 border-gray-200 '>
                                        {error.cart && <p className='text-red-400 text-sm flex  items-center self-start mt-2 gap-2'>{error.cart}<ExclamationCircleIcon className='h-4 w-4' /></p>}
                                        <tr className=''>
                                            <th className='w-4/10 text-left py-2 px-2'>Products</th>

                                            <th className='w-2/10'></th>
                                            <th className='w-3/10 text-right py-2 px-2'>Total</th>
                                            <th className='w-1/10'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
                                            <tr key={index} className=''>
                                                <td className='py-2'>{item.name}</td>
                                                <td className='py-2'>x{item.quant}</td>
                                                <td className='text-right pe-2 py-2'>$ {item.total}</td>
                                                {/* To  understand yet...*/}
                                                <td className='py-2 ps-2'><button onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                                    className='flex items-center'>
                                                    <Trash2Icon className='h-4 w-4  hover:scale-140 transition-all ' />
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <hr className='border-b-1 border-gray-100' />
                                <div className='flex justify-between mt-2 items-center'>
                                    <h1 className='font-bold'>Total</h1>
                                    <p className='font-bold'>$ {totalPrice}</p>
                                    <button className='cursor-pointer transition-all bg-gray-100 text-dark p-1 rounded-lg w-1/4
                                            border-gray-300
                                            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
                                        onClick={validation}
                                    >Buy
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AppLayout>
    )
}