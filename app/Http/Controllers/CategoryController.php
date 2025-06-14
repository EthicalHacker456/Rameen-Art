<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Product;

class CategoryController extends Controller
{
    //Function to fetch categories

    public function index(){
        $categories = Category::all();

        return Inertia::render('categories', [
                'categories' => $categories,
            ]
        );
    }

    // public function pageIndex(){
    //     $products = Product::all();
    //     return Inertia::render('product', [
    //         'products' => $products
    //     ]);
    // }

    public function store(Request $request){
        Category::create([
            'name' => $request->name
        ]);
        return response()->json(['message' => 'Category created successfully']);
    }

    public function delete($id){

        $category = Category::find($id);
        $category->delete();
    }

    public function edit($id){
        $category = Category::find($id);
        return Inertia::render('editCategory', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id){

        $category = Category::find($id);
        
        $category->update([
            'name' => $request->name
        ]);

        return response()->json(['message' => 'Category updated']);
    }
}
