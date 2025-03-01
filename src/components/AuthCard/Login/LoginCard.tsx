import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { CSSObject } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../store/userReducer";

interface Props {
  sx?: CSSObject;
}

const LoginCard: FC<Props> = ({ sx, handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate()

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result =  await fetch(process.env.REACT_APP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query CreateUserInput(
            $email: String!,
            $password: String!
          ){
            loginUser(input: { email: $email, password: $password }) {
              id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      })
    })
    const data = await result.json()
    console.log(data)

    if (data.data?.loginUser?.id === 'not found') {
      setError("Email/password are incorrect.")
      return
    }
    if (data.data?.loginUser === null) {
      setError("Email/password are incorrect.")
      return 
    }

    dispatch(
      loginUser({
        email: data.data.loginUser.email,
        id: data.data.loginUser.id
      })
    );
    navigate('/profile')
  }

  return (
    <Box sx={{ ...sx }}>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ValidatorForm onSubmit={login}>
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
        />
        <TextValidator
          fullWidth={true}
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          validators={["required"]}
          errorMessages={["This field is required"]}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
          sx={{
            mt: 1,
          }}
          FormHelperTextProps={{}}
        />
        <Box
          sx={{
            mt: 1,
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </Box>
      </ValidatorForm>
    </Box>
  );
};

export default LoginCard;
