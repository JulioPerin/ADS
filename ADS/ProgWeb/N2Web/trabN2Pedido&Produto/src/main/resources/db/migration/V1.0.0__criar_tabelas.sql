CREATE TABLE Produto (
                         codigo BIGINT IDENTITY NOT NULL,
                         nome VARCHAR(255) NOT NULL,
                         categoria VARCHAR(255) NOT NULL,
                         codigoEAN VARCHAR(13) NOT NULL,
                         dataValidade DATE NOT NULL,
                         PRIMARY KEY (codigo)
);

CREATE TABLE Orcamento (
                           codigo BIGINT IDENTITY NOT NULL,
                           data DATE NOT NULL,
                           dataValidade DATE NOT NULL,
                           valor BIGINT NOT NULL,
                           PRIMARY KEY (codigo)
);

CREATE TABLE Pedido (
                        codigo BIGINT IDENTITY NOT NULL,
                        dataEmissao DATE NOT NULL,
                        cliente VARCHAR(255) NOT NULL,
                        codigoOrcamento VARCHAR(255) NOT NULL,
                        PRIMARY KEY (codigo)
);