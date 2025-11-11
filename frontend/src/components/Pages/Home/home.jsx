import { PostList } from '../Post/PostList';
import "./style.css";

export const Home = () => {
	return (
		<div id="generalDiv">
		
			<main className="content">
				<PostList />
			</main>
		</div>
	);
}