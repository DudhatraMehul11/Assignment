import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { toast } from 'react-toastify';

function EditProfile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    }
  });

  const onSubmit = (data) => {
    const emailExists = users.some(u => u.email === data.email && u.email !== user.email);
    if (emailExists) {
      toast.error('Email already exists');
      return;
    }
    const updatedUsers = users.map(u => u.email === user.email ? { ...u, ...data } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify({ ...user, ...data }));
    toast.success("Profile updated successfully")
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              fullWidth
              size="small"
              {...register('firstName', { required: 'First Name is required' })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Last Name"
              fullWidth
              size="small"
              {...register('lastName', { required: 'Last Name is required' })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <TextField
              label="Email"
              fullWidth
              size="small"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Mobile"
              fullWidth
              size="small"
              {...register('mobile', { required: 'Mobile is required' })}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
            <Button type="submit" variant="contained" fullWidth>
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default EditProfile;
