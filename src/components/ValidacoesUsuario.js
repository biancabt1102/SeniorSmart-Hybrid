// Validacoes.js

export function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
  
export function dataValida(data) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(data);
}
  
export function telefoneValido(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
}

export function validarLogin(
  emailUsuario,
  senhaUsuario
) {
  if (!emailUsuario || !senhaUsuario) {
    return "Por favor, preencha todos os campos.";
  }

  if (!emailValido(emailUsuario)) {
    return "Por favor, insira um e-mail válido.";
  }

  if (senhaUsuario.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  return null;
}

export function validarEditarDados(
  nomeUsuario,
  emailUsuario,
  nascimentoUsuario,
  telefoneUsuario
) {
  if (
    !nomeUsuario.trim() ||
    !emailUsuario.trim() ||
    !nascimentoUsuario.trim() ||
    !telefoneUsuario.trim()
  ) {
    return "Por favor, preencha todos os campos.";
  }

  if (!emailValido(emailUsuario)) {
    return "Por favor, digite um e-mail válido.";
  }

  if (!dataValida(nascimentoUsuario)) {
    return "Por favor, digite uma data válida (ano-mês-dia).";
  }

  if (!telefoneValido(telefoneUsuario)) {
    return "Por favor, digite um número de telefone válido (ex: (dd) 12345-8912).";
  }

  if (nomeUsuario.length < 3) {
    return "O nome deve ter mais do que 2 caracteres.";
  }

  return null; // Retorna null se todas as validações passarem
}

  
export function validarCampos(
    nomeUsuario,
    emailUsuario,
    senhaUsuario,
    confirmarSenhaUsuario,
    nascimentoUsuario,
    telefoneUsuario
  ) {
    if (
      !nomeUsuario.trim() ||
      !emailUsuario.trim() ||
      !senhaUsuario.trim() ||
      !confirmarSenhaUsuario.trim() ||
      !nascimentoUsuario.trim() ||
      !telefoneUsuario.trim()
    ) {
      return "Por favor, preencha todos os campos.";
    }
  
    if (!emailValido(emailUsuario)) {
      return "Por favor, digite um e-mail válido.";
    }
  
    if (senhaUsuario.length < 8) {
      return "A senha deve ter no mínimo 8 caracteres.";
    }
  
    if (senhaUsuario !== confirmarSenhaUsuario) {
      return "As senhas não coincidem.";
    }
  
    if (!dataValida(nascimentoUsuario)) {
      return "Por favor, digite uma data válida (ano-mês-dia).";
    }
  
    if (!telefoneValido(telefoneUsuario)) {
      return "Por favor, digite um número de telefone válido (ex: (dd) 12345-8912).";
    }
  
    if (nomeUsuario.length < 3) {
      return "O nome deve ter mais do que 2 caracteres.";
    }
  
    return null; // Retorna null se todas as validações passarem
  }
  