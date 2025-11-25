import React from 'react';
import './App.css';

function SaudacaoComandante({ nomeComandante }) {
  return <h1 className="titulo-comandante">Bem-vindo(a) ao painel, Comandante {nomeComandante}!</h1>;
}

function DataGalactica({ nomePlaneta }) {
  const agora = new Date();
  const anoGalactico = agora.getFullYear() + 738;
  const cicloLunar = Math.floor((agora.getDate() * 2) / 3);
  const horaFormatada = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="caixa">
      <h3>Data Estelar - {nomePlaneta}</h3>
      <p>Ano Galáctico: {anoGalactico}</p>
      <p>Ciclo Lunar: {cicloLunar}</p>
      <p>Horário Sincronizado: {horaFormatada}</p>
    </div>
  );
}

function StatusMissao({ distanciaPercorrida, distanciaTotal }) {
  const progresso = Math.min((distanciaPercorrida / distanciaTotal) * 100, 100);
  const corBarra = progresso < 40 ? '#d0021b' : progresso < 80 ? '#f5a623' : '#7ed321';

  return (
    <div>
      <h2>Status da Missão: {distanciaPercorrida} / {distanciaTotal} Parsecs</h2>
      <div className="status-bar">
        <div className="status-preenchido" style={{ width: `${progresso}%`, backgroundColor: corBarra }} />
      </div>
      <p style={{ textAlign: 'center', marginTop: '5px' }}>{progresso.toFixed(1)}% Completo</p>
    </div>
  );
}

function InfoPlaneta({ planeta }) {
  const icones = { desértico: '🏜️', gelado: '❄️', temperado: '🌍', gasoso: '☁️' };
  const icone = icones[planeta.clima.toLowerCase()] || '❓';

  return (
    <div className="caixa">
      <h2>Planeta de Destino: {planeta.nome} {icone}</h2>
      <p><strong>Temperatura Média:</strong> {planeta.temperatura}°C</p>
      <p><strong>Gravidade:</strong> {planeta.gravidade} G</p>
      <p><strong>Descrição:</strong> {planeta.descricao}</p>
    </div>
  );
}

function PrevisaoEspacial({ previsao }) {
  const icones = { calmo: '🌌', 'tempestade solar': '☀️', 'chuva de meteoros': '☄️', 'nebulosa densa': '🌫️' };
  const icone = icones[previsao.clima.toLowerCase()] || '✨';

  return (
    <div className="caixa">
      <h3>Previsão do Tempo Espacial {icone}</h3>
      <p><strong>Clima:</strong> {previsao.clima}</p>
      <p><strong>Umidade Solar:</strong> {previsao.umidadeSolar}%</p>
      <p><strong>Radiação Cósmica:</strong> {previsao.radiacaoCosmica} mSv</p>
    </div>
  );
}

function RelatorioBordo({ eventos }) {
  return (
    <div>
      <h2>Relatório de Bordo</h2>
      <ol className="relatorio">
        {eventos.map((evento, index) => <li key={index}>{evento}</li>)}
      </ol>
    </div>
  );
}

export default function DashboardEspacial() {
  const dadosMissao = {
    comandante: 'Victor',
    planetaDestino: {
      nome: 'Kepler',
      clima: 'Temperado',
      temperatura: '22',
      gravidade: '1.1',
      descricao: 'Um exoplaneta potencialmente habitável, conhecido por sua vegetação avermelhada.'
    },
    status: { distanciaPercorrida: 873, distanciaTotal: 1200 },
    previsao: { clima: 'Tempestade Solar', umidadeSolar: 88, radiacaoCosmica: 4.5 },
    relatorio: [
      'Decolagem bem-sucedida da Estação Orbital.',
      'Primeiro salto hiperespacial concluído.',
      'Desvio de rota para evitar campo de asteroides.',
      'Coleta de amostras de poeira cósmica.'
    ]
  };

  return (
    <div className="dashboard">
      <header>
        <SaudacaoComandante nomeComandante={dadosMissao.comandante} />
      </header>
      <main style={{ display: 'grid', gap: '20px' }}>
        <StatusMissao {...dadosMissao.status} />
        <div className="grid-flex">
          <div className="coluna"><InfoPlaneta planeta={dadosMissao.planetaDestino} /></div>
          <div className="coluna"><PrevisaoEspacial previsao={dadosMissao.previsao} /></div>
        </div>
        <div className="grid-flex">
          <div className="coluna"><RelatorioBordo eventos={dadosMissao.relatorio} /></div>
          <div className="coluna"><DataGalactica nomePlaneta={dadosMissao.planetaDestino.nome} /></div>
        </div>
      </main>
    </div>
  );
}
