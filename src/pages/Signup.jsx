import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../common/validation";
import { encryptPassword } from "../common/common";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) {
      toast.error("Email already exists");
      return;
    }
    const newUser = {
      ...data,
      password: encryptPassword(data.password),
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Signup
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="First Name"
            fullWidth
            size="small"
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            label="Last Name"
            fullWidth
            size="small"
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            label="Email"
            fullWidth
            size="small"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Mobile Number"
            fullWidth
            size="small"
            margin="normal"
            {...register("mobile")}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            size="small"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            size="small"
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Signup
          </Button>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" variant="body2">
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
