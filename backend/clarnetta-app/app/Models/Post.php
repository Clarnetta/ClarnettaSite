<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public function getAuthorNameAttribute()
    {
        return $this->user?->name ?? 'Unknown Author';
    }

    protected $fillable = ['title', 'content', 'author_name',];
}
