import React from 'react';
import { Card, CardContent, Typography, Avatar, Divider } from '@mui/material';

export default function UserProfileCard({ user }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Послуги:
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.services ? user.services.join(", ") : 'Немає даних'}
        </Typography>
      </CardContent>
    </Card>
  );
}
