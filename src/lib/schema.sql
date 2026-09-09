-- ============================================
-- SCHEMA — Neon Postgres
-- Proyecto: Rebeca Velásquez, Psicóloga Clínica (Nivel 3)
-- ============================================

CREATE TABLE horarios_disponibles (
  id SERIAL PRIMARY KEY,
  dia_semana INT NOT NULL,          -- 0=domingo ... 6=sábado
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  duracion_cita INT DEFAULT 45,     -- minutos
  activo BOOLEAN DEFAULT true
);

CREATE TABLE citas (
  id SERIAL PRIMARY KEY,
  nombre_paciente VARCHAR(150) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(150),
  motivo VARCHAR(100),              -- 'ansiedad' | 'depresion' | 'estres' | 'procesos_salud' | 'adaptacion' | 'pareja' | 'primera_vez' | 'otro'
  primera_vez BOOLEAN DEFAULT false,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente',  -- 'pendiente' | 'confirmada' | 'cancelada'
  respuestas_formulario JSONB,      -- respuestas del formulario de admisión (flexible, ver tabla preguntas_formulario)
  nota_admin VARCHAR(500),          -- nota opcional de Rebeca al confirmar/reagendar (ej. proponer otro horario)
  email_enviado BOOLEAN DEFAULT false,
  whatsapp_enviado BOOLEAN DEFAULT false,  -- reservado para Fase 2 (WhatsApp API)
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Preguntas del formulario de admisión, 100% editables desde el panel admin
-- sin necesidad de migrar la base de datos ni tocar código.
CREATE TABLE preguntas_formulario (
  id SERIAL PRIMARY KEY,
  clave VARCHAR(50) UNIQUE NOT NULL,   -- identificador estable, ej: 'terapia_previa'
  etiqueta VARCHAR(300) NOT NULL,      -- texto de la pregunta mostrado al paciente
  tipo VARCHAR(20) NOT NULL,           -- 'texto_corto' | 'texto_largo' | 'si_no' | 'seleccion'
  opciones JSONB,                       -- solo si tipo = 'seleccion', ej: ["Ansiedad","Depresión"]
  obligatorio BOOLEAN DEFAULT false,
  orden INT DEFAULT 0,
  activo BOOLEAN DEFAULT true
);

-- Preguntas iniciales sugeridas (Rebeca puede editar/agregar/desactivar después)
INSERT INTO preguntas_formulario (clave, etiqueta, tipo, obligatorio, orden) VALUES
  ('motivo_consulta', '¿Qué te gustaría trabajar en terapia?', 'texto_largo', true, 1),
  ('terapia_previa', '¿Has asistido a terapia psicológica antes?', 'si_no', false, 2),
  ('medicacion', '¿Actualmente tomas alguna medicación relacionada con salud mental?', 'si_no', false, 3);

CREATE TABLE bloqueos (
  id SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  motivo VARCHAR(200)
);

-- Videos de Instagram/TikTok — Rebeca los gestiona desde el panel admin
-- sin tocar código; solo pega la URL y el sistema genera el embed.
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(500) NOT NULL,
  plataforma VARCHAR(20) NOT NULL,  -- 'instagram' | 'tiktok'
  titulo VARCHAR(200),
  miniatura_url VARCHAR(500),       -- Cloudinary, opcional (thumbnail manual si el embed no trae uno)
  orden INT DEFAULT 0,              -- para controlar el orden en el grid
  activo BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT NOW()
);

-- Índices para las consultas más frecuentes (evitar doble reserva, panel admin)
CREATE INDEX idx_citas_fecha ON citas(fecha);
CREATE INDEX idx_citas_estado ON citas(estado);
CREATE INDEX idx_bloqueos_fecha ON bloqueos(fecha);
CREATE INDEX idx_videos_activo_orden ON videos(activo, orden);
CREATE INDEX idx_preguntas_activo_orden ON preguntas_formulario(activo, orden);
