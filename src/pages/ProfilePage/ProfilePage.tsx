import Box from "@material-ui/core/Box";
import React, { FC, useState, MouseEventHandler } from "react";
import { CSSObject } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Navbar from "../../components/Navbar";

interface UserInfo {
  name: string;
  email: string;
  phone: string
}

interface Props {
  sx?: CSSObject;
}

const ProfilePage: FC<Props> = ({ sx }) => {

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "john@email.com",
    phone: "781-244-0115"
  })

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);

  const [editProfile, setEditProfile] = useState(false);

  const handleEditClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initData();
    setEditProfile(true);
  };

  const initData = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }

  const handleClose = () => {
    setEditProfile(false);
  }

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPhone', (value: string) => {
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (phonePattern.test(value))
        return true;
      return false;
    });

    return () => {
      ValidatorForm.removeValidationRule('isPhone');
    }
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            sm: "64px",
            xs: "56px"
          }
        }}
      >
        <Container maxWidth="lg"
          sx={{
            py: 3
          }}
        >
          <Box
            sx={{
              px: {
                sm: 2,
                xs: 0.5
              }
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "120%",
                mb: 2
              }}
            >
              Person
            </Typography>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold"
                }}
              >
                Name
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5
                }}
              >
                {userInfo.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 1.5
                }}
              >
                Email
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5
                }}
              >
                {userInfo.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 1.5
                }}
              >
                Phone
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5
                }}
              >
                {userInfo.phone}
              </Typography>
              <Button 
                variant="contained"
                size="medium"
                color="primary" 
                type="submit"
                sx={{
                  mt: 1.5
                }}
                onClick={handleEditClick}
              >
                Edit My Account
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Dialog
        open={editProfile}
        keepMounted
        fullWidth
        maxWidth={"sm"}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="amenities-dialog-slide-title"
        aria-describedby="amenities-dialog-slide-description"
        sx={{ maxWidth: "xl" }}
      >
        <DialogTitle
          id="amenities-dialog-slide-title"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Edit Your Account
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            px: {
              xs: 1,
              sm: 2.5
            },
          }}
        >
          <DialogContentText id="edit-dialog-slide-description" sx={{py: 1}}>
            <ValidatorForm
              onSubmit={(e) => {
                e.preventDefault();
                setUserInfo({
                  name,
                  email,
                  phone
                });
                handleClose();
              }}
            >
              <TextValidator
                fullWidth={true}
                name="name"
                label="Name"
                variant="outlined"
                value={name}
                validators={['required']}
                errorMessages={['This field is required']}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setName(e.currentTarget.value);
                }}
                FormHelperTextProps={{

                }}
              />
              <TextValidator
                fullWidth={true}
                name="email"
                label="Email Address"
                variant="outlined"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setEmail(e.currentTarget.value);
                }}
                FormHelperTextProps={{

                }}
                sx={{
                  mt: 1
                }}
              />
              <TextValidator
                fullWidth={true}
                name="phone"
                label="Phone Number"
                variant="outlined"
                value={phone}
                validators={['required', 'isPhone']}
                errorMessages={['This field is required', 'Phone number is not valid(xxx-xxx-xxxx)']}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setPhone(e.currentTarget.value);
                }}
                FormHelperTextProps={{

                }}
                sx={{
                  mt: 1
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  textAlign: "center"
                }}
              >
                <Button 
                  variant="contained"
                  size="large"
                  color="primary" 
                  type="submit"
                >
                  Edit Account
                </Button>
              </Box>
            </ValidatorForm>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;
