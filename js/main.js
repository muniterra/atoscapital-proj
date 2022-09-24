import { ativarModal, fecharModal } from "./modal.js";

function renderizarTabela(dados) {
  dados.forEach((dado) => {
    dadosTabela += `
                <tr class="tabela__linha">
                    <td class="tabela__dado" id="dadoID">${dado.id}</td>
                    <td class="tabela__dado" id="dadoNome">${dado.name}</td>
                    <td class="tabela__dado" id="dadoEmail">${dado.email}</td>
                    <td class="tabela__dado">
                        <button class="tabela__btn" id="editarBtn" type="button">Editar</button>
                        <button class="tabela__btn" id="excluirBtn" type="button">Excluir</button>
                    </td>
                </tr>
            `;
    corpoTabela.innerHTML = dadosTabela;
  });
}

const apiUrl = "https://gorest.co.in/public/v2/users";
const accessToken =
  "?access-token=a83fc3b79cb476272dabc5ad63abbe8ae99b0f5e6ee1ab71eef854f474fd968b";

const corpoTabela = document.getElementById("corpoTabela");
let dadosTabela = "";

const valueInputNome = document.getElementById("inputNome");
const valueInputEmail = document.getElementById("inputEmail");

//-----GET-READ----:
fetch(apiUrl + accessToken)
  .then((resposta) => resposta.json())
  .then((dados) => renderizarTabela(dados));

//
corpoTabela.addEventListener("click", (e) => {
  let btnExcluirPressionado = e.target.id === "excluirBtn";
  let btnEditarPressionado = e.target.id === "editarBtn";
  const id = e.target.parentElement.parentElement.children.dadoID.textContent;

  //-----DELETE----:
  if (btnExcluirPressionado) {
    fetch(`${apiUrl}/${id}/${accessToken}`, {
      method: "DELETE",
    })
      .then((resposta) => resposta.JSON)
      .then(() => location.reload());
  }
  //-----PUSH-UPDATE----:
  if (btnEditarPressionado) {
    let elemento = document.querySelector(".modal__btn-novo");
    ativarModal(elemento);
    valueInputNome.value =
      e.target.parentElement.parentElement.children.dadoNome.textContent;
    valueInputEmail.value =
      e.target.parentElement.parentElement.children.dadoEmail.textContent;

    const btnEditar = document.getElementById("postEditarRegistro");
    btnEditar.addEventListener("click", () => {
      fetch(`${apiUrl}/${id}/${accessToken}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: valueInputNome.value,
          email: valueInputEmail.value,
          gender: "male",
          status: "active",
        }),
      })
      .then(resposta => resposta.json())
      .then(() => location.reload())
    });
  }
});

//-----POST-CREATE----:
const btnNovoRegistro = document.getElementById("postNovoRegistro");
btnNovoRegistro.addEventListener("click", () => {
  fetch(apiUrl + accessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: valueInputNome.value,
      email: valueInputEmail.value,
      gender: "male",
      status: "active",
    }),
  })
    .then((resposta) => resposta.json())
    .then((dado) => {
      renderizarTabela([dado]);
    });

  fecharModal(document.querySelector(".modal__btn-editar"));
});
