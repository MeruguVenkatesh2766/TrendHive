import React, { useState } from 'react';
import { Box, Stack,FormControl, Button, TextField, InputAdornment } from '@mui/material';

export default function MultiStepSignUp() {
  const [currentStep, setCurrentStep] = useState(3);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    rePassword: '',
    mobileNumber: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSignUp = () => {
    console.log('Form Submitted:', formData);
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
      if (!formData.dob || new Date(formData.dob) >= new Date())
        newErrors.dob = 'Date of Birth must be before today.';
    } else if (step === 2) {
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = 'Please enter a valid email address.';
      if (!formData.password || formData.password.length < 6)
        newErrors.password = 'Password must be at least 6 characters long.';
      if (formData.password !== formData.rePassword)
        newErrors.rePassword = 'Passwords do not match.';
    } else if (step === 3) {
      if (!formData.mobileNumber || formData.mobileNumber.length !== 10)
        newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }
    return newErrors;
  };

  const sendOtp = () => {
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      setErrors({ mobileNumber: 'Enter a valid 10-digit mobile number.' });
      return;
    }

    console.log(`OTP sent to ${formData.mobileNumber}`);
    setIsOtpSent(true);
    setErrors({});

    if (otpAttempts >= 3) {
      setOtpAttempts(0);
    }
  };

  const verifyOtp = () => {
    if (formData.otp === '123456') {
      setIsVerified(true);
      setErrors({});
      console.log('OTP Verified');
    } else if(formData.otp ==='' || !formData.otp){
        setErrors({ otp: 'Enter a valid OTP' });
    }else {
      setOtpAttempts((prev) => prev + 1);
      setErrors({ otp: 'Invalid OTP. Please try again.' });

      if (otpAttempts + 1 >= 3) {
        setIsOtpSent(false);
      }
    }
  };
  console.log('otpAttempts',otpAttempts)
  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', mt: 4 }}>
      {currentStep === 1 && (
        <Box>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button variant="text" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Stack>
        </Box>
      )}

      {currentStep === 2 && (
        <Box>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              label="Re-enter Password"
              type="password"
              value={formData.rePassword}
              onChange={(e) => setFormData({ ...formData, rePassword: e.target.value })}
              error={!!errors.rePassword}
              helperText={errors.rePassword}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button variant="text" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Stack>
        </Box>
      )}

      {currentStep === 3 && (
        <Box>
          <Stack spacing={2}>
          <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
                label="Mobile Number"
                type="text"
                value={formData.mobileNumber}
                disabled={isVerified}
                onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })
                }
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    +91
                    </InputAdornment>
                ),
                }}
                sx={{
                    flex: 1, 
                    paddingRight: 0, 
                    }}
            />
            <Button
                variant="contained"
                
                onClick={sendOtp}
                disabled={isOtpSent}
                
                sx={{
                marginLeft: 1, 
                height: '100%', 
                }}
            >
                {otpAttempts >= 3 ? 'Resend OTP' : !isOtpSent  ? 'Send OTP': "Sended OTP"}
            </Button>
            </FormControl>
            <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField
                    label="OTP"
                    type="text"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    error={!!errors.otp}
                    helperText={errors.otp}
                    disabled={isVerified}
                    sx={{
                    flex: 1, 
                    paddingRight: 0, 
                    }}
                />
                <Button
                    variant="contained"
                    onClick={verifyOtp}
                    disabled={isVerified}
                    sx={{
                        marginLeft: 1, 
                        height: '100%', 
                        }}
                >
                    Submit OTP
                </Button>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button variant="text" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleSignUp}
                disabled={!isVerified}
              >
                Sign Up
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
