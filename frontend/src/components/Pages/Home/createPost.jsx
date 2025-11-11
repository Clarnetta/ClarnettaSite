import { postAPI } from '../../../api/index';
import { useAuth } from '../../../Context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import './postStyle.css';

export const CreatePost = ({ onClose }) => {
	const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const postData = {
            title: title,
            content: text,
            author_name: user?.name
        };

        try {
            const result = await postAPI.postCreate(postData);
            // Переход на страницу созданного поста
            navigate(`/posts/${result.data?.post?.id}`);
        } catch (err) {
            console.log('Full error:', err);
            console.log('Error response:', err.response);
            console.log('Error data:', err.response?.data);
            setError('Ошибка при создании поста!!');
        }
    }

    const handleClose = () => {
        if (onClose) {
            onClose(); // Закрываем модальное окно
        }
    }

    return (
        <div className="divPost">
            <form onSubmit={handleSubmit} className="formPost">
                <div className="h2Post"><h2>Создание публикации</h2></div>
                {error && <div style={{color: 'red'}}>{error}</div>}
                <div>
                    <input 
                    	className="inputPost"
                        name="title"
                        type="text" 
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea 
                    	className="textPost"
                        name="content"
                        placeholder="Текст публикации"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="buttons-container">
                    <button 
                            type="button" 
                            className="cancel-button"
                            onClick={handleClose}
                        >
                            Отмена
                    </button>
                </div>
                <button type="submit" className="submitPost">Создать пост</button>
            </form>
        </div>
    );
}