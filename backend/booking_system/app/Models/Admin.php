<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'admins';
    protected $primaryKey = 'admin_id';
    public $timestamps = false;

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'created_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['role', 'id'];

    public function getRoleAttribute()
    {
        return 'admin';
    }

    public function getIdAttribute()
    {
        return $this->admin_id;
    }
}