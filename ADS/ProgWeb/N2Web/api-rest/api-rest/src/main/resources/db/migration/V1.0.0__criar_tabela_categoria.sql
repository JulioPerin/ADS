
)CREATE TABLE Produto (
    CodigoProduto BIGINT IDENTITY NOT NULL,
    Descricao VARCHAR(80),
    UnidadeDeMedida BIGINT,
    Vencimento DATE,
    PRIMARY KEY (CodigoProduto)
);