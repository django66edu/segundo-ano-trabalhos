const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'mydb',
    port: 3307
});

conexao.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Conectando um banco de dados!');
});

app.use(express.static(__dirname));

// Rota para inserir dados
app.post('/dados', async (req, res) => {
  const { nome_de_usuario, email, idade, senha } = req.body;

  if (!nome_de_usuario || !email || !idade || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    con.query(
      "INSERT INTO usuarios (nome_de_usuario, email, idade, senha) VALUES (?, ?, ?, ?)",
      [nome_de_usuario, email, idade, senhaHash],
      (err, results) => {
        if (err) {
          console.error('Erro na inserção:', err);
          return res.status(500).json({ erro: 'Erro ao inserir dados.' });
        }

        res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: results.insertId });
      }
    );
  } catch (err) {
    console.error('Erro ao hashear senha:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);

});