drop database if exists db_ReUni;

create database db_ReUni;

use db_ReUni;

create table if not exists tb_estadoOrigem(
	id_estadoOrigem int auto_increment primary key,
    nm_estadoOrigem varchar(100)
);

create table if not exists tb_usuario(
	id_usu int auto_increment primary key,
    nm_usu varchar(100) not null,
    sx_sexoUsu char(1),
    qt_idade int(2),
    ds_cpfUsu varchar(14),
    ds_emailUsu varchar(150) not null,
    ds_senhaUsu varchar(100) not null,
    ds_descricaoPerfil varchar(500),
    id_estadoOrigem int,
    
    constraint foreign key (id_estadoOrigem)
    references tb_estadoOrigem(id_estadoOrigem)
);

create table if not exists tb_anunciante(
	id_anunciante int auto_increment primary key,
    nm_anunciante varchar(100),
    sg_sexoAnunci char(2),		
    ds_emailAunci varchar(100),
    ds_senhaAnunci varchar(100),
    ds_cpfAnunci varchar(14),
    qt_idadeAnunci char(2)
);

create table if not exists tb_imagem(
	id_imagem int auto_increment primary key,
	id_usu int,
	nome_imagem varchar(200),
	nome_arquivo varchar(200),
	constraint foreign key(id_usu)
	references tb_usuario(id_usu)
);
	
create table if not exists tb_imagemA(
	id_imagem int auto_increment primary key,
	id_anunciante int,
	nome_imagem varchar(200),
	nome_arquivo varchar(200),
	constraint foreign key(id_anunciante)
	references tb_anunciante(id_anunciante)
);

select * from tb_imagem;
	
DESCRIBE tb_imagem;

create table if not exists tb_DadosRepublicas(
	id_dadoRepublica int auto_increment primary key,
    id_anunciante int,
    ds_emailContato varchar(200),
	nmr_telefoneContato varchar(20), 
    an_anoCriacao char(4),
    
    foreign key (id_anunciante)
    references tb_anunciante(id_anunciante)
);

create table if not exists tb_localizacaoRepublica(
	id_localizacao int auto_increment primary key,
    ds_cep varchar(9),
    ds_estado varchar(2),
    ds_cidade varchar(100),
    ds_rua varchar(200),
    ds_bairro varchar(100),
    ds_numero varchar(5)
);

select * from tb_localizacaorepublica;
create table if not exists tb_tipoRepublica(
	id_tipoRepublica int auto_increment primary key,
    ds_tipoRepublica varchar(200) not null,
    ds_tipoImovel varchar(200) not null,
    qtd_quartoRepublica int(3),
    qtd_banheiroRepublica int(3)
);

create table if not exists tb_regrasRepublica(
	id_regraRepublica int auto_increment primary key,
	ds_permissaoFumar boolean,
    ds_permissaoPets  boolean,
    ds_permissaoBebidasAlc  boolean,
	ds_permissaoVisitas  boolean
);

create table if not exists tb_comodidades(
	id_comodidade int auto_increment primary key,
    ds_wifi boolean,
    ds_tv boolean,
    ds_cozinha boolean,
    ds_garagem boolean,
    ds_arcondicionado boolean
);

create table if not exists tb_aluguel(
	id_valorAlguel int auto_increment primary key,
    ds_estadiaMin boolean,
    vl_valorMensal decimal(10,2) not null,
    ds_contasInclusas boolean
);

