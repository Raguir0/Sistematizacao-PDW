
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".grid-item");
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, index * 700); // Tempo de atraso entre os itens
    });
});
