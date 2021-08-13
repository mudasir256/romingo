import Box from "@material-ui/core/Box";
import React, { FC, useState } from "react";
import { CSSObject } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

interface Props {
  sx?: CSSObject;
}

const RegisterCard: FC<Props> = ({ sx }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return (
    <Box sx={{ ...sx }}>
      <ValidatorForm
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
        }}
      >
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
