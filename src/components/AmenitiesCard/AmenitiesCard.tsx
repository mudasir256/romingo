import React, { FC, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import useWindowSize from "../../hooks/UseWindowSize";

interface Props {
	title: string;
	amenities: {
		Code: number;
		Description: string;
		Value: string;
	}[];
	rowNumber?: number;
}

const AmenitiesCard: FC<Props> = ({ title, amenities, rowNumber = 5 }) => {
	const subAmenities = (amenities.length > rowNumber) ? amenities.slice(0, rowNumber) : amenities;

	const [showDialog, setShowDialog] = useState(false);

	const handleClose = () => {
		setShowDialog(false);
	}

	const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

	const size = useWindowSize();

	useEffect(() => {
    if (size.width > 1920) {
			setMaxWidth("xl" as DialogProps['maxWidth']);
    } else if (size.width > 1280) {
			setMaxWidth("lg" as DialogProps['maxWidth']);
    } else if (size.width > 960) {
			setMaxWidth("md" as DialogProps['maxWidth']);
    } else if (size.width > 600) {
			setMaxWidth("sm" as DialogProps['maxWidth']);
    } else {
			setMaxWidth("xs" as DialogProps['maxWidth']);
    }
  }, [size]);

	return (
		<Box
			sx={{
				backgroundColor: "white",
        color: "text.primary",
        borderRadius: 1,
        boxShadow: 4,
        py: 1,
        px: 1,
			}}>
			<Typography
				variant="h6"
				sx={{
					color: "primary.main",
					fontWeight: "bold",
					fontSize: "85%",
					textAlign: "center",
				}}>
				{title}
			</Typography>
			{subAmenities.map((amenity, key) => {
				return (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
						key={key}
					>
						<Check
							sx={{ fontSize: 15, color: "primary.main", mt: 0.4 }}
							/>
						<Typography
							variant="body2"
							sx={{
								fontWeight: "light",
								mt: 0,
								overflow: "hidden",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								textTransform: "capitalize",
								color: "text.primary"
							}}
						>
							{amenity.Description}
						</Typography>
					</Box>
				)
			})}
			<Box sx={{
				py: 0.5,
				textAlign: "center"
			}}>
					<Link href="#" onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					setShowDialog(true);
					console.log('here');
				}}>
					<Typography
						variant="body2"
						sx={{
							fontWeight: "light",
						}}
					>
						View All
					</Typography>
				</Link>
			</Box>
			<Dialog
        open={showDialog}
        keepMounted
        fullWidth
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="amenities-dialog-slide-title"
        aria-describedby="amenities-dialog-slide-description"
      >
        <DialogTitle id="amenities-dialog-slide-title" sx={{
					textAlign: "center"
        }}>{"Amenities"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="amenities-dialog-slide-description">
            {amenities.map((amenity, key) => {
							return (
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										py: 1,
										borderTop: key !== 0 ? "1px solid" : "0"
									}}
									key={key}
								>
									<Check
										sx={{ fontSize: 15, color: "primary.main", mt: 0.4 }}
										/>
									<Typography
										variant="body2"
										sx={{
											fontWeight: "light",
											mt: 0,
											overflow: "hidden",
											color: "text.primary"
										}}
									>
										{amenity.Description}
									</Typography>
								</Box>
							)
						})}
          </DialogContentText>
        </DialogContent>
      </Dialog>
		</Box>
	)
}

export default AmenitiesCard;