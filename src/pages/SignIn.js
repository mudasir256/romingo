import Navbar from "../components/Navbar";
import LoginCard from "../components/AuthCard/Login/LoginCard";
import {
  Box,
  Typography,
} from "@mui/material";

export default function CreateAccount() {
	return(<Box>
		<Navbar />
		<Box maxWidth="650px" mx="auto" pt="2rem" px="1rem">

			<Typography variant="h4" mb="0.5rem">Login</Typography>
			<Typography variant="p">Access your Romingo rewards, manage your reservations, and receive special deals and offers by booking hotels.</Typography>
			<br />
			<br />
			<LoginCard />
		</Box>
	</Box>)
}