<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::delete('/user', [AuthController::class, 'destroy']);
    });
});

Route::get('/posts', [PostController::class, 'index']);      // Список всех постов
Route::get('/posts/{id}', [PostController::class, 'show']);  // Один пост
Route::post('/posts', [PostController::class, 'store']);     // Создать
Route::put('/posts/{id}', [PostController::class, 'update']); // Обновить
Route::delete('/posts/{id}', [PostController::class, 'destroy']); // Удалить