create table if not exists tb_republica(
	id_republica int auto_increment primary key,
    id_dadoRepublica int,
    id_anunciante int,
    id_localizacao int,
    id_tipoRepublica int,
    id_regraRepublica int,
    id_valorAlguel int,
    id_comodidade int,
    ds_nomeRepublica varchar(50) not null,
    ds_descricaoRepublica varchar(2000) not null,
    
    constraint foreign key (id_anunciante)
    references tb_anunciante(id_anunciante),
    constraint foreign key (id_dadoRepublica)
    references tb_DadosRepublicas(id_dadoRepublica),
    
    constraint foreign key (id_localizacao)
    references tb_localizacaoRepublica(id_localizacao),
    
    constraint foreign key (id_tipoRepublica)
    references tb_tipoRepublica(id_tipoRepublica),
    
    constraint foreign key (id_regraRepublica)
    references tb_regrasRepublica(id_regraRepublica),
    
    constraint foreign key (id_valorAlguel)
    references tb_aluguel(id_valorAlguel),
    
    constraint foreign key (id_comodidade)
    references tb_comodidades(id_comodidade)
);


create table tb_comentarios(
	id_comentario int auto_increment primary key,
    id_usu int,
    id_republica int,
    ds_texto text,
	data_criacao timestamp default current_timestamp,
    
    constraint foreign key (id_usu)
    references tb_usuario(id_usu),
    
    constraint foreign key (id_republica)
    references tb_republica (id_republica)
);


create table tb_imagemRepublica(
	id_imagem int auto_increment primary key,
    id_republica int,
    nome_imagem varchar(200),
	nome_arquivo varchar(200),
    
    constraint foreign key (id_republica)
    references tb_republica(id_republica)
);
#INSERTS

-- inserir na tb_estadoOrigem
INSERT INTO tb_estadoOrigem (nm_estadoOrigem) VALUES
 ('Acre'), 
 ('Alagoas'),
 ('Amapá'),
 ('Amazonas'),
 ('Bahia'),
 ('Ceará'),
 ('Distrito Federal'),
 ('Espírito Santo'),
 ('Goiás'),
 ('Maranhão'),
 ('Mato Grosso'),
 ('Mato Grosso do Sul'),
 ('Minas Gerais'),
 ('Pará'),
 ('Paraíba'),
 ('Paraná'),
 ('Pernambuco'),
 ('Piauí'),
 ('Rio de Janeiro'),
 ('Rio Grande do Norte'),
 ('Rio Grande do Sul'),
 ('Rondônia'),
 ('Roraima'),
 ('Santa Catarina'),
 ('São Paulo'),
 ('Sergipe'),
 ('Tocantins');

