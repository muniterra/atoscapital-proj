function ativarModal(elementoBtn) {
  document.getElementById("modal").classList.add("modal-ativo");
  elementoBtn.classList.add("modal__btn-desativo");
}

function fecharModal(elementoBtn) {
  document.getElementById("modal").classList.remove("modal-ativo");
  elementoBtn.classList.remove("modal__btn-desativo");
}

const elemento = document.querySelector(".modal__btn-editar");

document.getElementById("novoRegistro").addEventListener("click", () => {
        ativarModal(elemento);
});

document.getElementById("fecharModal").addEventListener("click", () => {    
        fecharModal(elemento);
});

document
  .getElementById("cancelarNovoRegistro")
  .addEventListener("click", () => { 
        fecharModal(elemento);
});

export { ativarModal, fecharModal };
