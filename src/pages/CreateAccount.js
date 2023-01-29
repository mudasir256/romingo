import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterCard from "../components/AuthCard/Register";
import {
  Box,
  Typography,
} from "@mui/material";
export default function CreateAccount() {
	return(<Box>
		<Navbar />
		<Box maxWidth="650px" mx="auto" pt="2rem">

			<Typography variant="h4">Register</Typography>
			<Typography variant="p">Create an account with Romingo to earn rewards, manage reservations, and receive special deals and offers.</Typography>
			<br />
			<br />
			<RegisterCard />
		</Box>
	</Box>)
}