const form = document.querySelector(".js-form");
const nomeInput = document.getElementById("name");
const data = document.getElementById("birth-date");
const salvarPessoa = document.getElementById("js-salvar");

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

nomeInput.addEventListener("input", () => {
  if (!nomeInput.value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ´^~\s]+$/)) {
    nomeInput.setCustomValidity("O nome do usuário deve conter apenas letras.");
  } else {
    nomeInput.setCustomValidity("");
  }
});

salvarPessoa.addEventListener("click", (evento) => {
  evento.preventDefault();

  if (!nomeInput.value || !data.value) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dadosDaPessoa = { nome: nomeInput.value, dataNascimento: data.value };

  pessoas.push(dadosDaPessoa);
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  nomeInput.value = "";
  data.value = "";

  console.log("Pessoa salva com sucesso!", pessoas);
});
