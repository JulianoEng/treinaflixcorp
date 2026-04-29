import { useState } from 'react';

// ─── DADOS MOCK ───────────────────────────────────────────────────────────────

const USERS = [
  { login: 'admin', senha: '1234', tipo: 'admin', nome: 'Administrador Master', empresa: 'TreinaFlix Corp' },
  { login: '123456', senha: '123456', tipo: 'colab', nome: 'Juliano Colaborador', empresa: 'Alpha Engenharia', avatar: 'JL' },
  { login: '654321', senha: '654321', tipo: 'colab', nome: 'Maria Operadora', empresa: 'Beta Clínica', avatar: 'MO' },
];

const CURSOS = [
  {
    id: 'nr35', emoji: '🦺', cor: '#1a0a0a', badge: 'OBRIGATÓRIO', badgeColor: '#e50914',
    titulo: 'NR35 — Trabalho em Altura', duracao: '2h 30min', progresso: 35,
    vence: '5 dias', categoria: 'Segurança',
    desc: 'Treinamento obrigatório para todos que realizem atividades em altura acima de 2 metros.',
    modulos: [
      { tipo: 'video', titulo: 'Introdução à NR35', sub: 'Vídeo · 15min', status: 'done' },
      { tipo: 'video', titulo: 'Riscos em altura', sub: 'Vídeo · 20min', status: 'done' },
      { tipo: 'video', titulo: 'Equipamentos de proteção', sub: 'Vídeo · 25min', status: 'active' },
      { tipo: 'pdf', titulo: 'Material complementar', sub: 'PDF · 10min', status: 'locked' },
      { tipo: 'quiz', titulo: 'Quiz final', sub: '10 questões · Nota mínima 70%', status: 'locked' },
      { tipo: 'cert', titulo: 'Certificado Digital', sub: 'Emitido após aprovação', status: 'locked' },
    ]
  },
  {
    id: 'nr1', emoji: '📋', cor: '#0a0a1a', badge: 'OBRIGATÓRIO', badgeColor: '#e50914',
    titulo: 'NR1 — Integração Geral', duracao: '1h', progresso: 0,
    categoria: 'Integração',
    desc: 'Treinamento de integração obrigatório para todos os novos colaboradores.',
    modulos: [
      { tipo: 'video', titulo: 'Boas-vindas à empresa', sub: 'Vídeo · 10min', status: 'active' },
      { tipo: 'video', titulo: 'Normas e regulamentos', sub: 'Vídeo · 20min', status: 'locked' },
      { tipo: 'pdf', titulo: 'Código de conduta', sub: 'Leitura obrigatória', status: 'locked' },
      { tipo: 'quiz', titulo: 'Quiz de integração', sub: '5 questões', status: 'locked' },
      { tipo: 'cert', titulo: 'Certificado de Integração', sub: 'Emitido após conclusão', status: 'locked' },
    ]
  },
  {
    id: 'lider', emoji: '📊', cor: '#0a0a2a', badge: 'RECOMENDADO', badgeColor: '#0070f3',
    titulo: 'Liderança Situacional', duracao: '3h', progresso: 60,
    categoria: 'Liderança',
    desc: 'Desenvolva habilidades de liderança adaptáveis a diferentes perfis de equipe.',
    modulos: [
      { tipo: 'video', titulo: 'O que é liderança situacional', sub: 'Vídeo · 20min', status: 'done' },
      { tipo: 'video', titulo: 'Os 4 estilos de liderança', sub: 'Vídeo · 30min', status: 'done' },
      { tipo: 'video', titulo: 'Diagnóstico da equipe', sub: 'Vídeo · 25min', status: 'done' },
      { tipo: 'video', titulo: 'Aplicação prática', sub: 'Vídeo · 35min', status: 'active' },
      { tipo: 'quiz', titulo: 'Avaliação final', sub: '15 questões', status: 'locked' },
      { tipo: 'cert', titulo: 'Certificado de Liderança', sub: 'Emitido após aprovação', status: 'locked' },
    ]
  },
  {
    id: 'nr10', emoji: '⚡', cor: '#1a1000', badge: 'NOVO', badgeColor: '#46d369',
    titulo: 'NR10 — Segurança Elétrica', duracao: '4h', progresso: 0,
    categoria: 'Segurança',
    desc: 'Normas de segurança para atividades com instalações e serviços em eletricidade.',
    modulos: [
      { tipo: 'video', titulo: 'Introdução NR10', sub: 'Vídeo · 30min', status: 'active' },
      { tipo: 'video', titulo: 'Riscos elétricos', sub: 'Vídeo · 45min', status: 'locked' },
      { tipo: 'quiz', titulo: 'Quiz NR10', sub: '12 questões', status: 'locked' },
      { tipo: 'cert', titulo: 'Certificado NR10', sub: 'Emitido após aprovação', status: 'locked' },
    ]
  },
  {
    id: 'lgpd', emoji: '🔒', cor: '#0a1a10', badge: 'OBRIGATÓRIO', badgeColor: '#e50914',
    titulo: 'LGPD para Colaboradores', duracao: '1h 30min', progresso: 100,
    categoria: 'Compliance',
    desc: 'Lei Geral de Proteção de Dados — obrigações e boas práticas para todos.',
    modulos: [
      { tipo: 'video', titulo: 'O que é a LGPD', sub: 'Vídeo · 20min', status: 'done' },
      { tipo: 'video', titulo: 'Dados pessoais no trabalho', sub: 'Vídeo · 25min', status: 'done' },
      { tipo: 'quiz', titulo: 'Quiz LGPD', sub: '8 questões', status: 'done' },
      { tipo: 'cert', titulo: 'Certificado LGPD', sub: 'Emitido', status: 'done' },
    ]
  },
  {
    id: 'ia', emoji: '🤖', cor: '#0a0a1a', badge: 'NOVO', badgeColor: '#46d369',
    titulo: 'IA no Ambiente de Trabalho', duracao: '2h', progresso: 0,
    categoria: 'Inovação',
    desc: 'Como utilizar ferramentas de inteligência artificial de forma produtiva e ética.',
    modulos: [
      { tipo: 'video', titulo: 'O que é IA', sub: 'Vídeo · 20min', status: 'active' },
      { tipo: 'video', titulo: 'Ferramentas práticas', sub: 'Vídeo · 40min', status: 'locked' },
      { tipo: 'quiz', titulo: 'Quiz IA', sub: '6 questões', status: 'locked' },
      { tipo: 'cert', titulo: 'Certificado IA', sub: 'Emitido após aprovação', status: 'locked' },
    ]
  },
];

