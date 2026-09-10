-- ============================================
-- HORARIO DE PRUEBA (temporal) — Lunes a Viernes, 9:00 a 17:00, citas de 45 min
-- Reemplazar por el horario real de Rebeca cuando lo confirme.
--
-- Para borrar este horario de prueba más adelante, correr:
--   DELETE FROM horarios_disponibles;
-- y luego insertar el horario real con la misma estructura.
-- ============================================

INSERT INTO horarios_disponibles (dia_semana, hora_inicio, hora_fin, duracion_cita, activo) VALUES
  (1, '09:00', '17:00', 45, true),  -- Lunes
  (2, '09:00', '17:00', 45, true),  -- Martes
  (3, '09:00', '17:00', 45, true),  -- Miércoles
  (4, '09:00', '17:00', 45, true),  -- Jueves
  (5, '09:00', '17:00', 45, true);  -- Viernes
