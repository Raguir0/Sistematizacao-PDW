// Função para mostrar o pop-up
function mostrarPopup(profissional) {
    const popup = document.getElementById("popup");
    //Imagem no pop-up
    const popupImagem = document.getElementById("popup-imagem");
    popupImagem.src = profissional.imagem || "images/default.jpg"; // Imagem padrão se não houver imagem
    popupImagem.alt = `Foto de ${profissional.nome}`;

    //Define o nome no pop-up
    const popupNome = document.getElementById("popup-nome");
    popupNome.textContent = profissional.nome;

    //Renderiza o Calendario
    const calendarContainer = document.getElementById("popup-calendar");
    calendarContainer.innerHTML = ""; // Limpar o calendário anterior
    renderizarCalendario(profissional.disponibilidade, calendarContainer)
    
    popup.style.display = "flex"; //exibir o pop-up
}

function renderizarCalendario(disponibilidade, container) {
    // Dias da semana para referência
    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    // Criar a estrutura do calendário
    const calendario = document.createElement("div");
    calendario.classList.add("calendario");
    
    diasSemana.forEach(dia => {
        const diaElemento = document.createElement("div");
        diaElemento.classList.add("dia-semana");
        diaElemento.textContent = dia;

         // Verificar se o dia está disponível
         if (disponibilidade[dia]) {
            diaElemento.classList.add("disponivel");
            diaElemento.addEventListener("click", () => mostrarHorario(dia, disponibilidade[dia])); // Adicionar funcionalidade de clique
        } else {
            diaElemento.classList.add("indisponivel");
        }

        calendario.appendChild(diaElemento);
    });

    container.appendChild(calendario);
}

function mostrarHorario(dia, horario) {
    const horarioElemento = document.getElementById("horarios-dia");
    horarioElemento.textContent = `${dia}: ${horario}`;
}

// Fechar o pop-up ao clicar fora do conteúdo
document.getElementById("popup").addEventListener("click", (event) => {
    const popupContent = document.querySelector(".popup-content");
    if (!popupContent.contains(event.target)) {
        document.getElementById("popup").style.display = "none";
    }
});