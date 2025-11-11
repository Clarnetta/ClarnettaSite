import './style.css'
import { useAuth } from '../../../Context/AuthContext';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router';

export const CheckPassword = ({onClose}) => {
	const [loading, setLoading] = useState(false);
	const { deleteAccount } = useAuth();
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await deleteAccount({password});
		if (result.success) {
			navigate('/register');
		}
	}

	return (
		<div className="modelWindow">
			
			<form onSubmit={handleSubmit}>
				<h3>ВНИМАНИЕ! Ваш профиль будет удалён навсегда!</h3>
				<label htmlFor="password">Введите пароль для подтверждения:</label>
				<div>
					<input 
						type="password"
						name="password"
						autoComplete="current-password"
						required
						placeholder = "Пароль"

						onChange={(e) => setPassword(e.target.value)}
 					   	value={password}
					/>
					<button type="submit" disabled={loading}>{loading ? 'Удаление...' : 'Удалить'}</button>
				</div>
			</form>

			<button className="closeButton" onClick={onClose}>x</button>
		</div>
		);
};