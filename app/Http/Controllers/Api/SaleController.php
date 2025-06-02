<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Sale;
use App\Models\SaleItem;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //To Show the page
        $categories = Category::all();
        $products = Product::all();
        return inertia('sale', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Storing the data in two tables

        $sale = Sale::create([
            'customer_name' => $request->customer_name,
            'total' => collect($request->items)->sum('total')
        ]);

        // dd($request->all());
        foreach ($request->items as $item) {            
            SaleItem::create([
                'sale_id' => $sale->id,
                'product_name' => $item['name'],
                'quantity' => $item['quant']
            ]);
        }

        return response()->json([
            'message' => 'Sale Stored',
            // 'sale_id' => $sale->id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
