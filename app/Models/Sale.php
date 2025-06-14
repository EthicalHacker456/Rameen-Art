<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;  

class Sale extends Model
{
    protected $fillable = [
        'customer_name',
        'total'
    ];

    public function sale_item(){
        return $this->hasMany(SaleItem::class);
    }
}
