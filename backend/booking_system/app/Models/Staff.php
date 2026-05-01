<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Staff extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'staffs';
    protected $primaryKey = 'staff_id';
    public $timestamps = false;

    protected $fillable = [
        'category_id',
        'full_name',
        'email',
        'phone',
        'password',
        'address',
        'avatar',
        'skill',
        'status'
    ];

    protected $hidden = [
        'password',
    ];

    protected $appends = ['role', 'id'];

    public function getRoleAttribute()
    {
        return 'staff';
    }

    public function getIdAttribute()
    {
        return $this->staff_id;
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'staff_id', 'staff_id');
    }
}