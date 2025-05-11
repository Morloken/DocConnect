// // AppointmentDetail.jsx
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Typography, Box, CircularProgress } from '@mui/material';
// import { useNavigate } from 'react-router-dom';


// function AppointmentDetail() {
//   const { id } = useParams();
//   const [appointment, setAppointment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`/api/appointments/${id}`)
//       .then(response => {
//         setAppointment(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching appointment details', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!appointment) {
//     return (
//       <Box sx={{ textAlign: 'center', mt: 5 }}>
//         <Typography variant="h6">Запис не знайдено</Typography>
//         <Button sx={{ mt: 2 }} onClick={() => navigate('/home')}>Назад до головної</Button>
//       </Box>
//     );
//   }

//   const formattedDate = new Date(appointment.appointment_time).toLocaleString();

//   return (
//     <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
//       <Typography variant="h4" gutterBottom>Деталі запису</Typography>

//       <Typography variant="h6" gutterBottom>
//         <strong>Лікар:</strong> {appointment.doctor_id || 'Інформація відсутня'}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//                           <strong>
//                           Дата:</strong>{" "}
//                           {appointment.appointment_time
//                             ? new Date(
//                                 appointment.appointment_time
//                               ).toLocaleDateString()
//                             : "Невідома дата"}
//                           ,
//                           {appointment.appointment_time
//                             ? new Date(
//                                 appointment.appointment_time
//                               ).toLocaleTimeString()
//                             : "Невідомий час"}  
//                         </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Пацієнт:</strong> {appointment.patientName || 'Інформація відсутня'}
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         <strong>Симптоми:</strong> {appointment.symptoms || 'Інформація відсутня'}
//       </Typography>

//       <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate('/home')}>Назад до головної сторінки</Button>
//     </Box>
//   );
// }

// export default AppointmentDetail;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AppointmentDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/appointments/${id}`)
      .then(response => {
        console.log('Appointment data:', response.data); // Лог для перевірки структури даних
        setAppointment(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching appointment details', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!appointment) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">Запис не знайдено</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/home')}>Назад до головної</Button>
      </Box>
    );
  }

  // Логіка форматування дати
  const formattedDate = appointment.appointment_time
    ? new Date(appointment.appointment_time).toLocaleDateString()
    : 'Невідома дата';

  const formattedTime = appointment.appointment_time
    ? new Date(appointment.appointment_time).toLocaleTimeString()
    : 'Невідомий час';

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Деталі запису</Typography>

      <Typography variant="h6" gutterBottom>
        <strong>Лікар:</strong> {appointment.doctor_id ? `Лікар ${appointment.doctor_id}` : 'Інформація відсутня'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Дата:</strong> {formattedDate}, <strong>Час:</strong> {formattedTime}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Пацієнт:</strong> {appointment.patientName || 'Інформація відсутня'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Симптоми:</strong> {appointment.symptoms || 'Інформація відсутня'}
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate('/home')}>Назад до головної сторінки</Button>
    </Box>
  );
}

export default AppointmentDetail;