const EMPRESAS = [
  { nome: 'Alpha Engenharia', plano: 'PRO', usuarios: 42, conclusoes: 87, logo: 'AE' },
  { nome: 'Beta Clínica', plano: 'START', usuarios: 18, conclusoes: 34, logo: 'BC' },
  { nome: 'Gamma Foods', plano: 'BUSINESS', usuarios: 133, conclusoes: 210, logo: 'GF' },
  { nome: 'Delta Construções', plano: 'PRO', usuarios: 67, conclusoes: 145, logo: 'DC' },
];

const COLABORADORES = [
  { nome: 'Juliano Colaborador', empresa: 'Alpha Engenharia', curso: 'NR35 Altura', status: 'Em andamento', progresso: 35 },
  { nome: 'Maria Operadora', empresa: 'Beta Clínica', curso: 'NR35 Altura', status: 'Pendente', progresso: 0 },
  { nome: 'Carlos Silva', empresa: 'Gamma Foods', curso: 'LGPD', status: 'Concluído', progresso: 100 },
  { nome: 'Ana Santos', empresa: 'Delta Construções', curso: 'NR1 Integração', status: 'Em andamento', progresso: 50 },
  { nome: 'Pedro Lima', empresa: 'Alpha Engenharia', curso: 'Liderança', status: 'Em andamento', progresso: 60 },
];

// ─── ESTILOS GLOBAIS ──────────────────────────────────────────────────────────

