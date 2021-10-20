import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import { CSSObject } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface Props {
  sx?: CSSObject;
}

const ResetPassword: FC<Props> = ({ sx }) => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Check_6_Digit_Regx = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value: string) => {
      if (value !== password) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  });

  React.useEffect(() => {
    if (Check_6_Digit_Regx.test(resetCode)) {
      /*if success, go to next step*/
      setStep(3);
    }
  }, [resetCode]);

  return (
    <Box sx={{ ...sx }}>
      {step === 1 && (
        <ValidatorForm
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            setStep(step + 1);
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
          <Box
            sx={{
              mt: 1,
              textAlign: "center",
            }}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setStep(2);
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  textAlign: "center",
                }}
              >
                Already have a reset code?
              </Typography>
            </Link>
          </Box>
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
              Reset Password
            </Button>
          </Box>
        </ValidatorForm>
      )}
      {step === 2 && (
        <ValidatorForm
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            setStep(step + 1);
          }}
        >
          <TextValidator
            fullWidth={true}
            name="reset code"
            label="Reset Code"
            variant="outlined"
            placeholder="6 character reset code from your email"
            value={resetCode}
            validators={["required"]}
            errorMessages={["This field is required"]}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setResetCode(e.currentTarget.value);
            }}
            FormHelperTextProps={{}}
          />
        </ValidatorForm>
      )}
      {step === 3 && (
        <ValidatorForm
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
          }}
        >
          <TextValidator
            fullWidth={true}
            name="password"
            label="New Password"
            variant="outlined"
            type="password"
            value={password}
            validators={["required"]}
            errorMessages={["This field is required"]}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value);
            }}
            FormHelperTextProps={{}}
          />
          <TextValidator
            fullWidth={true}
            name="password"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            validators={["required", "isPasswordMatch"]}
            errorMessages={["This field is required", "password mismatch"]}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            FormHelperTextProps={{}}
            sx={{
              mt: 1,
            }}
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
              Reset Password
            </Button>
          </Box>
        </ValidatorForm>
      )}
    </Box>
  );
};

export default ResetPassword;
