const express = require('express');
const sequelize = require('./database'); // Importa a instância do Sequelize
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com dados JSON
app.use(express.json());

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token JWT ausente' });
  }

  // Extrair o token JWT da string "Bearer token"
  const jwtToken = token.split(' ')[1];

  jwt.verify(jwtToken, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Falha na autenticação do token JWT' });
    }

    // Definir o ID do usuário decodificado no objeto req.user
    req.user = { userId: decoded.userId };
    next();
  });
};

// Configuração das rotas de autenticação
app.use('/auth', authRoutes);

// Inicia o servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar-se ao banco de dados:', err);
});
