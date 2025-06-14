import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';
import Silk from '@/components/silk-background';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
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

type Sales = {
    customer_name: string;
    total: number;
    created_at: string;
}

type SaleItem = {
    sale_id: number;
    product_name: string;
    product_id: null;
    quantity: number;
    created_at: string;
}

type CategoryProps = {
    categories: Category[];
    products: Product[];
    sales: Sales[];
    saleItem: SaleItem[];
}

export default function Dashboard({ categories, products, sales, saleItem }: CategoryProps) {

    const presentMonth = () => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    }

    const allItem: Record<string, number> = {};

    saleItem.forEach((item) => {
        if (allItem[item.product_name]) {
            allItem[item.product_name] += item.quantity;
        } else {
            allItem[item.product_name] = item.quantity;
        }
    });

    const topSelling = Object.entries(allItem).sort((a,b) => b[1] - a[1]).slice(0, 4);
    
    // console.log(topSelling);
    const topProductName = topSelling.map(([name]) => name);
    const topProductQuantity = topSelling.map(([, quantity]) => quantity);

    let maxQuantity = 0;
    let mostSeller = '';

    for (const [name, qty] of Object.entries(allItem)) {
        if (qty > maxQuantity) {
            mostSeller = name;
            maxQuantity = qty;
        }
    }

    const totalRevenue = sales.reduce((acc, sale) => acc + Number(sale.total), 0);
    const totalSales = sales.length;
    const presentDay = new Date();

    const [startDate, setStartDate] = useState(presentMonth());
    const [endDate, setEndDate] = useState(presentDay);

    const [topSeller, setTopSeller] = useState(mostSeller);

    const [month, setMonth] = useState<string[]>([]);
    const [monthlySale, setMonthlySale] = useState<number[]>([]);

    const [yanki, setYanki] = useState(totalSales);
    const [revenue, setRevenue] =useState(totalRevenue);

    const [filteredStart, setFilteredStart] = useState(presentMonth());
    const [filteredEnd, setFilteredEnd] = useState(presentDay);

    useEffect(() => {
        dateFilter(); 
    }, [filteredStart, filteredEnd]);


    function dateFilter(){

        // const allMonths = [
        // 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        // ];

        // const monthlySales = Array(12).fill(0);

        // sales.forEach((sale) => {
        //     const saleDate = new Date(sale.created_at);
        //     const saleMonth = saleDate.getMonth();
    
        //     if(saleDate >= startDate && saleDate <= endDate){
        //         monthlySales[saleMonth]++;
        //     } 
        // })

        // const filteredMonth: string[] = [];
        // const filteredSale: number[] = [];

        // monthlySales.forEach((count, index) => {
        //     if(count > 0 ){
        //         filteredMonth.push(allMonths[index]);
        //         filteredSale.push(count);
        //     }
        // });

        const dayLabel: string[] = [];
        const salesPerDay: number[] = [];
        // let salesss = 0;
        const current = new Date(filteredStart);
        while(current <= filteredEnd){

            const dateStr = current.toISOString().split('T')[0];
            dayLabel.push(current.toLocaleDateString('en-US', {day: 'numeric', month: 'short'}));

            const saleToday = sales.filter((sale) => {
                const saleDate = new Date(sale.created_at).toISOString().split('T')[0];
                return saleDate === dateStr;
            }).length;

            const totalSaless = sales.filter((sale) => {
                const sales = new Date(sale.created_at);
                return sales >= filteredStart && sales<= filteredEnd;
                 
            }).length;

            const totalRevenueFiltered = sales.reduce((sum, sale) => {
                const sales = new Date(sale.created_at);
                if(sales >= filteredStart && sales<= filteredEnd){
                    return sum + Number(sale.total);
                }
                return sum;
            },0);

            

            

            setRevenue(totalRevenueFiltered);
            setYanki(totalSaless);

            salesPerDay.push(saleToday);
            current.setDate(current.getDate() + 1);

            

        }
        const topProduct: Record<string, number> = {};

            const mostSellerProductMonth = saleItem.filter((item) => {

                const itemDate = new Date(item.created_at);
                return itemDate >= filteredStart && itemDate <= filteredEnd;
            });

            mostSellerProductMonth.forEach((item) => {

                if(topProduct[item.product_name]){
                    topProduct[item.product_name] += item.quantity;
                } else {
                    topProduct[item.product_name] = item.quantity;
                }
            });

            let topSeller = '';
            let topQuantity = 0;

            for(const[name, qty] of Object.entries(topProduct)){
                if(qty > topQuantity){
                    topSeller = name;
                    topQuantity = qty;
                }
            }

        setTopSeller(topSeller);    
        setMonth(dayLabel);
        setMonthlySale(salesPerDay);

        // setMonth(filteredMonth);
        // setMonthlySale(filteredSale);
    }
    // const [category, setCategory] = useState('');

    // const selectedProducts = products.filter((product) => product.category_id === Number(category));
    
    

    //Making an object to reduce  data

    

    const allMonths = [
        'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthlySales = Array(12).fill(0);

    sales.forEach((sale) => {
        const monthIndex = new Date(sale.created_at).getMonth();
        monthlySales[monthIndex]++;
    })
    
    const filteredMonth: string[] = [];
    const filteredSale: number[] = [];

    monthlySales.forEach((count, index) => {
        if(count > 0){
            filteredSale.push(count);
            filteredMonth.push(allMonths[index]);
        }
    })

    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-6 shadow-lg">
                        <div className='flex flex-col h-full'>
                            <h1 className='text-3xl font-bold'>Sales</h1>
                            <div className='flex-1 font-bold'>monthly</div>
                            <h1 className='text-2xl text-right'>{yanki}</h1>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-6 shadow-lg">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className='flex flex-col h-full'>
                            <h1 className='text-3xl font-bold'>Revenue</h1>
                            <div className='flex-1 font-bold'>monthly</div>
                            <h1 className='text-2xl text-right'>Rs {revenue}</h1>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-6 shadow-lg">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className='flex flex-col h-full'>
                            <h1 className='text-3xl font-bold'>Popular</h1>
                            <div className='flex-1 font-bold'>montly</div>
                            <h1 className='text-2xl text-right'>{topSeller}</h1>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <div className=' md:w-6/10 lg:w-10/10'>
                    <DatePicker 
                    selected={startDate}
                    onChange={(date) => setStartDate(date!)}
                    className='border ms-2 mt-2 p-2 rounded text-sm'
                    />
                    <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date!)}
                    className='border ms-2 mt-2 p-2 rounded text-sm'/>
                    <button onClick={() => {
                        setFilteredStart(startDate);
                        setFilteredEnd(endDate);
                        dateFilter();
                    }}
                    className=' rounded border ms-2 mt-2 p-1 w-26 text-black-900 hover:bg-black hover:text-white duration-400 transition-all cursor-pointer'
                    >Apply</button>
                        <Chart
                        type='line'
                        height={300}
                        width="100%"
                        options={{

                            chart: {
                                id: 'sales-line-chart'
                            },

                            xaxis: {
                                categories: month
                            },

                            title: {
                                text: 'Monthly Sales',
                                align: 'left'
                            },
                            colors: ['#1E293B'],
                            stroke: {
                                curve: 'smooth'
                            }

                        }}

                        series={[
                            {
                                name: 'Sales',
                                data: monthlySale,
                            }
                        ]}
                    />
                    <Chart
                        type='donut'
                        height={300}
                        options={{
                            labels: topProductName,
                            title: {
                                text: 'Top Selling Products',
                                align: 'left'
                            },
                            colors: ['red', 'gold', 'green', 'black'],
                            legend: {
                                position: 'top'
                            }
                        }}
                        series={topProductQuantity}
                    />
                    </div>
                    {/* <div className='w-[100%]'>
                        
                    </div> */}
                </div>
            </div>
        </AppLayout>
    );
}
