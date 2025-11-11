import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../Context/AuthContext';
import './style.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError('');

    const result = await register(formData);

    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);

      if (result.errors) {
        setErrors(result.errors);
      }
    }

    setLoading(false);
  };

  return (
    <div className="sign">

      <form onSubmit={handleSubmit}>
        <div><h2>Регистрация</h2></div>
        {error && (
          <div>{error}</div>
        )}
        <div>
          <input 
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p>{errors.name[0]}</p>
          )}
        </div>

        <div>
          <input 
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p>{errors.email[0]}</p>
          )}
        </div>

        <div>
          <input 
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p>{errors.password[0]}</p>
          )}
        </div>

        <div>
          <input 
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Повторите пароль"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && (
            <p>{errors.password_confirmation[0]}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </div>
        <div>
          <Link to="/login">
            Уже есть аккаунт? Войдите
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;