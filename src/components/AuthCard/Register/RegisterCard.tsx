import Box from "@material-ui/core/Box";
import React, { FC, useState } from "react";
import { CSSObject } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

interface Props {
  sx?: CSSObject;
}

const RegisterCard: FC<Props> = ({ sx }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value:string) => {
      if (value !== password) {
          return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    }
  })

  return (
    <Box
      sx={{...sx}}
    >
      <ValidatorForm
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}>
          <TextValidator
            fullWidth={true}
            name="firstName"
            label="First Name"
            variant="outlined"
            value={firstName}
            validators={['required']}
            errorMessages={['This field is required']}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setFirstName(e.currentTarget.value);
            }}
            sx={{
            }}
            FormHelperTextProps={{

            }}
          />
          <TextValidator
            fullWidth={true}
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName}
            validators={['required']}
            errorMessages={['This field is required']}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setLastName(e.currentTarget.value);
            }}
            sx={{
            }}
            FormHelperTextProps={{

            }}
          />
        </Box>
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
          sx={{
            mt: 1
          }}
          FormHelperTextProps={{

          }}
        />
        <TextValidator
          fullWidth={true}
          name="password"
          label="Password"
          variant="outlined"
          value={password}
          validators={['required']}
          errorMessages={['This field is required']}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
          sx={{
            mt: 1
          }}
          FormHelperTextProps={{

          }}
        />
        <TextValidator
          fullWidth={true}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          validators={['required', 'isPasswordMatch']}
          errorMessages={['This field is required', 'password mismatch']}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setConfirmPassword(e.currentTarget.value);
          }}
          sx={{
            mt: 1
          }}
          FormHelperTextProps={{

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
            Register
          </Button>
        </Box>
      </ValidatorForm>
    </Box>
  );
};

export default RegisterCard;