const G = {
  bg: '#080808',
  surface: '#111111',
  card: '#181818',
  border: '#2a2a2a',
  red: '#e50914',
  redHover: '#f40612',
  green: '#46d369',
  blue: '#0070f3',
  amber: '#f5a623',
  text: '#ffffff',
  muted: '#999999',
  font: "'DM Sans', system-ui, sans-serif",
  fontDisplay: "'Bebas Neue', sans-serif",
};

// ─── COMPONENTES UTILITÁRIOS ─────────────────────────────────────────────────

function Badge({ label, color = G.red }) {
  return (
    <span style={{
      background: color, color: '#fff', fontSize: 9, fontWeight: 700,
      padding: '2px 7px', borderRadius: 2, letterSpacing: '0.8px',
    }}>{label}</span>
  );
}

function ProgressBar({ value, height = 3, color = G.red }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, height, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 4, transition: 'width 0.5s' }} />
    </div>
  );
}

function ModuleIcon({ tipo, status }) {
  const icons = { video: '▶', pdf: '📄', quiz: '❓', cert: '🏆' };
  const colors = { done: 'rgba(70,211,105,0.15)', active: 'rgba(229,9,20,0.15)', locked: 'rgba(255,255,255,0.05)' };
  return (
    <div style={{
      width: 34, height: 34, borderRadius: '50%', background: colors[status],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 14, flexShrink: 0,
    }}>{icons[tipo]}</div>
  );
}

// ─── TELA DE LOGIN ────────────────────────────────────────────────────────────

