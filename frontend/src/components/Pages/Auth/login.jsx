import { useState } from 'react';
import { Link, useNavigate} from 'react-router';

import { useAuth } from '../../../Context/AuthContext';
import './style.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		const result = await login({email, password});

		if (result.success) {
			navigate('/profile');
		} else {
			setError(result.error);
		}

		setLoading(false);
	};

	return (

		<div className="sign">

			<form onSubmit={handleSubmit}>
				<div><h2>Войдите в свой аккаунт</h2></div>
				{error && (
				  <div>
				    {typeof error === 'object' ? error.email?.[0] || JSON.stringify(error) : error}
				  </div>
				)}
				<div>
					<input 
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required

						placeholder="Электронная почта"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<input 
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required

						placeholder="Пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button
						type="submit"
						disabled={loading}

					>
						{loading ? 'Вход...' : 'Войти'}
					</button>
				</div>
				<div>
					<Link to="/register">
						Нет аккаунта? Зарегистрируйтесь!
					</Link>
				</div>
			</form>
		</div>
		);
};

export default Login;