INSERT INTO tb_anunciante (nm_anunciante, ds_emailAunci, ds_senhaAnunci, ds_cpfAnunci, qt_idadeAnunci) VALUES
('Maria Eduarda Silva', 'mariaeduarda@example.com', 'senha123', '111.222.333-44', '19'),
('João Pedro Oliveira', 'joaopedro@example.com', 'abcd1234', '555.666.777-88', '27'),
('Amanda Souza Santos', 'amanda.souza@example.com', '987654', '123.456.789-00', '26'),
('Pedro Henrique Almeida', 'pedro.almeida@example.com', 'senha456', '987.654.321-00', '18'),
('Gabriela Lima Costa', 'gabriela.lima@example.com', 'qwerty', '111.222.333-44', '20'),
('Lucas Oliveira Pereira', 'lucas.oliveira@example.com', 'asdf123', '555.666.777-88', '20'),
('Juliana Santos Rodrigues', 'juliana.rodrigues@example.com', 'senha1234', '999.888.777-66', '21'),
('Mateus Pereira Souza', 'mateus.souza@example.com', 'password', '333.222.111-00', '22'),
('Carolina Silva Lima', 'carolina.lima@example.com', 'senha12345', '444.555.666-77', '23'),
('Felipe Santos Oliveira', 'felipe.oliveira@example.com', 'abcde', '777.888.999-00', '24'),
('Mariana Pereira Alves', 'mariana.alves@example.com', 'senha6789', '222.111.333-44', '26'),
('Rafaela Oliveira Ferreira', 'rafaela.ferreira@example.com', 'abcdef', '666.555.444-00', '32'),
('Matheus Lima Santos', 'matheus.santos@example.com', 'senha123456', '123.456.789-00', '19'),
('Giovanna Costa Rodrigues', 'giovanna.rodrigues@example.com', '1234567890', '987.654.321-00', '20'),
('Fernando Almeida Souza', 'fernando.souza@example.com', 'abcdefg', '555.444.333-22', '21'),
('Beatriz Oliveira Lima', 'beatriz.lima@example.com', '123456789', '490.182.514-37', '34'),
('Ricardo Santos Pereira', 'ricardo.pereira@example.com', 'senhaabcdef', '349.664.120-72', '28'),
('Camila Costa Oliveira', 'camila.oliveira@example.com', '123456', '868.430.800-06', '29'),
('Vinícius Silva Lima', 'vinicius.lima@example.com', 'senhaabc', '564.346.373-30', '36'),
('Ana Carolina Almeida', 'ana.carolina@example.com', 'password123', '111.111.111-11', '25'),
('Marcos Oliveira Santos', 'marcos.santos@example.com', 'abc123def', '222.222.222-21', '19'),
('Marcus Almeida Oliveira', 'marcus.almeida@example.com', 'abc123def', '222.222.222-23', '18'),
('Antonio Costa', 'antonio.costa@example.com', 'abc123def', '222.222.222-24', '22'),
('Alexandre Morais', 'Morais@example.com', 'abc123def', '222.222.222-25', '27'),
('Pietro Silva', 'silva.pietro@example.com', 'abc123def', '222.222.222-26', '22'),
('Ameli Souza', 'Amelis@example.com', 'abc123def', '222.222.222-27', '29'),
('Ana lua Rocha', 'alua@example.com', 'abc123def', '222.222.222-28', '25'),
('André de Paula', 'depaula@example.com', 'abc123def', '222.222.222-29', '24'),
('Pedro Henrique pereira', 'pereirahenrique@example.com', 'abc123def', '222.222.222-29', '21'),
('Pedro bastos', 'bastos@example.com', 'abc123def', '222.222.222-29', '21');

-- Inserir na tb_DadosRepublicas 		
INSERT INTO tb_DadosRepublicas (id_anunciante, ds_emailContato, nmr_telefoneContato, an_anoCriacao) VALUES 		
(1, 'silvajoão00@gmail.com', '68986874851', '2019'),
(2, 'mariaOlira@gmail.com', '88982272421', '2021'),
(3, 'Anasilvaa@gmail.com', '1112345678', '2020'),
(4, 'pedroSouzinha@gmail.com', '119876-5432', '2018'),
(5, 'carlaOliveira708@gmail.com', '1111112222', '2019'),
(6, 'joaoSant@gmail.com', '21998363047', '2021'),
(7, 'marianaAtsac@gmail.com', '1155556666', '2017'),
(8, 'lucasArtes2021@gmail.com', '31997663031', '2022'),
(9, 'fernandaMontesLim@gmail.com', '1199990000', '2016'),
(10, 'gustavoGuanabaraAl@gmail.com', '1112345678', '2015'),
(11, 'julianaSaantos@gmail.com', '67986367880', '2014'),
(12, 'rafaelOliVeira@gmail.com', '27985919806', '2013'),
(13, 'gabriel@teste.com', '13991266579', 2020),
(14, 'david@teste.com', '13991266589', 2020),
(15, 'livia@teste.com', '13991266599', 2020),
(16, 'vitor_dias@celiosilva.com', '53996279045', 2020),
(17, 'marcos_bernardes@carreira.com.br', '6499575-495', 2020),
(18, 'carloskauemoraes@inglesasset.com.br', '13982666805', 2020),
(19, 'nina.vitoria.freitas@demasi.com.br', '85988300696', 2020),
(20, 'daniela_dacruz@comdados.com', '63985127080', 2020),
(21, 'allana_dacosta@steadyoffice.com.br', '13982181084', 2020),
(22, 'maria.silvaaa@example.com', '13982181081', 2020),
(23, 'afernanda.martins@example.com', '13982181084', 2020),
(24, 'leticia.mendes@example.com', '13982181083', 2020),
(25, 'isabela.moura@example.com', '13982181085', 2020),
(26, 'andre.lopes@example.com', '13982181086', 2020),
(27, 'vanessa.cunha@example.com', '13982181087', 2020),
(28, 'marcos.nascimento@example.com', '13982181088', 2020),
(29, 'renata.barros@example.com', '13982181089', 2020),
(30, 'ajulia.rocha@example.com', '13982181014', 2020);

