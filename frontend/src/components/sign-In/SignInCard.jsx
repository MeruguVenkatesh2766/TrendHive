import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./forgetPassword";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { userLogin, getUserInfo } from "../../store/slices/userSlice";
import fetchStates from "../../utils/fetchStates";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const prevLocation = useSelector((state) => state.location.prev);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: (values) => {
      const errors = {};

      // Email validation
      if (!values.email) {
        errors.email = {
          type: "required",
          message: "Email is required",
        };
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = {
          type: "pattern",
          message: "Please enter a valid email address",
        };
      }

      // Password validation
      if (!values.password) {
        errors.password = {
          type: "required",
          message: "Password is required",
        };
      } else if (values.password.length < 6) {
        errors.password = {
          type: "minLength",
          message: "Password must be at least 6 characters long",
        };
      }

      return {
        values,
        errors,
      };
    },
  });
  const [open, setOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(fetchStates.idle);
  const [requestMessage, setRequestMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(userLogin(data));
      const result = unwrapResult(actionResult);
      if (result.type === fetchStates.error) {
        setRequestStatus(fetchStates.error);
        setRequestMessage(result.message);
      } else {
        dispatch(getUserInfo(result));
        localStorage.setItem("digiUser", JSON.stringify(result));
        reset();
        if (prevLocation) {
          navigate(`${prevLocation}`);
        } else {
          console.log("prevLocation", prevLocation);
          navigate("/");
        }
      }
    } catch (error) {
      setRequestStatus(fetchStates.error);
      setRequestMessage(error.message);
    }
  };

  return (
    <Card variant="outlined" style={{ height: "100%" }}>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        {requestStatus === fetchStates.error && (
          <Typography variant="danger">{requestMessage}</Typography>
        )}
        <FormControl>
          <FormLabel htmlFor="email" sx={{ textAlign: "left" }}>
            Email
          </FormLabel>
          <TextField
            error={!!errors.email}
            helperText={errors.email?.message}
            id="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={errors.email ? "error" : "primary"}
            {...register("email")}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={errors.password ? "error" : "primary"}
            {...register("password")}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={requestStatus === fetchStates.fetching}
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}
