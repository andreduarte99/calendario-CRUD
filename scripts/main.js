const form = document.querySelector(".js-form");
const nomeInput = document.getElementById("name");
const data = document.getElementById("birth-date");
const salvarPessoa = document.getElementById("js-salvar");
const elementosTabela = document.getElementById("elementos-tabela");

let pessoas = [];
let idEdicao = null; // Variável para rastrear qual pessoa está sendo editada

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

  if (idEdicao !== null) {
    // Se estamos editando, atualizamos os valores da pessoa
    pessoas[idEdicao] = dadosDaPessoa;
    idEdicao = null; //Resetamos o modo de edição
  } else {
    //Se estamos adicionando uma nova pessoa
    pessoas.push(dadosDaPessoa);
  }

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
      <button  class="btn-editar"  data-id="${index}" >Editar</button>
      <button  class="btn-excluir" data-id="${index}">Excluir</button>
    </td>
  </tr>`;
  });

  adicionarEventosEdicao();
}

function adicionarEventosEdicao() {
  const botosEditar = document.querySelectorAll(".btn-editar");

  botosEditar.forEach((btn) => {
    btn.addEventListener("click", (evento) => {
      const id = evento.target.getAttribute("data-id");
      console.log(id);
      idEdicao = id; //Salva o índice do item que está sendo editado
      nomeInput.value = pessoas[id].nome;
      data.value = pessoas[id].dataNascimento;
    });
  });
}
