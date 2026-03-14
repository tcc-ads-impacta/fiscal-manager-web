# Fiscal Manager Web

Frontend da aplicação de Controle Doméstico de Notas Fiscais. Este projeto foi desenvolvido como MVP para entrega acadêmica (TCC), focando em usabilidade, arquitetura baseada em componentes e pragmatismo na integração de dados.

## Visão Geral Técnica

A solução adota o padrão **Standalone Components** do Angular, eliminando a complexidade de módulos globais e promovendo o isolamento estrutural. A arquitetura *Feature-Based* garante a separação clara entre a lógica de roteamento, o gerenciamento de estado e a apresentação visual (UI).

## Docker

Para facilitar os testes e a avaliação da banca, disponibilizei o arquivo `docker-compose.yml` que provisiona toda a infraestrutura (Frontend, Backend e Banco de Dados) simultaneamente. Link: [Download Docker Compose](https://gist.github.com/naassom-pedro/c7f3bdd33486a473f87f007f53b76547).  

Com ele, você pode executar todo o projeto diretamente via Docker, sem precisar configurar ambientes locais de desenvolvimento.

1. Baixe o arquivo `docker-compose.yml` no link compartilhado acima.
2. Salve o arquivo em um diretório vazio.
3. Abra o terminal nesse diretório e execute:

```bash
docker compose pull
docker compose up -d
```

## Tech Stack
- **Framework:** Angular 21 (Standalone Components)
- **Language:** TypeScript
- **UI Library:** PrimeNG
- **CSS Utility:** PrimeFlex
- **HTTP Client:** HttpClient / RxJS
- **Infrastructure:** NGINX (via Docker Container) para o build de produção

## Arquitetura da Solução

O diretório src/app/ está dividido em 3 camadas lógicas principais:

1. **Core:** Serviços Singleton (InvoiceService, ThemeService), configurações de injeção de dependência e modelos estritos (DTOs). Lida exclusivamente com a comunicação com a API.
2. **Features:** Módulos de negócio (Dashboard, formulários, listagens). Contém Smart Components que orquestram a interface gráfica e gerenciam assinaturas de Observables.
3. **Shared:** Componentes de apresentação ("dumbs") e pipes utilitários reutilizáveis por toda a aplicação.

## Guia de Execução (Getting Started)

Siga os passos abaixo para rodar a aplicação em ambiente local de desenvolvimento.

### Pré-requisitos

- Node.js (Versão LTS recomendada)
- Angular CLI (Opcional, os comandos podem ser executados via npx ou npm run)

### 1. Clonar o Repositório

```Bash
git clone [https://github.com/tcc-ads-impacta/fiscal-manager-web.git](https://github.com/tcc-ads-impacta/fiscal-manager-web.git)
cd fiscal-manager-web
```

### 2. Instalar Dependências

Execute o gerenciador de pacotes para baixar as bibliotecas do PrimeNG e as definições do TypeScript:

```bash
npm install
```

### 3. Executar o Frontend

Inicie o servidor de desenvolvimento nativo do Angular:

```bash
npm start
```

A aplicação será compilada e estará disponível no navegador em http://localhost:4200

