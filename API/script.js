const apiUrl = "http://localhost:3000/profissionais";

// Função para carregar os dados da API
async function carregarProfissionais() {
    try {
        const response = await fetch('http://localhost:3000/profissionais');
        const data = await response.json();
        exibirProfissionais(data.profissionais);
    } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
    }
}

// Função para exibir os profissionais no HTML
function exibirProfissionais(profissionais) {
    const container = document.getElementById("profissionais");
    container.innerHTML = ""; // Limpar o conteúdo anterior

    profissionais.forEach(profissional => {
        const article = document.createElement("article");
        article.classList.add("profissional-item");

        article.innerHTML = `
          <img src="${profissional.imagem || "images/default.jpg"}" alt="${profissional.nome}" height="100" width="100">
          <h3>${profissional.nome}</h3>
          <p>${profissional.especialidade}</p>
        `;

        // Adiciona evento de clique na imagem para abrir o pop-up
        article.querySelector("img").addEventListener("click", () => mostrarPopup(profissional));

        container.appendChild(article);
    });
}
// Carregar os profissionais ao carregar a página
window.onload = carregarProfissionais;

