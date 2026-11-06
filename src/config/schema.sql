
-- =========================================
-- BANCO DE DADOS: API DE CURRICULOS
-- =========================================

-- 1. TABELA DE PESSOAS
CREATE TABLE IF NOT EXISTS pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    resumo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. FORMACOES ACADEMICAS
CREATE TABLE IF NOT EXISTS formacoes (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER NOT NULL,
    curso VARCHAR(150) NOT NULL,
    instituicao VARCHAR(150) NOT NULL,
    nivel VARCHAR(100),
    data_inicio DATE,
    data_fim DATE,
    em_andamento BOOLEAN DEFAULT FALSE,
    descricao TEXT,
    FOREIGN KEY (pessoa_id)
        REFERENCES pessoas(id)
        ON DELETE CASCADE
);

-- 3. EXPERIENCIAS PROFISSIONAIS
CREATE TABLE IF NOT EXISTS experiencias (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER NOT NULL,
    empresa VARCHAR(150) NOT NULL,
    cargo VARCHAR(150) NOT NULL,
    tipo_contrato VARCHAR(100),
    local VARCHAR(150),
    data_inicio DATE,
    data_fim DATE,
    atual BOOLEAN DEFAULT FALSE,
    descricao TEXT,
    FOREIGN KEY (pessoa_id)
        REFERENCES pessoas(id)
        ON DELETE CASCADE
);

-- 4. PROJETOS
CREATE TABLE IF NOT EXISTS projetos (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    tecnologias TEXT,
    url_repositorio TEXT,
    url_demo TEXT,
    data_inicio DATE,
    data_fim DATE,
    FOREIGN KEY (pessoa_id)
        REFERENCES pessoas(id)
        ON DELETE CASCADE
);

-- 5. HABILIDADES
CREATE TABLE IF NOT EXISTS habilidades (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(100),
    nivel VARCHAR(50),
    FOREIGN KEY (pessoa_id)
        REFERENCES pessoas(id)
        ON DELETE CASCADE,
    UNIQUE (pessoa_id, nome)
);

-- 6. IDIOMAS
CREATE TABLE IF NOT EXISTS idiomas (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER NOT NULL,
    idioma VARCHAR(100) NOT NULL,
    nivel VARCHAR(100),
    FOREIGN KEY (pessoa_id)
        REFERENCES pessoas(id)
        ON DELETE CASCADE,
    UNIQUE (pessoa_id, idioma)
);

-- INDICES PARA OS RELACIONAMENTOS
CREATE INDEX IF NOT EXISTS idx_formacoes_pessoa
ON formacoes(pessoa_id);

CREATE INDEX IF NOT EXISTS idx_experiencias_pessoa
ON experiencias(pessoa_id);

CREATE INDEX IF NOT EXISTS idx_projetos_pessoa
ON projetos(pessoa_id);

CREATE INDEX IF NOT EXISTS idx_habilidades_pessoa
ON habilidades(pessoa_id);

CREATE INDEX IF NOT EXISTS idx_idiomas_pessoa
ON idiomas(pessoa_id);
