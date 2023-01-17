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
		<Box maxWidth="800px" mx="auto" pt="2rem">

			<Typography variant="h3">Create a Romingo Account</Typography>
			<Typography variant="p">Access account features and keep track of your trips.</Typography>
			<br />
			<br />
			<RegisterCard />
		</Box>
	</Box>)
}