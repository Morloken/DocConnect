import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Avatar, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../src/axios.jsx';
import LogOutButton from '../src/components/logOutButton.jsx';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 2, borderRadius: '1rem' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Avatar
                src={user.avatarUrl}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.phone ? `Телефон: ${user.phone}` : 'Немає даних'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.address ? `Адреса: ${user.address}` : 'Немає даних'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.services ? `Послуги: ${user.services.join(', ')}` : 'Немає даних'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => navigate('/home')}>
            Повернутися на головну сторінку
          </Button>
          <LogOutButton setUser={setUser} />
        </Box>
      </Card>
    </Container>
  );
};

export default UserProfile;

