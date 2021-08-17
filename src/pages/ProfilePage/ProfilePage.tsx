import Box from "@material-ui/core/Box";
import React, { FC, useState, MouseEventHandler } from "react";
import { useTheme } from "@material-ui/core/styles";
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
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import Navbar from "../../components/Navbar";

interface DogInfo {
  name?: string;
  gender?: string;
  birthday?: string;
  weight?: string;
  image?: string;
  breed?: string;
}

interface Props {
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  pups: DogInfo[];
  sx?: CSSObject;
}

const ProfilePage: FC<Props> = ({ sx, userInfo, pups }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);

  const [editProfile, setEditProfile] = useState(false);
  const [editDog, setEditDog] = useState(false);

  const [editDogInfo, setEditDogInfo] = useState<DogInfo>({});

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
  };

  const handleClose = () => {
    setEditProfile(false);
  };

  const handleEditDogClick = (index = -1) => {
    setEditDog(true);
    if (index !== -1) setEditDogInfo(pups[index]);
    else {
      setEditDogInfo({});
    }
  };

  const handleDogClose = () => {
    setEditDog(false);
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPhone", (value: string) => {
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (phonePattern.test(value)) return true;
      return false;
    });

    return () => {
      ValidatorForm.removeValidationRule("isPhone");
    };
  });

  const EditDogModal = (props: DogInfo) => {
    return (
      <ValidatorForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid container>
          <Grid item xs={4} sm={3}>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                height: "100%",
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Name:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7} sm={9}>
            <TextField
              variant="outlined"
              type="text"
              defaultValue={editDogInfo.name}
              fullWidth={true}
              size="medium"
              inputProps={{
                sx: {
                  padding: "10px 10px",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: 1,
          }}
        >
          <Grid item xs={4} sm={3}>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                height: "100%",
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Gender:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7} sm={9}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                }}
              >
                M
              </Typography>
              <Switch
                defaultChecked={props.gender !== "male"}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                }}
              >
                F
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} sm={3}>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                height: "100%",
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Birthday:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7} sm={9}>
            <TextField
              variant="outlined"
              type="date"
              defaultValue={editDogInfo.birthday}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                sx: {
                  padding: "10px 10px",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: 1,
          }}
        >
          <Grid item xs={4} sm={3}>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                height: "100%",
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Weight:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7} sm={9}>
            <TextField
              variant="outlined"
              type="text"
              defaultValue={editDogInfo.weight}
              fullWidth={true}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              }}
              inputProps={{
                sx: {
                  padding: "10px 10px",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: 1,
          }}
        >
          <Grid item xs={4} sm={3}>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                height: "100%",
                px: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mr: 0.5,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                Breed:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7} sm={9}>
            <TextField
              variant="outlined"
              type="text"
              defaultValue={editDogInfo.breed}
              fullWidth={true}
              maxRows={3}
              rows={3}
              multiline
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            sx={{
              mr: 2,
              minWidth: "120px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            sx={{
              minWidth: "120px",
            }}
          >
            Save
          </Button>
        </Box>
      </ValidatorForm>
    );
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: {
            sm: "64px",
            xs: "56px",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            pt: 3,
          }}
        >
          <Box
            sx={{
              px: {
                sm: 2,
                xs: 0.5,
              },
              borderBottom: "1px solid #DDD",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "120%",
                  mr: {
                    xs: 1,
                    sm: 2,
                  },
                }}
              >
                Pups
              </Typography>
              <Button
                size="medium"
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                }}
                onClick={(e) => {
                  handleEditDogClick();
                }}
              >
                <AddIcon />
                Dog
              </Button>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: {
                  xs: "column",
                },
                overflow: "auto hidden",
                pb: 4,
                scrollSnapType: "x",
                justifyContent: "start",
              }}
            >
              {pups.map((pup, key) => {
                return (
                  <Box
                    key={key}
                    sx={{
                      width: "250px",
                      mr: 2,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid #DDDDDD",
                        borderRadius: 1,
                        boxShadow: 2,
                        backgroundColor: "white",
                      }}
                    >
                      <Box
                        component="img"
                        src={pup.image}
                        alt="background"
                        draggable="false"
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "150px",
                          borderRadius: 1,
                        }}
                      />
                      <Box
                        sx={{
                          mt: -2,
                          px: 2,
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "text.secondary",
                            fontSize: "125%",
                            width: "100%",
                            textTransform: "uppercase",
                            border: "1px solid #DDD",
                            borderRadius: "10px",
                            zIndex: 999,
                            background: "white",
                          }}
                        >
                          {pup.name}
                        </Typography>
                      </Box>
                      <Box sx={{ pt: 1 }}>
                        <Box
                          sx={{
                            mb: 1,
                            display: "flex",
                            px: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              mr: 0.5,
                              fontWeight: "bold",
                            }}
                          >
                            Gender:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              textTransform: "capitalize",
                            }}
                          >
                            {pup.gender}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            mb: 1,
                            display: "flex",
                            px: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              mr: 0.5,
                              fontWeight: "bold",
                            }}
                          >
                            Birthday:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              textTransform: "capitalize",
                            }}
                          >
                            {pup.birthday}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            mb: 1,
                            display: "flex",
                            px: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              mr: 0.5,
                              fontWeight: "bold",
                            }}
                          >
                            Weight:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              textTransform: "capitalize",
                            }}
                          >
                            {pup.weight}lbs
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            mb: 1,
                            display: "flex",
                            px: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              mr: 0.5,
                              fontWeight: "bold",
                            }}
                          >
                            Breed:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              textTransform: "capitalize",
                            }}
                          >
                            {pup.breed}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          borderRadius: "10px",
                          background: "white",
                        }}
                        onClick={(e) => handleEditDogClick(key)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            pt: 2,
          }}
        >
          <Box
            sx={{
              px: {
                sm: 2,
                xs: 0.5,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "120%",
                mb: 2,
              }}
            >
              Person
            </Typography>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Name
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                }}
              >
                {userInfo.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 1.5,
                }}
              >
                Email
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                }}
              >
                {userInfo.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 1.5,
                }}
              >
                Phone
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
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
                  my: 1.5,
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
        fullScreen={fullScreen}
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
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
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
              sm: 2.5,
            },
          }}
        >
          <DialogContentText id="edit-dialog-slide-description" sx={{ py: 1 }}>
            <ValidatorForm
              onSubmit={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              <TextValidator
                fullWidth={true}
                name="name"
                label="Name"
                variant="outlined"
                value={name}
                validators={["required"]}
                errorMessages={["This field is required"]}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setName(e.currentTarget.value);
                }}
                FormHelperTextProps={{}}
              />
              <TextValidator
                fullWidth={true}
                name="email"
                label="Email Address"
                variant="outlined"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email is not valid"]}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setEmail(e.currentTarget.value);
                }}
                FormHelperTextProps={{}}
                sx={{
                  mt: 1,
                }}
              />
              <TextValidator
                fullWidth={true}
                name="phone"
                label="Phone Number"
                variant="outlined"
                value={phone}
                validators={["required", "isPhone"]}
                errorMessages={[
                  "This field is required",
                  "Phone number is not valid(xxx-xxx-xxxx)",
                ]}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setPhone(e.currentTarget.value);
                }}
                FormHelperTextProps={{}}
                sx={{
                  mt: 1,
                }}
              />
              <Box
                sx={{
                  mt: 3,
                  textAlign: "center",
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
      <Dialog
        open={editDog}
        keepMounted
        fullWidth
        fullScreen={fullScreen}
        maxWidth={"xs"}
        onClose={handleDogClose}
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
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            {editDogInfo.name ? "Edit Dog" : "Add Dog"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleDogClose}
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
              sm: 2.5,
            },
          }}
        >
          <DialogContentText id="edit-dialog-slide-description" sx={{ py: 1 }}>
            <EditDogModal {...editDogInfo} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;
