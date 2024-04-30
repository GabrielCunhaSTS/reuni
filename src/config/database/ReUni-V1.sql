drop database if exists db_ReUni;

create database db_ReUni;

use db_ReUni;

create table tb_estadoOrigem(
	id_estadoOrigem int auto_increment not null primary key,
    nm_estadoOrigem varchar(100)
);

create table tb_DadosRepublicas(
	id_dadoRepublica int auto_increment not null primary key,
    ds_nomeAnfitriao varchar(100) not null,
    ds_emailAnfitriao varchar(200) not null,
    nmr_telefoneAnfitriao varchar(20) not null,
    an_anoCriacao char(4)
);

select * from tb_DadosRepublicas;


create table tb_localizacaoRepublica(
	id_localizacao int auto_increment not null primary key,
    ds_cep varchar(9),
    ds_cidade varchar(100),
    ds_rua varchar(200),
    ds_bairro varchar(100)
);

create table tb_tipoRepublica(
	id_tipoRepublica int auto_increment not null primary key,
    ds_tipoRepublica varchar(200) not null,
    ds_tipoImovel varchar(200) not null,
    ds_tipoQuarto varchar(200) not null,
    qtd_quartoRepublica int(3),
    qtd_banheiroRepublica int(3),
    qtd_moradoresRepublicas int(3)
);

create table tb_novasRegras(
	id_novaRegra int auto_increment not null primary key,
    ds_novaRegra varchar(250)
);

create table tb_regrasRepublica(
	id_regraRepublica int auto_increment not null primary key,
	ds_permissaoFumar boolean,
    ds_permissaoPets  boolean,
    ds_permissaoBebidasAlc  boolean,
	ds_permissaoVisitas  boolean,
    id_novaRegra int,
    
    constraint foreign key (id_novaRegra)
    references tb_novasRegras(id_novaRegra)
);

create table tb_comodidades(
	id_comodidade int auto_increment not null primary key,
    ds_wifi boolean,
    ds_tv boolean,
    ds_cozinha boolean,
    ds_garagem boolean,
    ds_arcondicionado boolean
);

create table tb_aluguel(
	id_valorAlguel int auto_increment not null primary key,
    ds_estadiaMin boolean,
    vl_valorMensal decimal(10,2) not null,
    ds_contasInclusas boolean
);


