import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { decryptPassword, encryptPassword } from "../common/common";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

function ChangePassword() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const currentDecrypted = decryptPassword(user.password);
    if (data.currentPassword !== currentDecrypted) {
      toast.error("Current password is incorrect");
      return;
    }
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (data.newPassword === currentDecrypted) {
      toast.error("New password cannot be the same as the old password");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/;
    if (!passwordRegex.test(data.newPassword)) {
      toast.error(
        "Password must be 8-32 characters, include uppercase, lowercase, number, and special character"
      );
      return;
    }

    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? { ...u, password: encryptPassword(data.newPassword) }
        : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...user, password: encryptPassword(data.newPassword) })
    );
    toast.success("Password changed successfully");
    setTimeout(() => {
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              type="password"
              label="Current Password"
              fullWidth
              size="small"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
            />
            <TextField
              type="password"
              label="New Password"
              fullWidth
              size="small"
              {...register("newPassword", {
                required: "New password is required",
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            <TextField
              type="password"
              label="Confirm New Password"
              fullWidth
              size="small"
              {...register("confirmNewPassword", {
                required: "Confirm password is required",
              })}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword?.message}
            />
            <Button type="submit" variant="contained" fullWidth>
              Change Password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default ChangePassword;
