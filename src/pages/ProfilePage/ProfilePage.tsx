import Box from "@mui/material/Box";
import React, { FC, useState, MouseEventHandler, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { CSSObject } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Helmet} from "react-helmet";
import { gql, useQuery } from "@apollo/client";
import { UserProfile, GetReservationDetails } from '../../constants/constants'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { authService } from "../../services/authService.js"
import Navbar from "../../components/Navbar";
import { useHistory } from 'react-router-dom'
import { logoutUser } from "../../store/userReducer";
import { useDispatch } from "react-redux";

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

const ProfilePage: FC<Props> = ({ sx, userInfo, pups = [] }) => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [editProfile, setEditProfile] = useState(false);
  const [editDog, setEditDog] = useState(false);

  const [editDogInfo, setEditDogInfo] = useState<DogInfo>({});

  const [dogName, setDogName] = useState('')


  const handleEditClick: MouseEventHandler<Element> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initData();
    setEditProfile(true);
  };

  const initData = () => {
    setName('');
    setEmail('');
    setPhone('');
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

  const logout = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  const deleteAccount = async () => {
    console.log('delete account')
    const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/user/${authService.getUser().id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
    console.log(result)
    logout()
  }

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
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.target)
          const format = {
            petName: data.get('name'),
            petDescription: `${data.get('gender')}|${data.get('birthday')}|${data.get('weight')}`,
            breedType: data.get('breed')
          }
          console.log(format)
          const result2 =  await fetch(process.env.REACT_APP_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: `
                mutation createUserProfileInput(
                  $userId: String!,
                  $pets: [PetsInput]
                ){
                  createUserProfile(input: { userId: $userId, pets: $pets }) {
                    id
                    email
                    name
                  }
                }
              `,
              variables: {
                userId: authService.getUser().id,
                pets: [format]
              }
            })
          })

          const data2 = await result2.json()
          console.log(data2)
          refetch()
          setEditDog(false)
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
              name="name"
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
                name="gender"
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
              name="birthday"
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
              name="weight"
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
              name="breed"
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

  const { loading, error, data, refetch } = useQuery(
    gql`
      ${UserProfile}
    `,
    {
      variables: {
        email: authService.getUser().email,
        id: authService.getUser().id
      },
    }
  );
  console.log(data)
  console.log(error)

  console.log(authService.getUser().email)

  // useEffect(async () => {
  //   console.log(UserProfile)
  //   const result =  await fetch(process.env.REACT_APP_ENDPOINT, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       query: `${UserProfile}`,
  //       variables: {
  //         email: authService.getUser().email
  //       }
  //     })
  //   })
  //   const data = await result.json()
  //   console.log(data)

  // },[])

  const [trips, setTrips] = useState([])

  useEffect(() => {
    getTrips()
  }, [])

  const getTrips = async () => {
    try {
      const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}v2/user/reservations?email=${authService.getUser().email}&id=${authService.getUser().id}`, {
        method: 'GET'
      })
      const data = await result.json()
      setTrips(data.result)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Helmet>
        <title>Book pet friendly hotels - Romingo</title>
      </Helmet>
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
            px: 0,
            backgroundColor: "info.main",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                mb: 2,
                px: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mr: {
                    xs: 1,
                    sm: 2,
                  },
                }}
              >
                Pups
              </Typography>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                }}
                onClick={(e) => {
                  handleEditDogClick();
                }}
              >
                <AddIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Dog
              </Button>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridAutoFlow: {
                  xs: "column",
                },
                width: "100%",
                overflow: "auto hidden",
                pt: 1,
                pb: 4,
                scrollSnapType: "x",
                justifyContent: "start",
              }}
            >
              {data?.getUserProfile.pets.map((pup, key) => {
                const parts = pup.petDescription.split('|')
                let gender = '';
                let birthday = '';
                let weight = ''
                if (parts.length > 2) {
                  gender = parts[0] == 'on' ? 'F' : 'M'
                  birthday = parts[1]
                  weight = parts[2]
                }
                return (
                  <Box
                    key={key}
                    sx={{
                      width: "250px",
                      mx: 1.5,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: 3,
                        boxShadow: 2,
                        backgroundColor: "white",
                      }}
                    >{/*
                      <Box
                        component="img"
                        src={pup.image}
                        alt="background"
                        draggable="false"
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "150px",
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                      />
                    */}
                      <Box
                        sx={{
                          mt: 0,
                          pt: 1,
                          px: 2,
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            fontSize: "125%",
                            width: "100%",
                            textTransform: "uppercase",
                            borderRadius: "10px",
                            boxShadow: 2,
                            zIndex: 999,
                            background: "white",
                          }}
                        >
                          {pup.petName}
                        </Typography>
                      </Box>
                      <Box sx={{ pt: 1, pb: 0.5, px: 0.5 }}>
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
                            {gender}
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
                            {birthday}
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
                            {weight}lbs
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
                            {pup.breedType}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/*
                    <Box
                      sx={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 3,
                          background: "white",
                        }}
                        onClick={() => handleEditDogClick(key)}
                      >
                        Edit
                      </Button>
                    </Box>
                    */}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                mb: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mr: {
                    xs: 1,
                    sm: 2,
                  },
                }}
              >
                Person
              </Typography>
              {/*
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                }}
                onClick={handleEditClick}
              >
                Edit My Info
              </Button>
             */}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="base">
              Name: {data?.getUserProfile.name || ''}
            </Typography>
            <Typography
              variant="base"
              sx={{
                mt: 1.5,
              }}
            >
              Email:  {data?.getUserProfile.email}
            </Typography>
            {/*
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
              {phone}
            </Typography>
            */}
          </Box>


          <Box>
            <Typography variant="h4">Trips</Typography>

          </Box>


          <Box mt="1rem" >
            <Button sx={{ mr: '0.5rem' }} onClick={() => logout()} variant="contained">Logout</Button>
            <Button onClick={() => deleteAccount()} variant="outlined">Delete Account</Button>
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
            <EditDogModal {...editDogInfo}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;
