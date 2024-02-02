import { useEffect, useState, useRef } from 'react'
import { Box, Typography, Link, Button } from "@mui/material";
import ImageSlider from "../ImageSlider/ImageSlider";
import CardParagraph from "./CardParagraph"

const ReadMore = () => {
	return (
		<Link component="span" sx={{ textDecoration: 'none' }}>
			Read More.
		</Link>
	)
}

const Card = ({ card, hotelUrl, paragraphs }) => {
	const ref = useRef<HTMLDivElement>();

	const [childrenHeights, setChildrenHeights] = useState<number[]>(Array(paragraphs.length).fill(0));
	const [lastParagraphText, setLastParagraphText] = useState<string>(paragraphs[paragraphs.length - 1]);

	const updateHeightsArray = (height: number, index: number) => {
		setChildrenHeights(prev =>
			prev.map((childHeight, i) => i === index ? height : childHeight)
		);
	}

	const reduceLastParagraphText = () => {
		let untilLastWord = lastParagraphText;
		for(let i = 0; i < 20; i++) {
			const lastWordIndex = untilLastWord.lastIndexOf(" ");
			untilLastWord = untilLastWord.substring(0, lastWordIndex);
		}
		setLastParagraphText(untilLastWord);
	}

	useEffect(() => {
		const allContentHeight = childrenHeights.reduce((a,b) => a + b, 0);
		const isOverflowing = ref.current.offsetHeight < allContentHeight;
		if(isOverflowing) reduceLastParagraphText();
	}, [childrenHeights])
	
	return (
		<Box
			sx={{
				display:"flex",
				flexDirection: { xs: "column", md: "row" },
				justifyContent: "justify-between",
				border: "1px solid #ddd",
				borderRadius: '6px',
				height: {xs: 'auto', sm: 'auto', md: "360px" },
			}}
		>
			<Box
				sx={{
					maxWidth: { md: "300px"},
				}}
			>
				<ImageSlider
					images={card?.images}
					name={card?.hotelName}
					height="360px"
					imageCount={10}
					page="listings"
				/>
			</Box>
			<Link
				href={hotelUrl}
				sx={{
					flexGrow: 1,
					py: 1,
					px: 1,
				}}
			>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        hidth: '100%',
                        height: '100%',
                    }}
                >

                    <Typography variant="h6">
                        {card?.hotelName}
                    </Typography>
                    <Box
                        ref={ref}
                        sx={{
                            mb: 1,
                            flexGrow: 1,
                            minHeight: '200px',
                            overflowY: 'hidden',
                        }}
                    >
                        {paragraphs.map((p: string, i: number) => (
                            <CardParagraph 
                                key={i}
                                index={i}
                                text={i === paragraphs.length - 1 
                                    ? (
                                        <Typography component="span">
                                            {`${lastParagraphText}... `}
                                            <ReadMore />
                                        </Typography>
                                    ) : p
                                }
                                onSizeChange={updateHeightsArray}
                            />
                        ))}
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            alignSelf: 'flex-end',
                            marginTop: 'auto'
                        }}
                    >
                        Book Now
                    </Button>
                </Box>
			</Link>
		</Box>
	)
}

export default Card;