create table tb_republica(
	id_republica int auto_increment not null primary key,
    id_dadoRepublica int,
    id_localizacao int,
    id_tipoRepublica int,
    id_regraRepublica int,
    id_valorAlguel int,
    id_comodidade int,
    ds_nomeRepublica varchar(50) not null,
    ds_descricaoRepublica varchar(500) not null,
    
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

create table tb_usuario(
	id_usu int auto_increment not null primary key,
    nm_usu varchar(100) not null,
    sx_sexoUsu char(1),
    qt_idade int(2),
    ds_cpfUsu varchar(14),
    ds_rgUsu varchar(12),
    ds_emailUsu varchar(150) not null,
    ds_senhaUsu varchar(100) not null,
    ds_descricaoPerfil varchar(500),
    id_estadoOrigem int,
    
    constraint foreign key (id_estadoOrigem)
    references tb_estadoOrigem(id_estadoOrigem)
);

create table tb_anfitriao(
	id_anfitriao int auto_increment not null primary key,
    id_usu int,
    id_republica int,
    
    constraint foreign key (id_usu)
    references tb_usuario (id_usu),
    
    constraint foreign key (id_republica)
    references tb_republica (id_republica)
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

-- Inserir na tb_DadosRepublicas
INSERT INTO tb_DadosRepublicas (ds_nomeAnfitriao, ds_emailAnfitriao, nmr_telefoneAnfitriao, an_anoCriacao) VALUES 		
('João Silva', 'silvajoão00@gmail.com', '(68) 98687-4851', '2019'),
('Maria Oliveira', 'mariaOlira@gmail.com', '(88) 98227-2421', '2021'),
('Ana Silva', 'Anasilvaa@gmail.com', '(11) 1234-5678', '2020'),
('Pedro Souza', 'pedroSouzinha@gmail.com', '(11) 9876-5432', '2018'),
('Carla Oliveira', 'carlaOliveira708@gmail.com', '(11) 1111-2222', '2019'),
('João Santos', 'joaoSant@gmail.com', '(21) 99836-3047', '2021'),
('Mariana Costa', 'marianaAtsac@gmail.com', '(11) 5555-6666', '2017'),
('Lucas Pereira', 'lucasArtes2021@gmail.com', '(31) 99766-3031', '2022'),
('Fernanda Lima', 'fernandaMontesLim@gmail.com', '(11) 9999-0000', '2016'),
('Gustavo Alves', 'gustavoGuanabaraAl@gmail.com', '(11) 1234-5678', '2015'),
('Juliana Santos', 'julianaSaantos@gmail.com', '(67) 98636-7880', '2014'),
('Rafael Oliveira', 'rafaelOliVeira@gmail.com', '(27) 98591-9806', '2013'),
("Gabriel", "gabriel@teste.com", "13991266579", 2020),
("david", "david@teste.com", "13991266589", 2020),
("livia", "livia@teste.com", "13991266599", 2020),
("Vitor Luiz Kauê Dias", "vitor_dias@celiosilva.com", "(53) 99627-9045", 2020),
("Marcos Lorenzo Osvaldo Bernardes", "marcos_bernardes@carreira.com.br", "(64) 99575-4495", 2020),
("Carlos Kauê Moraes", "carloskauemoraes@inglesasset.com.br", "(13) 98266-6805", 2020),
("Nina Vitória Vera Freitas", "nina.vitoria.freitas@demasi.com.br", "(85) 98830-0696", 2020),
("Daniela Liz Bruna da Cruz", "daniela_dacruz@comdados.com", "(63) 98512-7080", 2020),
("Allana Vitória Betina da Costa", "allana_dacosta@steadyoffice.com.br", "(13) 98218-1084", 2020);

-- Inserir na tb_localizacaoRepublica
INSERT INTO tb_localizacaoRepublica (ds_cep, ds_cidade, ds_rua, ds_bairro) VALUES
('66843-880', 'Belém', 'Água Boa', 'Jassanã'),
('69906-630', 'Rio Branco', 'Avenida Fortaleza do Abunã', 'Humaíta'),
('01234-567', 'São Paulo', 'Rua Oscar Freire', 'Centro'),
('12345-678', 'Rio de Janeiro', 'Rua Gonçalo de Carvalho', 'Copacabana'),
('23456-789', 'Belo Horizonte', 'Avenida Amazonas', 'Savassi'),
('34567-890', 'Curitiba', 'Rua João Alfredo', 'Batel'),
('45678-901', 'Porto Alegre', 'Rua João Alfredo', 'Moinhos de Vento'),
('56789-012', 'Salvador', 'Rua da Aurora', 'Barra'),
('67890-123', 'Brasília', 'Eixo Rodoviário de Brasília', 'Asa Sul'),
('78901-234', 'Fortaleza', 'Avenida Caxangá', 'Meireles'),
('89012-345', 'Recife', 'Avenida Governador Agamenon Magalhães', 'Boa Viagem'),
('90123-456', 'Manaus', 'Avenida Mário Ypiranga Monteiro', 'Adrianópolis');	


-- Inserir na tb_tipoRepublica
INSERT INTO tb_tipoRepublica (ds_tipoRepublica, ds_tipoImovel, ds_tipoQuarto, qtd_quartoRepublica, qtd_banheiroRepublica, qtd_moradoresRepublicas) VALUES
('Compartilhada', 'Apartamento', 'Solteiro', 4, 2, 5),
('Privativa', 'Casa', 'Duplo', 3, 1, 4),
('República Mista', 'Casa', 'Individual', 5, 3, 8),
('República Masculina', 'Apartamento', 'Compartilhado', 4, 2, 6),
('República Feminina', 'Casa', 'Individual', 6, 4, 10),
('República LGBT+', 'Apartamento', 'Compartilhado', 3, 2, 5),
('República Estudantil', 'Casa', 'Compartilhado', 8, 5, 12),
('República Jovem', 'Apartamento', 'Individual', 2, 1, 4),
('República Universitária', 'Casa', 'Compartilhado', 7, 3, 10),
('República Sênior', 'Apartamento', 'Individual', 3, 2, 5),
('República Trabalhador', 'Casa', 'Compartilhado', 6, 4, 8),
('República Criativa', 'Apartamento', 'Individual', 4, 2, 6);


-- Inserir na tb_novasRegras
INSERT INTO tb_novasRegras (ds_novaRegra) VALUES
('Silêncio após as 22h'),
('Proibido fumar dentro'), 
('Aceita animais de estimação'),
('Proibido fumar nas áreas comuns'),
('Permitido trazer animais de estimação'),
('Proibido o consumo de bebidas alcoólicas'),
('Restrito a visitas somente nos finais de semana'),
('Proibido festas após às 22h'),
('Permitido o uso da piscina somente com autorização prévia'),
('Proibido a utilização de drogas ilícitas'),
('Permitido o uso do estacionamento para bicicletas'),
('Restrito o número de hóspedes nas festas'),
('Proibido o acesso de estranhos sem autorização');


-- Inserir na tb_regrasRepublica
INSERT INTO tb_regrasRepublica (ds_permissaoFumar, ds_permissaoPets, ds_permissaoBebidasAlc, ds_permissaoVisitas, id_novaRegra) VALUES 
(0, 1, 1, 1, 1),
(1, 0, 1, 0, 2),
(0, 0, 0, 1, 1),
(1, 1, 0, 1, 2),
(0, 0, 1, 1, 3),
(1, 0, 1, 1, 4),
(0, 0, 0, 0, 5),
(1, 1, 1, 0, 6),
(0, 0, 1, 1, 7),
(1, 0, 0, 1, 8),
(0, 1, 1, 1, 9),
(0, 0, 0, 1, 10);


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
(1, 1, 1, 1, 0);

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
(0, 1000.00, 1);

-- Inserir na tb_republica
INSERT INTO tb_republica (id_dadoRepublica, id_localizacao, id_tipoRepublica, id_regraRepublica, id_valorAlguel, id_comodidade, ds_nomeRepublica, ds_descricaoRepublica) VALUES 
(1, 1, 1, 1, 1, 1, '100 Noção', 'Um apartamento compartilhado no centro'),
(2, 2, 2, 2, 2, 2, 'Oásis Verde', 'Casa privativa com um jardim'),
(1, 1, 1, 1, 1, 1, 'Café com Leite', 'Excelente localização, próximo a universidades.'),
(2, 2, 2, 2, 2, 2, 'Maloka dos Malucos', 'Vista para o mar, ambiente aconchegante.'),
(3, 3, 3, 3, 3, 3, 'Das Vizinhas', 'Casa ampla, com jardim e churrasqueira.'),
(4, 4, 4, 4, 4, 4, 'República dos Livros', 'Apartamento moderno, próximo ao centro.'),
(5, 5, 5, 5, 5, 5, 'República Baiana', 'Ambiente tranquilo, com fácil acesso ao transporte público.'),
(6, 6, 6, 6, 6, 6, 'Chalé dos Churrasqueiros', 'Localização privilegiada, próximo a shoppings e restaurantes.'),
(7, 7, 7, 7, 7, 7, 'Comunidade do Saber', 'Casa espaçosa, com área de lazer.'),
(8, 8, 8, 8, 8, 8, 'Babilônia', 'Apartamento confortável, com vista para o mar.'),
(9, 9, 9, 9, 9, 9, 'Centro de Aprendizado', 'Casa charmosa, com decoração vintage.'),
(10, 10, 10, 10, 10, 10, 'Instituto Cultural', 'Ambiente acolhedor, cercado pela natureza.');


-- Inserir na tb_usuario
INSERT INTO tb_usuario (nm_usu, sx_sexoUsu, qt_idade, ds_cpfUsu, ds_rgUsu, ds_emailUsu, ds_senhaUsu, ds_descricaoPerfil, id_estadoOrigem) VALUES 
('Lavínia Tatiane Adriana Aragão', 'F', 19 ,'111.222.333-44', 'A987654', 'laviniatatianearagao@pobox.com', 'FzMzHkpRnc', 'Estudante', 12),
('Manoel Paulo Thomas da Silva', 'M', 27 ,'555.666.777-88', 'B123456', 'manoelpaulodasilva@sunrise.com.br', 'Pl9tCumXi3', 'Profissional', 9),
('Débora Patrícia Gabrielly Ramos', 'F', 26 , '123.456.789-00', '12345678', 'debora.patricia.ramos@brasildakar.com.br', 'wxQ27BbzjF', 'Estudante universitária em busca de uma república tranquila.', 1),
('Ana Camila Luiza Ramos', 'F', 18 , '987.654.321-00', '87654321', 'ana_ramos@abbott.com', 'bhOORe8C2Q', 'Jovem profissional em mudança para uma nova cidade.', 1),
('Kevin Cláudio Rodrigues', 'M', 20 , '111.222.333-44', '11223344', 'kevin.claudio.rodrigues@eclatt.com.br', 'qRAymylL6I', 'Estagiária procurando um ambiente colaborativo.', 2),
('Oliver Geraldo Oliveira', 'M', 20 ,'555.666.777-88', '55667788', 'oliver_oliveira@fojsc.unesp.br', '9qXfGHgmsY', 'Estudante de intercâmbio em busca de novas amizades.', 3),
('Manuela Heloisa Eloá Porto', 'F', 21 ,'999.888.777-66', '99887766', 'manuelaheloisaporto@predialnet.com.br', 'xaQdd5KHYd', 'Jovem profissional em busca de uma república animada.', 2),
('Diego Geraldo dos Santos', 'M', 22, '333.222.111-00', '33221100', 'diego_geraldo_dossantos@valeguinchos.com.br', 'Xs2F8YYR2F', 'Estudante de música procurando um ambiente criativo.', 3),
('Yasmin Isabelle dos Santos', 'F', 23 ,'444.555.666-77', '44556677', 'yasmin_isabelle_dossantos@sp.gov.br', 'tONfKwk6bb', 'Estudante de arte buscando uma república acolhedora.', 4),
('César Caleb Rodrigo de Paula', 'M', 24 ,'777.888.999-00', '77889900', 'cesar-depaula93@csjsistemas.com.br', '0IQrhbi0jJ', 'Jovem profissional em mudança para uma nova cidade.', 5),
('Maya Elaine da Cruz', 'F', 26 ,'222.111.333-44', '22113344', 'maya_dacruz@jcoronel.com.br', 'N9THeo5NUa', 'Estudante universitária em busca de uma república tranquila.', 6),
('Bernardo Joaquim Pires', 'M', 32 ,'666.555.444-00', '66554400', 'bernardo.joaquim.pires@etec.sp.gov.br', 'fYynfOFYOp', 'Jovem profissional procurando um ambiente colaborativo.', 7),
('Bento Bento Bernardes', 'M', 19, '123.456.789-00', '123456789', 'bento.bento.bernardes@trimempresas.com.br', '5s4bLRQu13', 'Descrição do perfil de Bento Bernardes', 11),	
('Teresinha Sabrina Oliveira', 'F', 20, '987.654.321-00', '987654321', 'teresinha-oliveira72@robertacorrea.com', 'ihHEerBbeU', 'Descrição do perfil de Teresinha Sabrina', 14),
('Bento Kauê Bernardo Moraes', 'M', 21,'555.444.333-22', '555444333', 'bentokauemoraes@imobideal.com', 'hxg57L2oIc', 'Descrição do perfil de Kauê Bernardo', 1),
('Vitor Noah Gael Moraes', 'M', 34, '490.182.514-37', '365556695', 'vitor-moraes94@fcfar.unesp.br', 'RgprzyXBRR', 'Descrição do perfil de Vitor Noah', 2),
('Carlos Eduardo Renato Thiago Nascimento', 'M', 28, '349.664.120-72', '358592537', 'carlos.eduardo.nascimento@krika.com.br', '0nYWSoJazc', 'Descrição do perfil de Carlos Eduardo', 17),
('Simone Marlene Corte Real', 'F', 29,'868.430.800-06', '258086051', 'simone-cortereal90@supercleanlav.com.br', 'EmubhoDRIR', 'Descrição do perfil de Simone Marlene', 15),
('Filipe Francisco Ribeiro', 'M', 36,'564.346.373-30', '227772520', 'filipe_francisco_ribeiro@amoamar.com.br', 'e9ynxzXKMq', 'Descrição do perfil de Filipe Francisco', 14);

-- Inserir em anfitriao
INSERT INTO tb_anfitriao (id_usu, id_republica) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12);
       
select * from tb_usuario;
select * from tb_anfitriao;

select * from tb_DadosRepublicas 
	where id_dadoRepublica = 3;

select nm_estadoOrigem, COUNT(*) as 'QTD usuarios por nacionalidade'
	from tb_usuario 
		join tb_estadoOrigem
			 on (tb_estadoOrigem.id_estadoOrigem = tb_usuario.id_estadoOrigem)	
				group by nm_estadoOrigem;	
			

select nm_usu, id_estadoOrigem 
	from tb_usuario as usu
		order by id_estadoOrigem;	

select nm_usu, sx_sexoUsu, qt_idade, ds_cpfUsu, ds_rgUsu 
	from tb_usuario
		order by qt_idade;		

select ds_nomeRepublica, ds_descricaoRepublica, ds_tipoRepublica , ds_bairro
	from tb_republica as r
		join tb_tiporepublica as tr
			on (tr.id_tipoRepublica = r.id_tipoRepublica)
		join tb_localizacaoRepublica as lr
			on (lr.id_localizacao = r.id_localizacao);
            




	