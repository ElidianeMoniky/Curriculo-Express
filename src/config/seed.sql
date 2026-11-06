
-- =========================================
-- CADASTRO DOS DOIS CURRICULOS
-- =========================================

-- 1. CADASTRAR AS PESSOAS

INSERT INTO pessoas (nome, email, telefone, endereco, resumo)
VALUES
(
    'Ana Carolina Silva',
    'ana.silva@email.com',
    '(81) 99999-1111',
    'Recife - PE',
    'Desenvolvedora Front-end com conhecimentos em desenvolvimento web e interfaces responsivas.'
),
(
    'Pedro Henrique Santos',
    'pedro.santos@email.com',
    '(81) 98888-2222',
    'Olinda - PE',
    'Desenvolvedor Back-end com conhecimentos em APIs REST e bancos de dados relacionais.'
)
ON CONFLICT (email) DO NOTHING;


-- 2. FORMACOES ACADEMICAS

INSERT INTO formacoes
(pessoa_id, curso, instituicao, nivel, data_inicio, data_fim, em_andamento, descricao)
SELECT id, 'Analise e Desenvolvimento de Sistemas',
       'Universidade de Pernambuco', 'Graduacao',
       '2023-02-01', NULL, TRUE,
       'Estudos em desenvolvimento de software e tecnologia.'
FROM pessoas WHERE email = 'ana.silva@email.com'
AND NOT EXISTS (
    SELECT 1 FROM formacoes f
    WHERE f.pessoa_id = pessoas.id
    AND f.curso = 'Analise e Desenvolvimento de Sistemas'
);

INSERT INTO formacoes
(pessoa_id, curso, instituicao, nivel, data_inicio, data_fim, em_andamento, descricao)
SELECT id, 'Ciencia da Computacao',
       'Universidade Federal de Pernambuco', 'Graduacao',
       '2022-02-01', NULL, TRUE,
       'Estudos em programacao, algoritmos e banco de dados.'
FROM pessoas WHERE email = 'pedro.santos@email.com'
AND NOT EXISTS (
    SELECT 1 FROM formacoes f
    WHERE f.pessoa_id = pessoas.id
    AND f.curso = 'Ciencia da Computacao'
);


-- 3. EXPERIENCIAS PROFISSIONAIS

INSERT INTO experiencias
(pessoa_id, empresa, cargo, tipo_contrato, local,
 data_inicio, data_fim, atual, descricao)
SELECT id, 'Tech Solutions', 'Estagiaria Front-end',
       'Estagio', 'Recife - PE',
       '2024-01-01', NULL, TRUE,
       'Desenvolvimento de interfaces web utilizando HTML, CSS e JavaScript.'
FROM pessoas WHERE email = 'ana.silva@email.com'
AND NOT EXISTS (
    SELECT 1 FROM experiencias e
    WHERE e.pessoa_id = pessoas.id
    AND e.empresa = 'Tech Solutions'
    AND e.cargo = 'Estagiaria Front-end'
);

INSERT INTO experiencias
(pessoa_id, empresa, cargo, tipo_contrato, local,
 data_inicio, data_fim, atual, descricao)
SELECT id, 'Code Systems', 'Estagiario Back-end',
       'Estagio', 'Recife - PE',
       '2023-06-01', NULL, TRUE,
       'Desenvolvimento de APIs e consultas em bancos PostgreSQL.'
FROM pessoas WHERE email = 'pedro.santos@email.com'
AND NOT EXISTS (
    SELECT 1 FROM experiencias e
    WHERE e.pessoa_id = pessoas.id
    AND e.empresa = 'Code Systems'
    AND e.cargo = 'Estagiario Back-end'
);


-- 4. PROJETOS

INSERT INTO projetos
(pessoa_id, nome, descricao, tecnologias, url_repositorio)
SELECT id, 'Portfolio Pessoal',
       'Site pessoal para apresentar projetos e informacoes profissionais.',
       'HTML, CSS, JavaScript',
       'https://github.com/exemplo/portfolio'
FROM pessoas WHERE email = 'ana.silva@email.com'
AND NOT EXISTS (
    SELECT 1 FROM projetos p
    WHERE p.pessoa_id = pessoas.id
    AND p.nome = 'Portfolio Pessoal'
);

INSERT INTO projetos
(pessoa_id, nome, descricao, tecnologias, url_repositorio)
SELECT id, 'API de Gerenciamento',
       'API REST para gerenciamento de dados e usuarios.',
       'Node.js, Express, PostgreSQL',
       'https://github.com/exemplo/api-gerenciamento'
FROM pessoas WHERE email = 'pedro.santos@email.com'
AND NOT EXISTS (
    SELECT 1 FROM projetos p
    WHERE p.pessoa_id = pessoas.id
    AND p.nome = 'API de Gerenciamento'
);


-- 5. HABILIDADES

INSERT INTO habilidades (pessoa_id, nome, categoria, nivel)
SELECT id, dados.nome, dados.categoria, dados.nivel
FROM pessoas
CROSS JOIN (VALUES
    ('HTML', 'Desenvolvimento Web', 'Avancado'),
    ('CSS', 'Desenvolvimento Web', 'Avancado'),
    ('JavaScript', 'Programacao', 'Intermediario'),
    ('React', 'Framework', 'Intermediario'),
    ('Git e GitHub', 'Ferramentas', 'Intermediario')
) AS dados(nome, categoria, nivel)
WHERE email = 'ana.silva@email.com'
ON CONFLICT (pessoa_id, nome) DO NOTHING;

INSERT INTO habilidades (pessoa_id, nome, categoria, nivel)
SELECT id, dados.nome, dados.categoria, dados.nivel
FROM pessoas
CROSS JOIN (VALUES
    ('Node.js', 'Back-end', 'Avancado'),
    ('Express', 'Framework', 'Intermediario'),
    ('PostgreSQL', 'Banco de dados', 'Intermediario'),
    ('Java', 'Programacao', 'Intermediario'),
    ('Python', 'Programacao', 'Intermediario'),
    ('SQL', 'Banco de dados', 'Avancado')
) AS dados(nome, categoria, nivel)
WHERE email = 'pedro.santos@email.com'
ON CONFLICT (pessoa_id, nome) DO NOTHING;


-- 6. IDIOMAS

INSERT INTO idiomas (pessoa_id, idioma, nivel)
SELECT id, 'Portugues', 'Nativo'
FROM pessoas WHERE email = 'ana.silva@email.com'
ON CONFLICT (pessoa_id, idioma) DO NOTHING;

INSERT INTO idiomas (pessoa_id, idioma, nivel)
SELECT id, 'Ingles', 'Intermediario'
FROM pessoas WHERE email = 'ana.silva@email.com'
ON CONFLICT (pessoa_id, idioma) DO NOTHING;

INSERT INTO idiomas (pessoa_id, idioma, nivel)
SELECT id, 'Portugues', 'Nativo'
FROM pessoas WHERE email = 'pedro.santos@email.com'
ON CONFLICT (pessoa_id, idioma) DO NOTHING;

INSERT INTO idiomas (pessoa_id, idioma, nivel)
SELECT id, 'Ingles', 'Avancado'
FROM pessoas WHERE email = 'pedro.santos@email.com'
ON CONFLICT (pessoa_id, idioma) DO NOTHING;
