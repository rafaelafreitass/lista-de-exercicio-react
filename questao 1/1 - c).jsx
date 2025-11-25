import react from 'react';


function DataHoraAtual() {
  const agora = new Date();
  const diassemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado']
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
  const diasemana = diassemana[agora.getDay()]
  const dia = agora.getdate();
  const mes = meses[agora.getMonth()];
  const ano = agora.getFullYear();
  return (
    <h1> Hoje é {diaSemana}, {dia} de {mes} de {ano}</h1>
  );
}
export default DataHoraAtual;