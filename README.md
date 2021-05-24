# asksuite-crawler
Develop the robot design that searches for prices in time real


# Para Rodar o projeto.

# Executar os seguintes comandos

  docker-compose build 
  docker-compose up
  
  OBS: no arquivo Dockerfile estou usando a vrsao 14.17.0 do node, caso a versão de vocês seja inferior 
  é só alterar pra versão de vocês e executar normalmente.
  
  
  # Exemplo de requisição
  
  POST http://localhost:3000/buscar

request.body:
{
    "checkin": "22/06/2021",
    "checkout": "28/06/2021"
}

OBS: Fazendo alguns testes tive alguns problemas com a escolha das datas, é importante validar se a data do checkin e menor do que
do checkout , se é uma data valida e o formato que a api espera 'dd/mm/yyyy'
