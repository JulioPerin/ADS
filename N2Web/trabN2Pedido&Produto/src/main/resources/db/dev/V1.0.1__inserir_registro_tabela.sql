INSERT INTO Produto (nome, categoria, codigoEAN, dataValidade)
VALUES
    ('Camiseta Polo', 'Roupas', '1234567890123', '2023-06-30'),
    ('Sapato Social', 'Calçados', '9876543210987', '2023-07-15'),
    ('Bolsa de Couro', 'Acessórios', '5432167890123', '2023-08-31'),
    ('Calça Jeans', 'Roupas', '8765432109876', '2023-09-20');

INSERT INTO Orcamento (data, dataValidade, valor)
VALUES
    ('2023-06-10', '2023-06-20', 1000),
    ('2023-06-12', '2023-06-25', 1500),
    ('2023-06-15', '2023-06-30', 2000),
    ('2023-06-20', '2023-07-05', 2500);

INSERT INTO Pedido (dataEmissao, cliente, codigoOrcamento)
VALUES
    ('2023-06-11', 'João Silva', '1'),
    ('2023-06-12', 'Maria Santos', '2'),
    ('2023-06-12', 'Pedro Rocha', '3'),
    ('2023-06-13', 'Ana Oliveira', '4');