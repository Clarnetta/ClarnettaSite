import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/index';

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);

	if(!context) {throw new Error('useAuth должен использоваться внутри AuthProvider');}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
	  const token = localStorage.getItem('token');
	  const savedUser = localStorage.getItem('user');
	  
	  // Сразу устанавливаем пользователя из localStorage
	  if (savedUser) {
	    try {
	      setUser(JSON.parse(savedUser));
	    } catch (e) {
	      localStorage.removeItem('user');
	    }
	  }
	  
	  if (token) {
	    try {
	      const response = await authAPI.getUser();
	      setUser(response.data.user);
	      localStorage.setItem('user', JSON.stringify(response.data.user));
	    } catch (error) {
	      console.error('Ошибка проверки авторизации:', error);
	      localStorage.removeItem('token');
	      localStorage.removeItem('user');
	      setUser(null);
	    }
	  }
	  setLoading(false);
	};

	const [authLoading, setAuthLoading] = useState(false);

	const login = async (credentials) => {
		setAuthLoading(true);
		try{
			const response = await authAPI.login(credentials);
			const { token, user } = response.data;

			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);

			return {success: true};
		} catch (error) {
			return {
			  success: false,
			  error: error.response?.data?.message || 
			         error.response?.data?.errors?.email?.[0] || 
			         'Ошибка входа'
			};
		} finally {
		    setAuthLoading(false);
		  }
	};

	const register = async (userData) => {
		try{
			const response = await authAPI.register(userData);
			const { token, user } = response.data;

			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);

			return {success: true};
		} catch (error) {
			return {
			  success: false,
			  error: error.response?.data?.message || 
			         error.response?.data?.errors?.email?.[0] || 
			         'Ошибка регистрации'
			};
		}
	};

	const logout = async () => {
		try{
			await authAPI.logout();
		} catch (error) {
			console.error('Ошибка выхода: ', error);
		} finally {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			setUser(null);
		}
	};

	const deleteAccount = async (passw) => {
		try{
			await authAPI.deleteAccount(passw);
			
			// Очищаем локальное хранилище и состояние
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			setUser(null);
			
			return {success: true, message: 'Аккаунт успешно удален'};
		} catch (error) {
			console.error('Ошибка удаления аккаунта: ', passw, error);
			return {
				success: false,
				error: error.response?.data?.message || 'Ошибка удаления аккаунта'
			};
		}
	};

	const value = {
		user,
		login,
		register,
		logout,
		deleteAccount,
		loading,
		isAuthenticated: !!user,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};