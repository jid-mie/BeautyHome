<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Customer extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'customers';
    protected $primaryKey = 'customer_id';
    public $timestamps = false;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'password',
        'address',
        'avatar',
        'created_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['role', 'id'];

    public function getRoleAttribute()
    {
        return 'customer';
    }

    public function getIdAttribute()
    {
        return $this->customer_id;
    }
}