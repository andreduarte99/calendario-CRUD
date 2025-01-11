const form = document.querySelector(".js-form");
const nomeInput = document.getElementById("name");
const data = document.getElementById("birth-date");
const salvarPessoa = document.getElementById("js-salvar");
const elementosTabela = document.getElementById("elementos-tabela");

let pessoas = [];
try {
  pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
  if (!Array.isArray(pessoas)) {
    pessoas = [];
  }
} catch (error) {
  console.error("Erro ao carregar as pessoas do localStorage:", error);
  pessoas = [];
}

atualizarTabela();

nomeInput.addEventListener("input", () => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿáéíóúàèìòùâêîôûãõäëïöüàáç\s]+$/;
  if (!regex.test(nomeInput.value)) {
    nomeInput.setCustomValidity("O nome do usuário deve conter apenas letras.");
  } else {
    nomeInput.setCustomValidity("");
  }
  nomeInput.reportValidity(); // Mostra a mensagem de validação no momento da digitação
});

salvarPessoa.addEventListener("click", (evento) => {
  evento.preventDefault();

  //Verifique se o formulário é válido
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!nomeInput.value || !data.value) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dadosDaPessoa = { nome: nomeInput.value, dataNascimento: data.value };

  pessoas.push(dadosDaPessoa);
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  nomeInput.value = "";
  data.value = "";

  atualizarTabela();

  console.log("Pessoa salva com sucesso!", pessoas);
});

function atualizarTabela() {
  elementosTabela.innerHTML = "";

  pessoas.forEach((pessoa, index) => {
    elementosTabela.innerHTML += `<tr>
    <td>${pessoa.nome}</td>
    <td>${pessoa.dataNascimento}</td>
    <td>
      <button class="btn-editar" onclick="" data-id="${index}" >Editar</button>
    </td>
    <td>
      <button class="btn-excluir" onclick="">Excluir</button>
    </td>
  </tr>`;
  });
}
