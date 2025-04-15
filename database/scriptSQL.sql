#cria um novo database
create database db_controle_filmes_ab;

#ativa o database a ser utilizado
use db_controle_filmes_ab;

-- Tabela de filme
create table tbl_filme (
	id    			 int not null primary key auto_increment,
    nome   		     varchar(80) not null,
    duracao          time not null,
    sinopse          text not null,
    data_lancamento  date not null,
    foto_capa        varchar(200),
    link_trailer     varchar (200)
);

-- Tabela de Nacionalidade
CREATE TABLE tbl_nacionalidade (
    id_nacionalidade INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nacionalidade VARCHAR(45)
);

-- Tabela de Usuário
CREATE TABLE tbl_usuario (
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100),
    email VARCHAR(45)
);

-- Tabela de Gênero
CREATE TABLE tbl_genero (
    id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genero VARCHAR(45)
);

-- Tabela de Idioma
CREATE TABLE tbl_idioma (
    id_idioma INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idioma_filme VARCHAR(45)
);


show tables;

desc tbl_filme;

select * from tbl_filme;