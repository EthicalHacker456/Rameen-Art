<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //Model for category 

    protected $fillable = [
        'name'
    ];

    public function category(){
        return $this->hasMany(Product::class);
    }
}