function TelaLogin({ onLogin }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const entrar = () => {
    setErro('');
    setLoading(true);
    setTimeout(() => {
      const u = USERS.find(x => x.login === login && x.senha === senha);
      if (u) { onLogin(u); }
      else { setErro('Login ou senha incorretos.'); setLoading(false); }
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh', background: G.bg, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', fontFamily: G.font,
      backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(229,9,20,0.08) 0%, transparent 60%)',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: G.fontDisplay, fontSize: 38, color: G.red, letterSpacing: 2, marginBottom: 40 }}>
        Treina<span style={{ color: '#fff' }}>Flix</span> Corp
      </div>

      <div style={{
        background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12,
        padding: '40px 36px', width: '100%', maxWidth: 400,
      }}>
        <h2 style={{ color: G.text, fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Entrar na plataforma</h2>
        <p style={{ color: G.muted, fontSize: 13, marginBottom: 28 }}>
          Admin: <code style={{ color: G.red }}>admin / 1234</code> &nbsp;·&nbsp;
          Colaborador: <code style={{ color: G.green }}>123456 / 123456</code>
        </p>

        <label style={{ color: G.muted, fontSize: 12, display: 'block', marginBottom: 6 }}>Login / Matrícula</label>
        <input
          value={login} onChange={e => setLogin(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && entrar()}
          placeholder="admin ou matrícula"
          style={{
            width: '100%', background: '#222', border: `1px solid ${G.border}`, borderRadius: 8,
            padding: '12px 14px', color: G.text, fontSize: 14, marginBottom: 14, outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        <label style={{ color: G.muted, fontSize: 12, display: 'block', marginBottom: 6 }}>Senha</label>
        <input
          type="password" value={senha} onChange={e => setSenha(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && entrar()}
          placeholder="••••••••"
          style={{
            width: '100%', background: '#222', border: `1px solid ${G.border}`, borderRadius: 8,
            padding: '12px 14px', color: G.text, fontSize: 14, marginBottom: 20, outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {erro && <p style={{ color: G.red, fontSize: 13, marginBottom: 14 }}>{erro}</p>}

        <button
          onClick={entrar}
          style={{
            width: '100%', background: G.red, color: '#fff', border: 'none', borderRadius: 8,
            padding: '13px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>

      <p style={{ color: '#444', fontSize: 12, marginTop: 32 }}>
        © 2026 TreinaFlix Corp · treinaflixcorp.com.br
      </p>
    </div>
  );
}

// ─── PAINEL COLABORADOR ───────────────────────────────────────────────────────

function PainelColaborador({ user, onSair }) {
  const [detalhe, setDetalhe] = useState(null);

  const heroFeatured = CURSOS[0];
  const continuar = CURSOS.filter(c => c.progresso > 0 && c.progresso < 100);
  const obrigatorios = CURSOS.filter(c => c.badge === 'OBRIGATÓRIO');
  const novos = CURSOS.filter(c => c.badge === 'NOVO');
  const concluidos = CURSOS.filter(c => c.progresso === 100);

  if (detalhe) {
    return <TelaDetalhe curso={detalhe} onVoltar={() => setDetalhe(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: G.bg, fontFamily: G.font, color: G.text }}>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 60,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.98), transparent)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ fontFamily: G.fontDisplay, fontSize: 26, color: G.red, letterSpacing: 1 }}>
            Treina<span style={{ color: '#fff' }}>Flix</span> Corp
          </div>
          <nav style={{ display: 'flex', gap: 20 }}>
            {['Início', 'Meus Treinamentos', 'Certificados'].map(item => (
              <span key={item} style={{ color: G.muted, fontSize: 13, cursor: 'pointer' }}>{item}</span>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: G.muted, fontSize: 13 }}>{user.nome}</span>
          <div style={{
            width: 34, height: 34, borderRadius: 4, background: G.red,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{user.avatar || user.nome[0]}</div>
          <button onClick={onSair} style={{
            background: 'transparent', border: `1px solid ${G.border}`, color: G.muted,
            fontSize: 12, padding: '5px 12px', borderRadius: 6, cursor: 'pointer',
          }}>Sair</button>
        </div>
      </header>

      {/* Hero */}
      <div style={{
        position: 'relative', height: 320, marginTop: -60, overflow: 'hidden',
        background: `linear-gradient(135deg, ${heroFeatured.cor} 0%, #080808 70%)`,
        display: 'flex', alignItems: 'flex-end', padding: '0 32px 32px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(229,9,20,0.12) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', top: 80, right: 32, fontSize: 100, opacity: 0.08,
        }}>{heroFeatured.emoji}</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Badge label={heroFeatured.badge} color={heroFeatured.badgeColor} />
          <div style={{ fontFamily: G.fontDisplay, fontSize: 44, lineHeight: 1, marginTop: 8, marginBottom: 6 }}>
            {heroFeatured.titulo}
          </div>
          <div style={{ display: 'flex', gap: 16, color: G.muted, fontSize: 13, marginBottom: 6 }}>
            <span>⏱ {heroFeatured.duracao}</span>
            <span>📋 Quiz + Certificado</span>
            {heroFeatured.vence && <span style={{ color: G.amber }}>⚠ Vence em {heroFeatured.vence}</span>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <ProgressBar value={heroFeatured.progresso} height={3} />
            <span style={{ color: G.muted, fontSize: 11, marginTop: 4, display: 'block' }}>
              {heroFeatured.progresso}% concluído
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setDetalhe(heroFeatured)}
              style={{
                background: G.red, color: '#fff', border: 'none', padding: '10px 24px',
                borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>▶ Continuar</button>
            <button style={{
              background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: 6, fontSize: 14, cursor: 'pointer',
            }}>+ Detalhes</button>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 }}>
          <ProgressBar value={heroFeatured.progresso} height={4} />
        </div>
      </div>

      {/* Trilhos */}
      <div style={{ padding: '24px 32px 40px' }}>
        <Trilho titulo="Continuar assistindo" cursos={continuar} onSelect={setDetalhe} />
        <Trilho titulo="Obrigatórios do mês" cursos={obrigatorios} onSelect={setDetalhe} />
        <Trilho titulo="Novos treinamentos" cursos={novos} onSelect={setDetalhe} />
        <Trilho titulo="Concluídos" cursos={concluidos} onSelect={setDetalhe} />
        <Trilho titulo="Todos os treinamentos" cursos={CURSOS} onSelect={setDetalhe} />
      </div>
    </div>
  );
}

function Trilho({ titulo, cursos, onSelect }) {
  if (!cursos.length) return null;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: '#e5e5e5' }}>{titulo}</span>
        <span style={{ fontSize: 12, color: G.red, cursor: 'pointer' }}>Ver tudo</span>
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
        {cursos.map(c => <CardCurso key={c.id} curso={c} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function CardCurso({ curso, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(curso)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0, width: 170, cursor: 'pointer',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.2s', zIndex: hovered ? 2 : 1, position: 'relative',
      }}
    >
      <div style={{
        width: 170, height: 96, borderRadius: 6, background: curso.cor,
        position: 'relative', overflow: 'hidden', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${G.border}`,
      }}>
        <span style={{ fontSize: 36, opacity: 0.7 }}>{curso.emoji}</span>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          padding: '20px 8px 6px', fontSize: 11, fontWeight: 500,
        }}>{curso.titulo.split('—')[0].trim()}</div>
        {curso.progresso > 0 && curso.progresso < 100 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2 }}>
            <ProgressBar value={curso.progresso} height={2} />
          </div>
        )}
        {curso.progresso === 100 && (
          <div style={{
            position: 'absolute', top: 6, right: 6, background: G.green,
            color: '#000', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 2,
          }}>✓ CONCLUÍDO</div>
        )}
        {curso.progresso === 0 && (
          <div style={{ position: 'absolute', top: 6, left: 6 }}>
            <Badge label={curso.badge} color={curso.badgeColor} />
          </div>
        )}
      </div>
      <div style={{ padding: '6px 2px 0', fontSize: 11, color: G.muted, lineHeight: 1.3 }}>
        {curso.categoria} · {curso.duracao}
      </div>
    </div>
  );
}

// ─── TELA DE DETALHE DO CURSO ─────────────────────────────────────────────────

function TelaDetalhe({ curso, onVoltar }) {
  const statusLabel = { done: 'Concluído', active: 'Em andamento', locked: 'Bloqueado' };
  const statusColor = { done: G.green, active: G.red, locked: '#444' };

  return (
    <div style={{ minHeight: '100vh', background: G.bg, fontFamily: G.font, color: G.text }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 32px',
        borderBottom: `1px solid ${G.border}`,
      }}>
        <button onClick={onVoltar} style={{
          background: 'transparent', border: `1px solid ${G.border}`, color: G.muted,
          padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
        }}>← Voltar</button>
        <div style={{ fontFamily: G.fontDisplay, fontSize: 22, color: G.red }}>
          Treina<span style={{ color: '#fff' }}>Flix</span> Corp
        </div>
      </header>

      {/* Hero do curso */}
      <div style={{
        background: `linear-gradient(135deg, ${curso.cor} 0%, #080808 80%)`,
        padding: '40px 32px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 20, right: 40, fontSize: 120, opacity: 0.06 }}>
          {curso.emoji}
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
          <Badge label={curso.badge} color={curso.badgeColor} />
          <h1 style={{ fontFamily: G.fontDisplay, fontSize: 36, margin: '10px 0 8px', lineHeight: 1 }}>
            {curso.titulo}
          </h1>
          <p style={{ color: G.muted, fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>{curso.desc}</p>
          <div style={{ display: 'flex', gap: 20, color: G.muted, fontSize: 13, marginBottom: 16 }}>
            <span>⏱ {curso.duracao}</span>
            <span>📚 {curso.modulos.length} módulos</span>
            <span>🏆 Certificado incluso</span>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: G.muted, marginBottom: 6 }}>
              <span>Progresso geral</span>
              <span style={{ color: G.red, fontWeight: 600 }}>{curso.progresso}%</span>
            </div>
            <ProgressBar value={curso.progresso} height={6} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              background: G.red, color: '#fff', border: 'none', padding: '11px 28px',
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>▶ {curso.progresso > 0 ? 'Continuar' : 'Começar'}</button>
            <button style={{
              background: 'transparent', color: G.muted, border: `1px solid ${G.border}`,
              padding: '11px 20px', borderRadius: 6, fontSize: 14, cursor: 'pointer',
            }}>⬇ Material PDF</button>
          </div>
        </div>
      </div>

      {/* Módulos */}
      <div style={{ padding: '32px', maxWidth: 700 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: G.muted, marginBottom: 16, letterSpacing: '0.5px' }}>
          MÓDULOS DO TREINAMENTO
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {curso.modulos.map((m, i) => (
            <div key={i} style={{
              background: G.card, border: `1px solid ${m.status === 'active' ? G.red : G.border}`,
              borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
              cursor: m.status !== 'locked' ? 'pointer' : 'default',
              opacity: m.status === 'locked' ? 0.5 : 1,
            }}>
              <ModuleIcon tipo={m.tipo} status={m.status} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{m.titulo}</div>
                <div style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>{m.sub}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: statusColor[m.status] }}>
                {statusLabel[m.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAINEL ADMIN ─────────────────────────────────────────────────────────────

function PainelAdmin({ user, onSair }) {
  const [aba, setAba] = useState('dashboard');

  const abas = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'empresas', label: '🏢 Empresas' },
    { id: 'usuarios', label: '👥 Usuários' },
    { id: 'conteudo', label: '➕ Criar Conteúdo' },
    { id: 'relatorios', label: '📈 Relatórios' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: G.bg, fontFamily: G.font, color: G.text, display: 'flex' }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, background: G.surface, borderRight: `1px solid ${G.border}`,
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${G.border}` }}>
          <div style={{ fontFamily: G.fontDisplay, fontSize: 22, color: G.red }}>
            Treina<span style={{ color: '#fff' }}>Flix</span> Corp
          </div>
          <div style={{ fontSize: 10, color: G.muted, marginTop: 2, letterSpacing: '0.5px' }}>PAINEL ADMIN</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {abas.map(a => (
            <button key={a.id} onClick={() => setAba(a.id)} style={{
              width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 6,
              border: 'none', cursor: 'pointer', fontSize: 13, marginBottom: 4,
              background: aba === a.id ? 'rgba(229,9,20,0.15)' : 'transparent',
              color: aba === a.id ? '#fff' : G.muted,
              borderLeft: aba === a.id ? `3px solid ${G.red}` : '3px solid transparent',
            }}>{a.label}</button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: `1px solid ${G.border}` }}>
          <div style={{ fontSize: 13, color: G.muted, marginBottom: 4 }}>{user.nome}</div>
          <button onClick={onSair} style={{
            background: 'transparent', border: `1px solid ${G.border}`, color: G.muted,
            fontSize: 12, padding: '5px 12px', borderRadius: 6, cursor: 'pointer', width: '100%',
          }}>Sair</button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        {aba === 'dashboard' && <AbaDashboard />}
        {aba === 'empresas' && <AbaEmpresas />}
        {aba === 'usuarios' && <AbaUsuarios />}
        {aba === 'conteudo' && <AbaCriarConteudo />}
        {aba === 'relatorios' && <AbaRelatorios />}
      </main>
    </div>
  );
}

function KPI({ label, valor, cor = G.text, sub }) {
  return (
    <div style={{
      background: G.card, border: `1px solid ${G.border}`, borderRadius: 10,
      padding: '20px 24px',
    }}>
      <div style={{ fontSize: 12, color: G.muted, marginBottom: 8, letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 600, color: cor, lineHeight: 1 }}>{valor}</div>
      {sub && <div style={{ fontSize: 11, color: G.muted, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function AbaDashboard() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Dashboard</h2>
      <p style={{ color: G.muted, fontSize: 14, marginBottom: 28 }}>Visão geral da plataforma em tempo real.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <KPI label="EMPRESAS ATIVAS" valor="4" sub="↑ 1 esse mês" />
        <KPI label="USUÁRIOS TOTAIS" valor="260" sub="↑ 18 essa semana" cor={G.blue} />
        <KPI label="CONCLUSÕES HOJE" valor="34" cor={G.green} />
        <KPI label="MRR" valor="R$1.391" sub="↑ 12% vs mês ant." cor={G.amber} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <KPI label="CERTIFICADOS EMITIDOS" valor="476" />
        <KPI label="CURSOS ATIVOS" valor="6" />
        <KPI label="MÉDIA DE NOTAS" valor="8.4" cor={G.green} />
        <KPI label="PENDENTES MÊS" valor="23" cor={G.red} sub="Vencendo em breve" />
      </div>

      {/* Atividade recente */}
      <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: '20px 24px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Atividade recente</h3>
        {[
          { nome: 'Carlos Silva', acao: 'Concluiu LGPD', tempo: '5 min atrás', cor: G.green },
          { nome: 'Ana Santos', acao: '50% em NR1 Integração', tempo: '12 min atrás', cor: G.blue },
          { nome: 'Pedro Lima', acao: 'Iniciou Liderança Situacional', tempo: '34 min atrás', cor: G.muted },
          { nome: 'Maria Operadora', acao: 'Certificado emitido — LGPD', tempo: '1h atrás', cor: G.amber },
        ].map((a, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: i < 3 ? `1px solid ${G.border}` : 'none',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#222',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
              }}>{a.nome[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{a.nome}</div>
                <div style={{ fontSize: 12, color: a.cor }}>{a.acao}</div>
              </div>
            </div>
            <span style={{ fontSize: 11, color: G.muted }}>{a.tempo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AbaEmpresas() {
  const planoColor = { PRO: G.blue, START: G.green, BUSINESS: G.amber, CORPORATE: G.red };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Empresas</h2>
          <p style={{ color: G.muted, fontSize: 14 }}>Gestão de clientes multiempresa.</p>
        </div>
        <button style={{
          background: G.red, color: '#fff', border: 'none', padding: '10px 20px',
          borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>+ Nova empresa</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {EMPRESAS.map((e, i) => (
          <div key={i} style={{
            background: G.card, border: `1px solid ${G.border}`, borderRadius: 10,
            padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8, background: '#222',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: G.muted, flexShrink: 0,
            }}>{e.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{e.nome}</div>
              <div style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>
                {e.usuarios} usuários · {e.conclusoes} conclusões
              </div>
            </div>
            <span style={{
              background: `${planoColor[e.plano]}22`, color: planoColor[e.plano],
              border: `1px solid ${planoColor[e.plano]}44`,
              fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 4, letterSpacing: '0.5px',
            }}>{e.plano}</span>
            <button style={{
              background: 'transparent', border: `1px solid ${G.border}`, color: G.muted,
              padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
            }}>Gerenciar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AbaUsuarios() {
  const statusColor = { 'Concluído': G.green, 'Em andamento': G.blue, 'Pendente': G.amber };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Usuários</h2>
          <p style={{ color: G.muted, fontSize: 14 }}>Progresso dos colaboradores.</p>
        </div>
        <button style={{
          background: G.red, color: '#fff', border: 'none', padding: '10px 20px',
          borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>+ Novo usuário</button>
      </div>
      <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 80px',
          padding: '12px 20px', borderBottom: `1px solid ${G.border}`,
          fontSize: 11, color: G.muted, fontWeight: 600, letterSpacing: '0.5px',
        }}>
          <span>COLABORADOR</span><span>EMPRESA</span><span>TREINAMENTO</span><span>STATUS</span><span>PROG.</span>
        </div>
        {COLABORADORES.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1fr 80px',
            padding: '14px 20px', borderBottom: i < COLABORADORES.length - 1 ? `1px solid ${G.border}` : 'none',
            alignItems: 'center', fontSize: 13,
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', background: '#333',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
              }}>{c.nome[0]}</div>
              <span>{c.nome}</span>
            </div>
            <span style={{ color: G.muted }}>{c.empresa}</span>
            <span>{c.curso}</span>
            <span style={{ color: statusColor[c.status] || G.muted, fontSize: 12 }}>{c.status}</span>
            <div>
              <ProgressBar value={c.progresso} height={4} />
              <span style={{ fontSize: 10, color: G.muted }}>{c.progresso}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AbaCriarConteudo() {
  const [tipo, setTipo] = useState('Treinamento');
  const [modulos, setModulos] = useState({
    video: false, pdf: false, quiz: false, cert: false,
    forms: false, ranking: false, assinatura: false, selfie: false,
  });

  const tipos = ['Treinamento', 'Integração', 'Pesquisa', 'Curso', 'Avaliação', 'Reciclagem', 'Compliance', 'DDS'];
  const toggle = k => setModulos(m => ({ ...m, [k]: !m[k] }));

  const inputStyle = {
    width: '100%', background: '#1a1a1a', border: `1px solid ${G.border}`,
    borderRadius: 6, padding: '10px 14px', color: G.text, fontSize: 13, outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = { fontSize: 12, color: G.muted, display: 'block', marginBottom: 6 };

  return (
    <div style={{ maxWidth: 700 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Criar Conteúdo</h2>
      <p style={{ color: G.muted, fontSize: 14, marginBottom: 28 }}>Configure um novo treinamento ou curso.</p>

      {/* Tipo */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Tipo de conteúdo</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tipos.map(t => (
            <button key={t} onClick={() => setTipo(t)} style={{
              background: tipo === t ? G.red : '#1a1a1a',
              border: `1px solid ${tipo === t ? G.red : G.border}`,
              color: tipo === t ? '#fff' : G.muted,
              padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Campos básicos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Nome do treinamento</label>
          <input style={inputStyle} placeholder="Ex: NR35 — Trabalho em Altura" />
        </div>
        <div>
          <label style={labelStyle}>Categoria</label>
          <input style={inputStyle} placeholder="Ex: Segurança do Trabalho" />
        </div>
        <div>
          <label style={labelStyle}>Setor</label>
          <input style={inputStyle} placeholder="Ex: Operações" />
        </div>
        <div>
          <label style={labelStyle}>Prazo de conclusão</label>
          <input type="date" style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Descrição</label>
        <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }}
          placeholder="Descreva o objetivo do treinamento..." />
      </div>

      {/* Módulos */}
      <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Módulos opcionais</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {Object.entries({
            video: '▶ Vídeo obrigatório', pdf: '📄 PDF obrigatório',
            quiz: '❓ Quiz interno', cert: '🏆 Certificado PDF',
            forms: '📝 Google Forms', ranking: '🏅 Ranking',
            assinatura: '✍️ Assinatura digital', selfie: '📸 Upload selfie',
          }).map(([k, v]) => (
            <label key={k} style={{
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              background: modulos[k] ? 'rgba(229,9,20,0.1)' : '#1a1a1a',
              border: `1px solid ${modulos[k] ? G.red : G.border}`,
              borderRadius: 6, padding: '8px 10px', fontSize: 12, transition: 'all 0.15s',
            }}>
              <input type="checkbox" checked={modulos[k]} onChange={() => toggle(k)}
                style={{ accentColor: G.red }} />
              {v}
            </label>
          ))}
        </div>
      </div>

      <button style={{
        background: G.red, color: '#fff', border: 'none', padding: '12px 28px',
        borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
      }}>Salvar e publicar</button>
    </div>
  );
}

function AbaRelatorios() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Relatórios</h2>
      <p style={{ color: G.muted, fontSize: 14, marginBottom: 28 }}>Analise o desempenho por empresa, curso e período.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        <KPI label="TAXA DE CONCLUSÃO" valor="76%" cor={G.green} sub="Meta: 80%" />
        <KPI label="MÉDIA GERAL" valor="8.4" cor={G.blue} sub="↑ 0.3 vs mês ant." />
        <KPI label="CERTIFICADOS EMITIDOS" valor="476" sub="Este mês: 89" />
      </div>

      <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Conclusões por curso</h3>
        {CURSOS.map((c, i) => {
          const qtd = Math.floor(Math.random() * 80 + 20);
          return (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                <span>{c.titulo}</span>
                <span style={{ color: G.muted }}>{qtd} conclusões</span>
              </div>
              <ProgressBar value={qtd} height={6} color={i % 2 === 0 ? G.red : G.blue} />
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {['Exportar Excel', 'Exportar CSV', 'Exportar PDF'].map(btn => (
          <button key={btn} style={{
            background: 'transparent', border: `1px solid ${G.border}`, color: G.muted,
            padding: '8px 18px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
          }}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────

export default function TreinaFlixCorp() {
  const [user, setUser] = useState(null);

  if (!user) return <TelaLogin onLogin={setUser} />;
  if (user.tipo === 'admin') return <PainelAdmin user={user} onSair={() => setUser(null)} />;
  return <PainelColaborador user={user} onSair={() => setUser(null)} />;
}
