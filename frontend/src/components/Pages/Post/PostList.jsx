import { postAPI } from '../../../api/index';
import { Link } from "react-router";
import { useState, useEffect } from 'react';
import "../Home/style.css";


export const PostList = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [list, setList] = useState(null);

	useEffect(() => {

		const fetchList = async () => {
			try {
				setLoading(true);
				const response = await postAPI.getListPosts();
				setList(response.data);
				setError(null);
			} catch (e) {
				console.error('Ошибка при загрузке поста:', e);
				setError('Пост не найден');
			} finally {
				setLoading(false);
			}
		};

		fetchList();
	}, [])

	if (loading) return <div className="message">Загрузка списка публикаций...</div>
	if (error) return <div className="message">{error}</div>
	if (!list) return <div className="message">Публикации не найдены</div>

	return (

		<div id="container">
			<h2 id="lastPub">Последнии публикации</h2>
			{
				list.map(post => (
					<div key={post.id} className="list">
						<Link to={`/posts/${post.id}`}><h3 className="postTitle">{post.title}</h3></Link>
					</div>
				))
			}
		</div>

	);
};