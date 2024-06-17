<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Archive extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    protected $table = 'archives';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id', 'file_name', 'size', 'charges_count', 'amount_total'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Str::uuid();
        });
    }

}
