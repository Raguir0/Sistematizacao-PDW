function mostrarPopup(profissional) {
    const popup = document.getElementById("popup");
    const popupImagem = document.getElementById("popup-imagem");
    popupImagem.src = profissional.imagem || "images/default.jpg";
    popupImagem.alt = `Foto de ${profissional.nome}`;

    const popupNome = document.getElementById("popup-nome");
    popupNome.textContent = profissional.nome;
 
    const calendarContainer = document.getElementById("popup-calendar");
    calendarContainer.innerHTML = ""; 
    renderizarCalendario(profissional.disponibilidade, calendarContainer)
    
    popup.style.display = "flex"; 
}

function renderizarCalendario(disponibilidade, container) {
    
    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const calendario = document.createElement("div");
    calendario.classList.add("calendario");
    
    diasSemana.forEach(dia => {
        const diaElemento = document.createElement("div");
        diaElemento.classList.add("dia-semana");
        diaElemento.textContent = dia;

         if (disponibilidade[dia]) {
            diaElemento.classList.add("disponivel");
            diaElemento.addEventListener("click", () => mostrarHorario(dia, disponibilidade[dia])); 
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

document.getElementById("popup").addEventListener("click", (event) => {
    const popupContent = document.querySelector(".popup-content");
    if (!popupContent.contains(event.target)) {
        document.getElementById("popup").style.display = "none";
    }
});