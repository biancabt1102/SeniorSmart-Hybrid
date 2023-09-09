export function validarCamposPagamento(
    nomeCartao, 
    numeroCartao, 
    validade, 
    cvv
    ) {
  if (
    nomeCartao.trim() === '' ||
    numeroCartao.trim() === '' ||
    validade.trim() === '' ||
    cvv.trim() === ''
  ) {
    return "Por favor, preencha todos os campos.";
  }

  if (numeroCartao.length !== 19) {
    return "Por favor, digite um número de cartão válido.";
  }

  if (!validade.match(/^\d{2}\/\d{2}$/)) {
    return "Por favor, digite uma data de validade válida (MM/AA).";
  }

  if (cvv.length !== 3) {
    return "Por favor, digite um CVV válido (3 dígitos).";
  }

  if (nomeCartao.length < 3) {
    return "O nome impresso no cartão deve ter mais do que 2 caracteres.";
  }

  return null; // Retorna null se todas as validações passarem
};