-- Inserir na tb_localizacaoRepublica
INSERT INTO tb_localizacaoRepublica (ds_cep, ds_estado, ds_cidade, ds_rua, ds_bairro) VALUES
('66843-880', 'PA', 'Belém', 'Água Boa', 'Jassanã'),
('69906-630', 'AC', 'Rio Branco', 'Avenida Fortaleza do Abunã', 'Humaíta'),
('01234-567', 'SP', 'São Paulo', 'Rua Oscar Freire', 'Centro'),
('12345-678', 'RJ', 'Rio de Janeiro', 'Rua Gonçalo de Carvalho', 'Copacabana'),
('23456-789', 'MG', 'Belo Horizonte', 'Avenida Amazonas', 'Savassi'),
('34567-890', 'PR', 'Curitiba', 'Rua João Alfredo', 'Batel'),
('45678-901', 'RS', 'Porto Alegre', 'Rua João Alfredo', 'Moinhos de Vento'),
('56789-012', 'BA', 'Salvador', 'Rua da Aurora', 'Barra'),
('67890-123', 'DF', 'Brasília', 'Eixo Rodoviário de Brasília', 'Asa Sul'),
('78901-234', 'CE', 'Fortaleza', 'Avenida Caxangá', 'Meireles'),
('89012-345', 'PE', 'Recife', 'Avenida Governador Agamenon Magalhães', 'Boa Viagem'),
('90123-456', 'AM', 'Manaus', 'Avenida Mário Ypiranga Monteiro', 'Adrianópolis'),
('70040-010', 'DF', 'Brasília', 'SBS Quadra 2', 'Asa Sul'),
('30190-002', 'MG', 'Belo Horizonte', 'Avenida Afonso Pena', 'Centro'),
('40150-140', 'BA', 'Salvador', 'Rua da Graça', 'Graça'),
('40060-001', 'BA', 'Salvador', 'Rua Chile', 'Centro Histórico'),
('80010-000', 'PR', 'Curitiba', 'Rua XV de Novembro', 'Centro'),
('90010-110', 'RS', 'Porto Alegre', 'Avenida Borges de Medeiros', 'Centro Histórico'),
('50030-230', 'PE', 'Recife', 'Avenida Conde da Boa Vista', 'Boa Vista'),
('20010-000', 'RJ', 'Rio de Janeiro', 'Avenida Rio Branco', 'Centro'),
('30130-010', 'MG', 'Belo Horizonte', 'Rua Professor Moraes', 'Funcionários'),
('30441-153', 'MG', 'Belo Horizonte', 'Rua Rio Pomba', 'Prado'),
('30130-150', 'MG', 'Belo Horizonte', 'Rua Gonçalves Dias', 'Funcionários'),
('01046-001', 'SP', 'São Paulo', 'Avenida São Luís', 'República'),
('01311-200', 'SP', 'São Paulo', 'Rua Augusta', 'Consolação'),
('04533-010', 'SP', 'São Paulo', 'Rua Funchal', 'Vila Olímpia'),
('04538-133', 'SP', 'São Paulo', 'Rua Ramos Batista', 'Vila Olímpia'),
('22775-040', 'RJ', 'Rio de Janeiro', 'Avenida Ayrton Senna', 'Barra da Tijuca'),
('22441-120', 'RJ', 'Rio de Janeiro', 'Rua Dias Ferreira', 'Leblon'),
('22640-102', 'RJ', 'Rio de Janeiro', 'Rua Armando Lombardi', 'Barra da Tijuca');

