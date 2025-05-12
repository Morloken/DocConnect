
// AppointmentPage.jsx
import { useState } from 'react';
import { Button, TextField, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_time: '',
    symptoms: ''
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const goNext = () => setStep(step + 1);

  const handleSubmit = async () => {
    try {
      // Логування перед відправкою для перевірки даних
      console.log('Form Data перед відправкою:', formData);
  
      // Перевірка формату дати перед відправкою
      const formattedDate = new Date(formData.appointment_time);
      if (isNaN(formattedDate)) {
        throw new Error('Невірний формат дати');
      }
  
      // Надсилання даних на сервер
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/appointments', {
        ...formData,
        appointment_time: formattedDate.toISOString() // Перетворення дати в формат ISO
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert("Запис створено!");
      navigate('/home');
    } catch (error) {
      console.error('Помилка при записі:', error);
      alert("Не вдалося створити запис.");
    }
  };
    // Логування для перевірки токена
    console.log('Token:', localStorage.getItem('token'));
    // Логування для перевірки даних перед відправкою
    console.log('Form Data перед відправкою:', formData);  

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto', color: 'white' }}>
      <Typography variant="h4" gutterBottom>Запис на прийом</Typography>

      {step === 1 && (
        <Box >
          <TextField sx={{  color : 'white' }}
            select
            label="Оберіть лікаря (ID)"
            value={formData.doctor_id}
            onChange={handleChange('doctor_id')}
            fullWidth
            margin="normal"
          >
            {/* ТУТ ПОКИ ЖОРСТКО ЗАШИТО — пізніше можна динамічно підвантажувати */}
            <MenuItem value={1}>Лікар 1 (ID 1)</MenuItem>
            <MenuItem value={2}>Лікар 2 (ID 2)</MenuItem>
            <MenuItem value={3}>Лікар 3 (ID 3)</MenuItem>
          </TextField>
          <Button
            variant="contained"
            disabled={!formData.doctor_id}
            onClick={goNext}
          >
            Далі
          </Button>
        </Box>
      )}

      {step === 2 && (
        <Box>
          <TextField sx={{  color : 'white' }}
            type="datetime-local"
            label="Дата та час прийому"
            InputLabelProps={{ shrink: true }}
            value={formData.appointment_time}
            onChange={handleChange('appointment_time')}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            disabled={!formData.appointment_time}
            onClick={goNext}
          >
            Далі
          </Button>
        </Box>
      )}

      {step === 3 && (
        <Box>
          <TextField
            label="Симптоми"
            value={formData.symptoms}
            onChange={handleChange('symptoms')}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            disabled={!formData.symptoms}
            onClick={handleSubmit}
          >
            Записатись
          </Button>
        </Box>
      )}

      <Button sx={{ mt: 2 }} onClick={() => navigate('/home')}>
        ← Назад до головної
      </Button>
    </Box>
  );
};

export default AppointmentPage;
