import { useAuth } from '../../../Context/AuthContext';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckPassword } from './checkPass'
import ProtectedRoute from '../../ProtectedRoute';
import './style.css';


const Profile = () => {
	const { user, logout, deleteAccount } = useAuth();
	const [showQuitWindow, setShowQuitWindow] = useState(false);


	return(

		<ProtectedRoute>
			<div className="container">
				<div className="content">
					<h1 >Профиль</h1>
					<p >Добро пожаловать, {user?.name}!</p>
					<p >Электронная почта: {user?.email}</p>
					<p >ID: {user?.id}</p>

					<div  className="buttons">
						<button
							id="quitButton"
							onClick={logout}

						>Выйти</button>

						<button
							id='deleteButton'
							onClick={() => setShowQuitWindow(true)}	
						>Удалить аккаунт</button>
					</div>


					{showQuitWindow && createPortal(
						<CheckPassword onClose={() => setShowQuitWindow(false)} />,
						document.body
					)}
				</div>
			</div>
		</ProtectedRoute>

	);
};

export default Profile;