-- Inserir na tb_tipoRepublica
INSERT INTO tb_tipoRepublica (ds_tipoRepublica, ds_tipoImovel, qtd_quartoRepublica, qtd_banheiroRepublica) VALUES
('Mista', 'Apartamento', 4, 2),
('Fem', 'Casa', 3, 1),
('Masc', 'Casa', 5, 3),
('Fem', 'Apartamento', 4, 2),
('Masc', 'Casa', 6, 4),
('Masc', 'Apartamento', 3, 2),
('Mista', 'Casa', 8, 5),
('Masc', 'Apartamento', 2, 1),
('Mista', 'Casa', 7, 3),
('Mista', 'Apartamento', 3, 2),
('Fem', 'Casa', 6, 4),
('Fem', 'Apartamento', 4, 2),
('Masc', 'Casa', 4, 2),
('Mista', 'Apartamento', 5, 3),
('Fem', 'Casa', 4, 2),
('Masc', 'Casa', 5, 2),
('Mista', 'Apartamento', 6, 3),
('Fem', 'Casa', 3, 2),
('Masc', 'Apartamento', 4, 1),
('Fem', 'Casa', 5, 3),
('Mista', 'Apartamento', 4, 2),
('Masc', 'Casa', 6, 4),
('Fem', 'Apartamento', 2, 1),
('Mista', 'Casa', 7, 3),
('Masc', 'Apartamento', 5, 2),
('Fem', 'Casa', 8, 4),
('Mista', 'Apartamento', 3, 1),
('Masc', 'Casa', 6, 3),
('Fem', 'Apartamento', 4, 2),
('Mista', 'Casa', 5, 3);



-- Inserir na tb_regrasRepublica
INSERT INTO tb_regrasRepublica (ds_permissaoFumar, ds_permissaoPets, ds_permissaoBebidasAlc, ds_permissaoVisitas) VALUES 
(0, 1, 1, 1),
(1, 0, 1, 0),
(0, 0, 0, 1),
(1, 1, 0, 1),
(0, 0, 1, 1),
(1, 0, 1, 1),
(0, 0, 0, 0),
(1, 1, 1, 0),
(0, 0, 1, 1),
(1, 0, 0, 1),
(0, 1, 1, 1),
(0, 0, 0, 1),
(1, 1, 1, 1),
(0, 0, 1, 0),
(1, 0, 0, 0),
(0, 1, 0, 1),
(1, 1, 1, 0),
(0, 1, 0, 0),
(1, 0, 1, 1),
(0, 0, 1, 0),
(1, 1, 0, 0),
(0, 1, 1, 0),
(1, 0, 0, 1),
(0, 0, 0, 0),
(1, 1, 1, 1),
(0, 0, 1, 1),
(1, 1, 0, 1),
(0, 1, 1, 0),
(1, 0, 1, 0),
(0, 0, 0, 1);

-- Inserir na tb_comodidades
INSERT INTO tb_comodidades (ds_wifi, ds_tv, ds_cozinha, ds_garagem, ds_arcondicionado) VALUES 
(1, 1, 1, 0, 1),
(1, 0, 1, 1, 0),
(1, 1, 1, 0, 0),
(1, 0, 1, 1, 1),
(1, 1, 1, 0, 0),
(0, 1, 1, 0, 1),
(1, 1, 0, 1, 0),
(0, 1, 1, 0, 1),
(1, 0, 1, 1, 1),
(1, 1, 0, 0, 0),
(1, 0, 1, 0, 1),
(1, 1, 1, 1, 0),
(1, 1, 1, 1, 1),
(0, 0, 1, 1, 1),
(1, 0, 0, 1, 0),
(0, 1, 1, 1, 0),
(1, 1, 0, 0, 1),
(0, 1, 0, 1, 1),
(1, 0, 1, 0, 0),
(0, 0, 1, 1, 1),
(1, 1, 1, 0, 1),
(0, 1, 0, 0, 0),
(1, 0, 1, 1, 0),
(0, 1, 1, 0, 1),
(1, 1, 1, 1, 0),
(0, 0, 0, 1, 1),
(1, 1, 0, 1, 0),
(0, 0, 1, 1, 0),
(1, 1, 1, 0, 1),
(0, 1, 0, 0, 1);

