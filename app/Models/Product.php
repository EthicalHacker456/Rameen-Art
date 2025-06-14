<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //Model for Product details

    protected $fillable = [
        'name',
        'image',
        'category_id',
        'price',
        'description',
        'rating'
    ];

    public function product(){
        return $this->belongsTo(Category::class);
    }
}
