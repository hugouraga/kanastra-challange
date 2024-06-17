<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Charge extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'charges';

    protected $fillable = [
        'id', 'id_file', 'user_name', 'government_id', 'email',
        'amount', 'due_date', 'debt_id', 'invoice_generated_at',
        'invoice_dispatched_sent'
    ];
}