-- Inserir na tb_aluguel
INSERT INTO tb_aluguel (ds_estadiaMin, vl_valorMensal, ds_contasInclusas) VALUES 
(0, 800.00, 1),
(1, 1200.00, 0),
(1, 1000.00, 1),
(0, 800.00, 0),
(1, 1200.00, 1),
(0, 900.00, 1),
(1, 1500.00, 0),
(0, 850.00, 1),
(1, 1100.00, 1),
(0, 950.00, 0),
(1, 1300.00, 1),
(0, 1000.00, 1),
(1, 1050.00, 0),
(0, 920.00, 1),
(1, 1250.00, 1),
(0, 890.00, 0),
(1, 1400.00, 1),
(0, 980.00, 1),
(1, 1350.00, 0),
(0, 870.00, 1),
(1, 1100.00, 0),
(0, 950.00, 1),
(1, 1450.00, 1),
(0, 960.00, 0),
(1, 1300.00, 1),
(0, 1010.00, 1),
(1, 1200.00, 0),
(0, 950.00, 1),
(1, 1400.00, 1),
(0, 990.00, 0);

-- Inserir na tb_republica
INSERT INTO tb_republica (id_dadoRepublica, id_localizacao, id_tipoRepublica, id_regraRepublica, id_valorAlguel, id_comodidade, ds_nomeRepublica, ds_descricaoRepublica) VALUES 
(1, 1, 1, 1, 1, 1, '100 Noção', 'Um apartamento compartilhado no centro, perfeito para estudantes e jovens profissionais que buscam um local acessível e prático para morar. Ambientes bem iluminados e arejados.');	


