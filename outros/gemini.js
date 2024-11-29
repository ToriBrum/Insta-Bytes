// Importa as dependências necessárias para o projeto: Express para criar o servidor e a função para conectar ao banco de dados.
import express from 'express';
import conectarAoBanco from './src/src/config/dbConfig.js';

// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente.
// A função `conectarAoBanco` retorna uma conexão com o banco de dados, que é armazenada na constante `conexao`.
const conexao = await conectarAoBanco (process.env.STRING_CONEXAO);

// **Observação:** A partir daqui, os dados seriam buscados do banco de dados. 
// No entanto, para fins de demonstração, um array de posts está sendo utilizado.
// Em um cenário real, este array seria substituído pela busca de dados no banco de dados.

// Array de posts (dados fictícios para demonstração)
const posts = [
    // Cada objeto dentro do array representa um post com suas propriedades: id, descrição e URL da imagem.
    // ... (dados dos posts)
];

// Cria uma instância do Express para criar o servidor.
const app = express();
// Permite que o servidor receba dados no formato JSON.
app.use(express.json());

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Rota para buscar todos os posts.
// **Observação:** A rota abaixo busca os posts do banco de dados.
// A função `getTodosPosts` realiza a consulta ao banco de dados e retorna os resultados.
app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
});

// Função assíncrona para buscar todos os posts no banco de dados.
async function getTodosPosts() {
    // Obtém a referência para o banco de dados e a coleção "posts".
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Realiza a busca em toda a coleção e retorna os resultados como um array.
    return colecao.find().toArray();
}