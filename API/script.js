const apiUrl = "http://localhost:3000/profissionais";

async function carregarProfissionais() {
    try {
        const response = await fetch('http://localhost:3000/profissionais');
        const data = await response.json();
        exibirProfissionais(data.profissionais);
    } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
    }
}

function exibirProfissionais(profissionais) {
    const container = document.getElementById("profissionais");
    container.innerHTML = ""; 

    profissionais.forEach(profissional => {
        const article = document.createElement("article");
        article.classList.add("profissional-item");

        article.innerHTML = `
          <img src="${profissional.imagem || "images/default.jpg"}" alt="${profissional.nome}" height="100" width="100">
          <h3>${profissional.nome}</h3>
          <p>${profissional.especialidade}</p>
        `;

        article.querySelector("img").addEventListener("click", () => mostrarPopup(profissional));

        container.appendChild(article);
    });
}

window.onload = carregarProfissionais;