-- Inserir na tb_usuario
INSERT INTO tb_usuario (nm_usu, sx_sexoUsu, qt_idade, ds_cpfUsu, ds_emailUsu, ds_senhaUsu, ds_descricaoPerfil, id_estadoOrigem) VALUES 
('Lavínia Tatiane Adriana Aragão', 'F', 19 ,'111.222.333-44', 'laviniatatianearagao@pobox.com', 'FzMzHkpRnc', 'Estudante', 12),
('Manoel Paulo Thomas da Silva', 'M', 27 ,'555.666.777-88', 'manoelpaulodasilva@sunrise.com.br', 'Pl9tCumXi3', 'Profissional', 9),
('Débora Patrícia Gabrielly Ramos', 'F', 26 , '123.456.789-00', 'debora.patricia.ramos@brasildakar.com.br', 'wxQ27BbzjF', 'Estudante universitária em busca de uma república tranquila.', 1),
('Ana Camila Luiza Ramos', 'F', 18 , '987.654.321-00', 'ana_ramos@abbott.com', 'bhOORe8C2Q', 'Jovem profissional em mudança para uma nova cidade.', 1),
('Kevin Cláudio Rodrigues', 'M', 20 , '111.222.333-44', 'kevin.claudio.rodrigues@eclatt.com.br', 'qRAymylL6I', 'Estagiária procurando um ambiente colaborativo.', 2),
('Oliver Geraldo Oliveira', 'M', 20 ,'555.666.777-88', 'oliver_oliveira@fojsc.unesp.br', '9qXfGHgmsY', 'Estudante de intercâmbio em busca de novas amizades.', 3),
('Manuela Heloisa Eloá Porto', 'F', 21 ,'999.888.777-66', 'manuelaheloisaporto@predialnet.com.br', 'xaQdd5KHYd', 'Jovem profissional em busca de uma república animada.', 2),
('Diego Geraldo dos Santos', 'M', 22, '333.222.111-00', 'diego_geraldo_dossantos@valeguinchos.com.br', 'Xs2F8YYR2F', 'Estudante de música procurando um ambiente criativo.', 3),
('Yasmin Isabelle dos Santos', 'F', 23 ,'444.555.666-77', 'yasmin_isabelle_dossantos@sp.gov.br', 'tONfKwk6bb', 'Estudante de arte buscando uma república acolhedora.', 4),
('César Caleb Rodrigo de Paula', 'M', 24 ,'777.888.999-00', 'cesar-depaula93@csjsistemas.com.br', '0IQrhbi0jJ', 'Jovem profissional em mudança para uma nova cidade.', 5),
('Maya Elaine da Cruz', 'F', 26 ,'222.111.333-44', 'maya_dacruz@jcoronel.com.br', 'N9THeo5NUa', 'Estudante universitária em busca de uma república tranquila.', 6),
('Bernardo Joaquim Pires', 'M', 32 ,'666.555.444-00', 'bernardo.joaquim.pires@etec.sp.gov.br', 'fYynfOFYOp', 'Jovem profissional procurando um ambiente colaborativo.', 7),
('Bento Bento Bernardes', 'M', 19, '123.456.789-00', 'bento.bento.bernardes@trimempresas.com.br', '5s4bLRQu13', 'Descrição do perfil de Bento Bernardes', 11),    
('Teresinha Sabrina Oliveira', 'F', 20, '987.654.321-00', 'teresinha-oliveira72@robertacorrea.com', 'ihHEerBbeU', 'Descrição do perfil de Teresinha Sabrina', 14),
('Bento Kauê Bernardo Moraes', 'M', 21,'555.444.333-22', 'bentokauemoraes@imobideal.com', 'hxg57L2oIc', 'Descrição do perfil de Kauê Bernardo', 1),
('Vitor Noah Gael Moraes', 'M', 34, '490.182.514-37', 'vitor-moraes94@fcfar.unesp.br', 'RgprzyXBRR', 'Descrição do perfil de Vitor Noah', 2),
('Carlos Eduardo Renato Thiago Nascimento', 'M', 28, '349.664.120-72', 'carlos.eduardo.nascimento@krika.com.br', '0nYWSoJazc', 'Descrição do perfil de Carlos Eduardo', 17),
('Simone Marlene Corte Real', 'F', 29,'868.430.800-06', 'simone-cortereal90@supercleanlav.com.br', 'EmubhoDRIR', 'Descrição do perfil de Simone Marlene', 15),
('Filipe Francisco Ribeiro', 'M', 36,'564.346.373-30', 'filipe_francisco_ribeiro@amoamar.com.br', 'e9ynxzXKMq', 'Descrição do perfil de Filipe Francisco', 14);

select * from tb_usuario;
select * from tb_anunciante;
select * from tb_favoritos;
select * from tb_DadosRepublicas;
select * from tb_localizacaoRepublica;
select * from tb_republica;
select * from tb_aluguel;
select * from tb_regrasrepublica;
select * from tb_imagemrepublica;


select nm_estadoOrigem, COUNT(*) as 'QTD usuarios por nacionalidade'
	from tb_usuario 
		join tb_estadoOrigem
			 on (tb_estadoOrigem.id_estadoOrigem = tb_usuario.id_estadoOrigem)	
				group by nm_estadoOrigem;	

select nm_usu, id_estadoOrigem 
	from tb_usuario as usu
		order by id_estadoOrigem;	

select nm_usu, sx_sexoUsu, qt_idade, ds_cpfUsu
	from tb_usuario
		order by qt_idade;		

select ds_nomeRepublica, ds_descricaoRepublica, ds_tipoRepublica , ds_bairro
	from tb_republica as r
		join tb_tiporepublica as tr
			on (tr.id_tipoRepublica = r.id_tipoRepublica)
		join tb_localizacaoRepublica as lr
			on (lr.id_localizacao = r.id_localizacao);
            
    