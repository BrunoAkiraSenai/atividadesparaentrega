console.log("JS CONECTADO!"); // Exibe uma mensagem no console quando o JS é carregado

// Atribui os elementos do formulário às variáveis para fácil manipulação posterior
const formulario = document.getElementById("CadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("pass");
const confirmarSenha = document.getElementById("confirmarpass");
const celular = document.getElementById("tel");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

// Função para exibir mensagens de erro
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem; // Exibe a mensagem de erro no elemento correspondente
};

// Função para verificar se o nome contém apenas letras e espaços
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Regex para validar letras e espaços
  return nomeRegex.test(nome.value); // Retorna true se o nome for válido
};

// Função para verificar se o email é de um domínio permitido (gmail, outlook, hotmail)
const checkEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

// Função para verificar se as senhas coincidem
function checkPasswordMatch() {
  return senha.value === confirmarSenha.value; // Retorna true se as senhas forem iguais
}

// Função para aplicar máscara no RG, permitindo apenas números e formatando o valor
function maskPhoneRg(event) {
  let rg = event.target.value;
  if (/[A-Za-zÀ-ÿ]/.test(rg)) {
    createDisplayMsgError("O rg deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  rg = rg.replace(/\D/g, ""); // Remove os caracteres não numéricos
  if (rg.length > 9) {
    rg = rg.substring(0, 9);
  }

  if (rg.length > 8) {
    rg = rg.replace(/(\d{2})(\d)/, "$1.$2");
    rg = rg.replace(/(\d{3})(\d)/, "$1.$2");
    rg = rg.replace(/(\d{3})(\d{1,2})/, "$1-$2");
  }

  event.target.value = rg;
}

// Função para aplicar máscara no CPF, permitindo apenas números e formatando o valor
function maskPhoneCpf(event) {
  let cpf = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(cpf)) {
    createDisplayMsgError("O cpf deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  cpf = cpf.replace(/\D/g, ""); // Remove os caracteres não numéricos

  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11);
  }

  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  if (cpf.length > 10) {
    cpf = cpf.replace(/[0-9]{3}\.[\d*]{3}\.[\d*]{3}[-]?[0-9]{2}/);
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  }

  event.target.value = cpf;
}

// Função para aplicar máscara no celular, permitindo apenas números e formatando o valor
function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, ""); // Remove os caracteres não numéricos

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  } else if (celular.length > 0) {
    celular = `(${celular}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

// Função para verificar a força da senha
function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(senha)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }
  if (!/\d/.test(senha)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null; // Retorna null se a senha estiver forte
}

// Função para enviar os dados do formulário após a validação
function fetchDatas(event) {
  event.preventDefault(); // Impede o envio do formulário

  if (!checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (celular.value && /[A-Za-zÀ-ÿ]/.test(celular.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  // Cria um objeto com os dados do formulário
  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2)); // Exibe os dados no console
}

// Adiciona um evento de submit no formulário para chamar a função de envio
formulario.addEventListener("submit", fetchDatas);

// Função para gerar "gotas de chuva" (efeito visual na página)
const rainfuction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.querySelector(".container_rain");

  let left = Math.floor(Math.random() * (310 - 65) + 63);
  let duration = Math.random() * 5;

  rain.classList.add("rain");
  cont_rain.appendChild(rain);

  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain.removeChild(rain);
  }, 1500);
};

// Chama a função rainfuction a cada 250ms para gerar as "gotas"
setInterval(() => {
  rainfuction();
}, 250);

// Validações ao digitar nos campos do formulário
nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
  } else {
    createDisplayMsgError("");
  }
});

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayMsgError(checkPasswordStrength(senha.value));
  } else {
    createDisplayMsgError("");
  }
});

celular.addEventListener("input", maskPhoneNumber);
cpf.addEventListener("input", maskPhoneCpf);
rg.addEventListener("input", maskPhoneRg);
