// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Відсутній токен авторизації' });
  }

  try {
    const decoded = jwt.verify(token, 'secret-key');
    req.userId = decoded.id; // Зберігаємо ID користувача в запиті
    next(); // Переходимо до наступного маршруту
  } catch (error) {
    res.status(401).json({ message: 'Невірний або прострочений токен' });
  }
};

module.exports = authenticate;