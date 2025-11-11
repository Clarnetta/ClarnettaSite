import { PostList } from '../Post/PostList';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CreatePost } from './createPost';

import "./style.css";

export const Home = () => {
	const [showQuitWindow, setShowQuitWindow] = useState(false);

	return (
		<div id="generalDiv">
		
			<main className="mainContent">

				<button
					onClick={() => setShowQuitWindow(true)}	
				>Сделать публикацию
				</button>

				{showQuitWindow && createPortal(
					<CreatePost onClose={() => setShowQuitWindow(false)} />,
					document.body
				)}

				<PostList />
			</main>
		</div>
	);
}