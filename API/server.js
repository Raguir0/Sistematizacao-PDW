const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

let profissionais = [];
try {
  const rawData = fs.readFileSync('dados.json');
  profissionais = JSON.parse(rawData);
} catch (error) {
  console.error("Erro ao carregar o arquivo JSON:", error);
  profissionais = []; 
}

app.get('/', (req, res) => {
  res.send('Bem-vindo à API da CliniStar! Acesse /profissionais para obter os dados.');
});

app.get('/especialidades', (req, res) => {
  try {
    const especialidades = [...new Set(profissionais.map(p => p.especialidade))];
    res.json({ especialidades });
  } catch (error) {
    console.error("Erro ao obter especialidades:", error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

app.get('/profissionais', (req, res) => {
  try {
    const { especialidade, nome } = req.query;
    let resultados = profissionais;

    if (especialidade) {
      resultados = resultados.filter(p => p.especialidade.toLowerCase() === especialidade.toLowerCase());
    }
    if (nome) {
      resultados = resultados.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.json({ profissionais: resultados });
  } catch (error) {
    console.error("Erro ao obter profissionais:", error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});