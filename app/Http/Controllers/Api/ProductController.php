<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //To show all products  
    //     $products = Product::all();  
    //     return response()->json($products);
    // }

    public function pageIndex(){

        $products = Product::paginate(4);
        return Inertia::render('product', [
            'products' => $products
        ]);

    }

    public function pageAddProduct(){

        $categories = Category::all();
        return Inertia::render('addProduct',[
            'categories' => $categories
        ]);
    }

    public function categoryIndex(){
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //To Store the product via api
        // $request->validate([
        //     'category_id' => 'required',
        //     'name' => 'required',
        //     'color' => 'required',
        //     'price' => 'required'
        // ]);
        // dd($request->all());
        // $imagePath = $request->file('image')->store('products', 'public');

        // $url = asset('storage/' . $imagePath);
        $imageName = time(). '.'.$request->image->extension();
        $request->image->move(public_path('uploads'), $imageName);
        Product::create([
            'name' => $request->name,
            'image' => $imageName,
            'price' => $request->price,
            'description' => $request->description,
            'category_id' => $request->category_id
        ]);
        return response()->json(['message' => 'Product is added']);
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
    public function updateProduct(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required',
            'color' => 'required',
            'price' => 'required'
        ]);
        $product = Product::find($id);
        $product->update($request->all());
        return response()->json(['message' => 'Product is updated']);
    }

    public function edit($id){  
        $product = Product::find($id);
        $category = Category::all();
        return Inertia::render('editProduct', [
            'product' => $product,
            'categories' => $category
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
        $product = Product::find($id);
        $product->delete();

        return redirect()->back();
    }
}
