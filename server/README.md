# Bazaar Server

Este é o backend do projeto Bazaar, desenvolvido em Spring Boot com Gradle e conexão ao PostgreSQL.

## Pré-requisitos

- Java 17 ou superior
- PostgreSQL instalado e rodando
- Banco de dados 'bazaar' criado no PostgreSQL

## Configuração do Banco de Dados

1. Certifique-se de que o PostgreSQL está rodando
2. Crie o banco de dados 'bazaar':
   ```sql
   CREATE DATABASE bazaar;
   ```
3. Ajuste as credenciais no arquivo `src/main/resources/application.properties`:
   - `spring.datasource.username`: seu usuário do PostgreSQL
   - `spring.datasource.password`: sua senha do PostgreSQL

## Executando o Projeto

### Opção 1: Via Gradle Wrapper (Recomendado)
```bash
./gradlew bootRun
```

### Opção 2: Via IDE
Execute a classe `BazaarServerApplication.java`

## Testando a Conexão

Após iniciar o servidor, você pode testar:

- Health check: http://localhost:8080/api/health
- Database health: http://localhost:8080/api/db-health

## Estrutura do Projeto

```
src/
├── main/
│   ├── java/com/bazaar/
│   │   ├── BazaarServerApplication.java  # Classe principal
│   │   ├── config/                       # Configurações
│   │   ├── controller/                   # Controllers REST
│   │   ├── entity/                       # Entidades JPA (a ser criado)
│   │   ├── repository/                   # Repositórios (a ser criado)
│   │   └── service/                      # Serviços (a ser criado)
│   └── resources/
│       ├── application.properties        # Configurações principais
│       └── application-dev.properties    # Configurações de desenvolvimento
└── test/                                # Testes
```

## Comandos Gradle Úteis

- `./gradlew build` - Compilar o projeto
- `./gradlew test` - Executar testes
- `./gradlew clean` - Limpar build
- `./gradlew bootRun` - Executar a aplicação
- `./gradlew dependencies` - Ver dependências

## Próximos Passos

1. Criar entidades JPA
2. Implementar repositórios
3. Desenvolver serviços
4. Criar controllers para as APIs
