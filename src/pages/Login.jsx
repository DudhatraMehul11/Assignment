import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { decryptPassword } from "../common/common";
import { toast } from "react-toastify";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === data.email);
    if (!user) {
      toast.error("Email does not exist");
      return;
    }
    const decryptedPassword = decryptPassword(user.password);
    if (data.password !== decryptedPassword) {
      toast.error("Incorrect password");
      return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/products");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            size="small"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              sx: {
                height: 40,
                paddingY: 0,
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              sx: {
                height: 40,
                paddingY: 0,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Login
          </Button>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/signup" variant="body2">
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
