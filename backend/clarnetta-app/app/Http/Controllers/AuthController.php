<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validator\ValidationException;


class AuthController extends Controller
{
    public function register(Request $request){

        //Валидация
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required' => 'Имя обязательно для заполнения',
            'name.min' => 'Имя должно быть не менее 2 символов',
            'email.required' => 'Email обязателен для заполнения',
            'email.email' => 'Введите корректный email адрес',
            'email.unique' => 'Пользователь с таким email уже существует',
            'password.required' => 'Пароль обязателен для заполнения',
            'password.min' => 'Пароль должен быть не менее 8 символов',
            'password.confirmed' => 'Пароли не совпадают',
        ]);

        //Ошибка валидации
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
            'message' => 'Регистрация прошла успешно!'
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'Email обязателен для заполнения',
            'email.email' => 'Введите корректный email адрес',
            'password.required' => 'Пароль обязателен для заполнения',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        // Проверка пароля
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'email' => ['Неверный email или пароль']
                ]
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
            'message' => 'Вход выполнен успешно!'
        ]);
    }


    public function logout(Request $request)
    {
        try {
            // Удаление текущего 
            $request->user()->currentAccessToken()->delete();
            
            return response()->json([
                'message' => 'Выход выполнен успешно!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ошибка при выходе'
            ], 500);
        }
    }

    public function user(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
            ]
        ]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        
        // Проверка аутентификации пользователя
        if (!$user) {
            return response()->json([
                'message' => 'Пользователь не аутентифицирован'
            ], 401);
        }
        
        // Валидация входных данных
        $validated = $request->validate([
            'password' => 'required|string'
        ]);
        
        // Проверка пароля
        if (!Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Неверный пароль'
            ], 422);
        }
        
        try {
            // Удаление всех токенов пользователя
            $user->tokens()->delete();
            
            // Удаление пользователя
            $user->delete();
            
            return response()->json([
                'message' => 'Аккаунт успешно удален!'
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error("Ошибка удаления аккаунта, $request", [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'message' => "Ошибка при удалении аккаунта, $request",
                'error' => config('app.debug') ? $e->getMessage() : 'Внутренняя ошибка сервера'
            ], 500);
        }
    }



}
