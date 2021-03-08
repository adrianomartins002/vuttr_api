# vuttr_api
Projeto para criação de api para consumo dos dados do banco para vuttr


# Iniciando
Essas instruções fornecerão uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste. Consulte implantação para obter notas sobre como implantar o projeto em
um sistema ativo.

## Pré-requisitos:
Para execução e desenvolvimento do projeto é necessário, ou que tenha instalado:
- nodejs
- yarn ou npm
- Docker para criação do banco


## Desenvolvido com
 - JavaScript

## Execução pro projeto
 - Primeiramente é necessário criar o banco de dados usando o comando do docker para criação do mesmo:
  ``` docker run --name vuttr -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres ```
 - Após o banco vuttr criado deve-se executar o comando ``` npm run typeorm migration:run  ``` para executar as migrations
 - Para executar o projeto, basta rodar os comandos ``` npm install ``` e depois ``` npm start ```, isso após ter o banco de dados criado já
 - Com isso a api já fica disponível para ser acessada, então deve-se seguir para o próximo passo que é deixar o projeto react online para acessar.

## Autores
- Adriano Martins de Oliveira Sousa.
