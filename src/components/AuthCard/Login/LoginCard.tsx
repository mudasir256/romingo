import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { connect, useStore, useDispatch } from 'react-redux';
import { Dispatch } from "redux"
import { CSSObject } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";

import { authService } from "../../../services/authService";
import { loginUser } from "../../../store/userReducer"

interface Props {
  sx?: CSSObject;
}

interface LoginInfo {
  email: string;
  password: string;
}

const LoginCard: FC<Props> = ({ sx }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch: Dispatch<any> = useDispatch();

  return (
    <Box sx={{ ...sx }}>
      <ValidatorForm
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          dispatch(loginUser({
            email,
            password
          }))
        }}
      >
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
