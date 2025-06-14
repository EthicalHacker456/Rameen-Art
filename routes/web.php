<?php 

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use App\Models\Category;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Http\Controllers\Api\AuthController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    

});
Route::get('dashboard', function () {

        $categories = Category::all();
        $sales = Sale::all();
        $saleItem = SaleItem::all();
        
        return Inertia::render('dashboard',[
            'categories' => $categories,
            'sales' => $sales,
            'saleItem' => $saleItem,
            'products' => Product::all()
        ]);
    })->name('dashboard');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Route::get('categories', function () {
//     return Inertia::render('categories');
// })->name('categories');



Route::post('adminLogin', [AuthController::class, 'login']);

Route::get('categories', [CategoryController::class, 'index'])->name('categories');
Route::get('product', [ProductController::class, 'pageIndex'])->name('product');
Route::get('sale', [SaleController::class, 'index']);

Route::get('pageAddProduct', [ProductController::class, 'pageAddProduct']);
Route::get('editProduct/{id}', [ProductController::class, 'edit']);
// Route::get('products', function (){
//     return Inertia::render('products');
// });

Route::get('addCategory', function (){
    return Inertia::render('addCategory');
})->name('addCategoryPage');

Route::post('updateCategory/{id}', [CategoryController::class, 'update']);
Route::get('editCategory/{id}', [CategoryController::class, 'edit']);
Route::get('/editProduct/{id}', [ProductController::class, 'edit']);
Route::post('storeCategory', [CategoryController::class, 'store']);
Route::delete('deleteCategory/{id}', [CategoryController::class, 'delete']);
Route::get('/loginPage', function () {
    return Inertia::render('auth/login');
});

Route::get('/registerPage', function () {
    return Inertia::render('auth/register');
});


Route::get('/user', function () {
    return Inertia::render('user/layout/app');
});

Route::get('/user/home', function () {
    return Inertia::render(('user/partials/home'));
});

