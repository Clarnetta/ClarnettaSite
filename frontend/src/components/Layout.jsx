import { Outlet } from "react-router";
import { Header } from "./Header/header";
import { useAuth } from '../Context/AuthContext'

export const Layout = () =>{
	const { user, logout } = useAuth();
	return(
		<div style={{margin:"0 auto"}}>
			<Header />


      		<Outlet/>
		</div>
		);
	
}