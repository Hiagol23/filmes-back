use db_controle_filmes_ab;

create table tbl_filme (
	id    			 int not null primary key auto_increment,
    nome   		     varchar(80) not null,
    duracao          time not null,
    sinopse          text not null,
    data_lancamento  date not null,
    foto_capa        varchar(200),
    link_trailer     varchar (200)
);
drop table tbl_teste;

show tables;

desc tbl_filme;

select * from tbl_filme;