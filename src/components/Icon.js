import { 
	Pool,
	AirportShuttle,
	LocalParking,
	Spa,
	SmokeFree,
	Kitchen,
	Wifi,
	Restaurant,
	FitnessCenter,
	Crib,
	LocalLaundryService,
	Accessible,
	Info,
	LocalBar,
	DryCleaning
}from '@mui/icons-material';

export const validCodes = [
	66,
	71,
	41,
	282,
	68,
	42,
	84,
	312,
	262,
	179,
	259,
	261,
	76,
	48,
	2017,
	168,
	101,
	165,
	96,
]

export default function Icon({ code }) {

	switch (code) {
		case 66:
			return <Pool />
		case 71:
			return <Pool />
		case 41: 
			return <AirportShuttle />
		case 282:
			return <AirportShuttle />
		case 68:
			return <LocalParking />
		case 42:
			return <LocalParking />
		case 84:
			return <Spa />
		case 312:
			return <SmokeFree />
		case 262:
			return <Kitchen />
		case 179:
			return <Wifi />
		case 259:
			return <Wifi />
		case 261:
			return <Wifi />
		case 76:
			return <Restaurant />
		case 48:
			return <FitnessCenter />
		case 2017:
			return <Crib />
		case 168:
			return <LocalLaundryService /> //washer and dryer
		case 101: 
			return <Accessible /> //wheel-chair access
		case 165:
			return <LocalBar />
		case 96:
			return <DryCleaning />
		default:
			return <Info />
	}

	//hot tub x
	// ocean view x
	//air conditioned x 
	//outdoor space x
	//electric car charing station x
}