import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Info() {

  const queryClient = useQueryClient();

  const fetchProfile = async () => {
    const response = await AxiosUserInstanse.get('/Users/profile');
    return response;

  }
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['User'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5
  });

   if(isError) return <Typography component="p" variant="p" color="error">Error: {error?.message || "Failed to load brands"}</Typography>
    if(isLoading) return <CircularProgress/>


  return (
    <Box>
      <Typography>{user.data.fullName}</Typography>
      <Typography>{user.data.email}</Typography>
      <Typography>{user.data.phoneNumber}</Typography>
      <Typography>{user.data.roleName}</Typography>
    </Box>
  )
}
