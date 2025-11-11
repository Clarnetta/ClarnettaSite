import { Link, Navigate} from 'react-router';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({children}) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div>Загрузка...</div>
		);
	}

	if (!isAuthenticated) {
			return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;