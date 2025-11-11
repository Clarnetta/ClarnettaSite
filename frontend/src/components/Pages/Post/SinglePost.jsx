import { useState, useEffect } from 'react';
import { useParams} from 'react-router';
import { postAPI } from '../../../api/index';
import './style.css';

export const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await postAPI.getPost(id);
        setPost(response.data);
        setError(null);
      } catch (e) {
        console.error('Ошибка при загрузке поста:', e);
        setError('Пост не найден');
      } finally {
        setLoading(false);
      }
    };

    fetchPost()
  }, [id])

  if (loading) return <div className="message">Загрузка публикации...</div>
  if (error) return <div className="message">{error}</div>
  if (!post) return <div className="message">Публикация не найден</div>

  return (
    <div id="container">
      <article className="post">
        <h1 className="title">{post.title}</h1>
        <div className="info">
          <span className="author">Автор: {post.author_name}</span>
          <span className="date">Дата: {new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="postContent">
          {post.content}
        </div>
      </article>
    </div>
  );
};