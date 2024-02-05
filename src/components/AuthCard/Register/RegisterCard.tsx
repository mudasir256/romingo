import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import { CSSObject } from "@mui/material";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { createAccount, addNameToAccount, subscribeToNewsletter } from '../../../services/endpoints'

interface Props {
  sx?: CSSObject;
}

const RegisterCard: FC<Props> = ({ sx }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", () => {
      if (confirmPassword !== password) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [confirmPassword]);

  const registerAccount = async (e: React.SyntheticEvent) => {
    setSuccessMessage('')
    setErrorMessage('')
    const data = await createAccount(email, password, name)
    if (data.data.createUser?.id) {
      subscribeToNewsletter(email)
      const data2 = await addNameToAccount(data.data.createUser.id, name)
      console.log(data2)
      setSuccessMessage('Account created! Please login to your account to access your profile!')
    } else {
      setErrorMessage('We encountered a server error. Please try again or create an account with a different email.')
      //server error or email already exists
    }
  }

  return (
    <Box sx={{ ...sx }}>
      {successMessage && <p style={{ paddingBottom: '1em', color: 'green'}}>{successMessage}</p>}
      {errorMessage && <p style={{ paddingBottom: '1em', color: 'red'}}>{errorMessage}</p>}
      <ValidatorForm onSubmit={registerAccount}>
        <TextValidator
          fullWidth={true}
          name="name"
          label="Full Name"
          variant="outlined"
          value={name}
          validators={["required"]}
          errorMessages={["This field is required"]}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value);
          }}
          sx={{}}
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
          sx={{
            mt: 1,
          }}
          FormHelperTextProps={{}}
        />
        <TextValidator
          fullWidth={true}
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          validators={["required", "minStringLength:8", "maxStringLength:52"]}
          errorMessages={[
            "This field is required",
            "Minimum 8 characters",
            "Maxium 52 characters",
          ]}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
          sx={{
            mt: 1,
          }}
          FormHelperTextProps={{}}
        />
        <TextValidator
          fullWidth={true}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          validators={["required", "isPasswordMatch"]}
          errorMessages={["This field is required", "Password mismatch"]}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setConfirmPassword(e.currentTarget.value);
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
            Register
          </Button>
        </Box>
      </ValidatorForm>
    </Box>
  );
};

export default RegisterCard;
