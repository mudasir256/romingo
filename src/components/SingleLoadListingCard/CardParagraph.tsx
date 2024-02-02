import { useEffect, useRef } from 'react'
import { Typography } from "@mui/material";

const CardParagraph = ({text, index, onSizeChange}) => {
	const ref = useRef<HTMLParagraphElement>();

	const handleChange = () => {
		const height = ref.current.offsetHeight;
		onSizeChange(height, index);
	}

	useEffect(() => {
		if (!ref.current) return;

		const resizeObserver = new ResizeObserver(handleChange);
		resizeObserver.observe(ref.current);

		return () => resizeObserver.disconnect();
	}, []);

	return (
		<Typography
			ref={ref}
			color="text.primary"
			component="p"
			sx={{
				display: 'block',
				pt: index > 0 ? 1.2 : 0
			}}
		>
			{text}
		</Typography>
	)
}

export default CardParagraph;