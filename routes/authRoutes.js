// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token JWT ausente' });
  }

  jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Falha na autenticação do token JWT' });
    }

    req.user = { userId: decoded.userId };
    next();
  });
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/protected', verifyToken, async (req, res) => {
  try {
    // Obter o ID do usuário a partir do token JWT
    const userId = req.user.userId;

    // Consultar o banco de dados para obter informações do usuário com base no ID
    const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email', 'createdAt'] });

    // Verificar se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retornar informações do usuário na resposta
    res.status(200).json({
      message: 'Rota protegida. Apenas usuários autenticados podem acessar.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
