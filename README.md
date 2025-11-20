# Chronos - Projeto

## Sumário
1. Membro do Grupo 52 
2. Definição do Projeto  
3. Requisitos Técnicos 
4. Requisitos Funcionais 
5. Fluxograma  
6. Prova de conceito
7. Configuração de ambiente
8. Estrutura da aplicação 
9. Processo de Desenvolvimento  
10. Relatos dos Desafios Superados  
11. Entregas  
12. Bônus
13. Melhorias futuras
14. Conclusão

## Membro do Grupo 52
- Gustavo Rocha - RM365401

## Definição do Projeto
O projeto *Chronos* consiste em uma plataforma de postagem de conteúdo voltada para docentes e alunos, permitindo centralizar informações acadêmicas através possibilitando criar, editar, visualizar e buscar postagens.

## Requisitos Técnicos
- *Desenvolvimento em React*  
  - Utilizar React para desenvolver a interface gráfica.  
  - Utilização de hooks e componentes funcionais.  

- *Estilização e responsividade*  
  - Utilizar Styled Components ou outro método de estilização.  
  - Garantir que a aplicação seja responsiva, funcionando bem em dispositivos móveis e desktops.  

- *Integração com Back-End*  
  - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir posts.  
  - Gerenciar o estado da aplicação com ferramentas como Context API ou Redux (opcional).

- *Documentação*  
  - Documentação técnica detalhada do front-end no README do repositório, incluindo setup inicial, arquitetura da aplicação e guia de uso. 

## Requisitos Funcionais
1. *Página principal (Lista de posts)*:
    - Exibir uma lista de todos os posts disponíveis.
    - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
    - Incluir um campo de busca para filtrar posts por palavras-chave.

2. *Página de leitura de post*:
    - Exibir o conteúdo completo de um post selecionado.
    - Permitir comentários nos posts (opcional).

3. *Página de criação de postagens*:
    - Formulário para que docentes possam criar postagens.
    - Campos para título, conteúdo e autor.
    - Botão para enviar o post ao servidor.

4. *Página de edição de postagens*:
    - Formulário para que os(as) professores(as) possam editar postagens existentes.
    - Carregar os dados atuais do post para edição.
    - Botão para salvar as alterações.

5. *Página administrativa*:
    - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
    - Botões para editar e excluir postagens específicas.

6. *Autenticação e autorização*:
    - Implementar login para professores.
    - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.

## Fluxograma Chronos

### Fluxo da aplicação - Chronos.
Esse diagrama detalha o funcionamento interno da aplicação Chronos, demonstrando estruturação da aplicação e fluxo de informação.

### Pipeline da aplicação - Chronos.
1. Desenvolvimento local: Cada feature é desenvolvida isoladamente.

2. GitHub – Integração Contínua:
    - Commits são enviados para o repositório.
  - Workflow executa:
    - Configuração do ambiente Ubuntu;
    - Setup Node.js e dependências;
    - Verifica consistências do código TypeScript;
    - Build do projeto front-end.

3. GitHub – Entrega Contínua:
    - Faz o build da aplicação Chronos;
    - Realiza login no DockerHub;
    - Cria a imagem Docker e faz push para o DockerHub.
    - Deploy no Render: A aplicação é implantada no serviço Render a partir do repositório no GitHub.

## Prova de conceito.
Conforme os requisitos técnicos e funcionais do documento formalizado do Tech Challenge da fase 3 do curso de Full Stack Development denominado "6FSDT - Fase 3 - Tech challenge" disponibilizado na plataforma da FIAP, a entrega final do projeto engloba todos os requisitos solicitados nesta fase foram entregues, sendo eles citados acima no tópico 3 (Requisitos Técnicos) e 4 (Requisitos Funcionais) do súmario. A seguir, são relacionados cada tópico com sua respectiva entrega em forma de evidência.

### Requisitos técnicos
1. *Desenvolvimento em React*:

2. *Estilização e responsividade*:

3. *Integração com back-end*:

4. *Documentação*:

### Requisitos funcionais
1. *Página principal (Lista de posts)*:
    - Exibir uma lista de todos os posts disponíveis.
    - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
    - Incluir um campo de busca para filtrar posts por palavras-chave.

(Print-screen da tela)

2. *Página de leitura de post*:
    - Exibir o conteúdo completo de um post selecionado.
    - Permitir comentários nos posts (opcional).

(Print-screen da tela)

3. *Página de criação de postagens*:
    - Formulário para que docentes possam criar postagens.
    - Campos para título, conteúdo e autor.
    - Botão para enviar o post ao servidor.

(Print-screen da tela)

4. *Página de edição de postagens*:
    - Formulário para que os(as) professores(as) possam editar postagens existentes.
    - Carregar os dados atuais do post para edição.
    - Botão para salvar as alterações.

(Print-screen da tela)

5. *Página administrativa*:
    - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
    - Botões para editar e excluir postagens específicas.

(Print-screen da tela)

6. *Autenticação e autorização*:
    - Implementar login para professores.
    - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.

(Print-screen da tela)

#### Interfaces gráficas de postagens.
- Página principal (Lista de posts)  
  - Exibir uma lista de todos os posts disponíveis.
  - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
  - Incluir um campo de busca para filtrar posts por palavras-chave.

- Página de leitura de post  
  -  Exibir o conteúdo completo de um post selecionado.
  - Permitir comentários nos posts (opcional).

- Página de criação de postagens
  - Formulário para que docentes possam criar postagens.
  - Campos para título, conteúdo e autor.
  - Botão para enviar o post ao servidor.

- Página de edição de postagens
  - Formulário para que os(as) professores(as) possam editar postagens existentes.
  - Carregar os dados atuais do post para edição.
  - Botão para salvar as alterações.

- Página administrativa
  - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
  - Botões para editar e excluir postagens específicas.
  
- Autenticação e autorização
  - Implementar login para professores.
  - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.

## Configuração de ambiente.
Recomenda-se que os pré-requisitos de instalação de tecnologia em seu ambiente de execução sejam os seguintes, listados abaixo. Após verificar as tecnologicas instaladas, siga o procedimento em seguida para inicializar o projeto.

 - NodeJS: 20.19.5
 - Docker: 28.3.2
 - Git: 2.43.0

1. Clonar o repositório disponível no GitHub através do link: https://github.com/MyNameIsGustavo/TechChallengeFase3.git

2. 

4. Instalar o docker desktop em seu ambiente local através da URL: https://docs.docker.com/desktop/setup/install/windows-install/

5. Para replicação completa do ambiente no qual foi desenvolvido o projeto, instale o WSL com a distribuição Ubuntu. Para mais instruções siga está documentação oficial distribuida pela Microsoft: https://learn.microsoft.com/pt-br/windows/wsl/install

6. 

7. 

8. 

## Estrutura da aplicação

1. .github
- Caminho: .github/
- Responsabilidade: Realizar o processo de configuração de CI e CD do projeto no GitHub Actions.

2. node_modules
- Caminho: node_modules/
- Responsabilidade: Armazenar o código fonte das bibliotecas instaladas modularmente através do NPM;

3. public
- Caminho: public/
- Responsabilidade: Armazenar arquivos públicos que serão expostos em um projeto de front-end, como por exemplo: imagens e icones.   

4. app/
- Caminho: src/app
- Responsabilidade: Armazenar o códigos-fonte das telas através de nomes mnemônicos.    

5. componentes
- Caminho: src/componentes
- Responsabilidade: Armazenar o códigos-fonte de componentes React do projeto.

6. contexto
- Caminho: src/contexto
- Responsabilidade: Armazenar os contextos do projeto React de front-end através da Context API nativo.

7. interfaces
- Caminho: src/interfaces
- Responsabilidade: Armazenar as interfaces do projeto front-end.

8. modelos
- Caminho: src/modelos
- Responsabilidade: Caracterizar de forma computacional e padronizada as entidades do sistema front-end através de solicitações para o back-end.

9. rotas
- Caminho: src/rotas
- Responsabilidade: Gerenciar o roteamento das telas da aplicação front-end do projeto.

10. servicos
- Caminho: src/servicos
- Responsabilidade: Realizar de forma modular a conexão com o serviço back-end do projeto.

11. bootstrap.d.ts
- Caminho: src/bootstrap.d.ts
- Responsabilidade: Declarar de módulo explicito o módulo de estilização do Bootstap.

12. index.css
- Caminho: src/index.css
- Responsabilidade: Centralizar as estilizações padrões do projeto front-end através de CSS.

13. index.tsx
- Caminho: src/index.tsx
- Responsabilidade: Centralizar os módulos da aplicação do projeto front-end.

14. .env.development.local
- Caminho: .env.development.local
- Responsabilidade: Variáveis de ambiente de desenvolvimento do projeto front-end.

15. .gitignore
- Caminho: .gitignore
- Responsabilidade: Arquivo do git para remover arquivos do versionamento de código do projeto front-end.

16. docker-compose.dev.yaml
- Arquivo: docker-compose.dev.yaml
- Responsabilidade: Orquestração de containers da aplicação de desenvolvimento.

17. docker-compose.prod.yaml
- Arquivo: docker-compose.prod.yaml
- Responsabilidade: Orquestração de containers da aplicação de produção.

18. dockerfile
- Arquivo: dockerfile
- Responsabilidade: Arquivo de entrada para container Docker.

19. package.json
- Arquivo: package.json
- Responsabilidade: Gerenciamento de dependências e scripts

20. package-lock.json
- Caminho: package-lock.json
- Responsabilidade: Registro das versões instaladas

21. README.md
- Caminho: README.md
- Responsabilidade: Documentação do projeto front-end.

22. tsconfig.json
- Caminho: tsconfig.json
- Responsabilidade: Configuração do TypeScript.

## Processo de Desenvolvimento

### Planejamento das funcionalidades 
O processo de desenvolvimento da Fase 03 da pós-tech em full-stack development na FIAP, focado no front-end, foi orientado pelos aprendizados e eventos das fases anteriores, considerando os pilares já construídos ao longo do curso. O planejamento organizado inicialmente contemplava a entregas solicitadas via requisitos técnicos e funcionais no prazo informado.

Utilizando o back-end desenvolvido previamente, esta etapa concentrou-se na criação de interfaces gráficas fluidas, intuitivas e objetivas. Outro aspecto importante considerado durante o desenvolvimento do projeto foi a padronização das cores e da identidade visual da central de ensino fictícia criada, o Chronos.

As tarefas foram organizadas com base nas experiências adquiridas nos projetos das Fases 01 e 02, iniciando pela estruturação da documentação, definição da arquitetura, construção da aplicação e, somente depois, pelo desenvolvimento do código-fonte.

### Tecnologias e ferramentas 

Todas as tecnologias, ferramentas e padrões de arquitetura utilizados neste projeto foram selecionados com base no conteúdo abordado durante a Fase 03 do curso de Full Stack Development – Pós-Tech. O objetivo foi garantir coerência com os aprendizados teóricos, além de possibilitar a absorção prática e a consolidação do conhecimento adquirido ao longo da fase.

 - React: Biblioteca principal para construção da interface do usuário por meio de componentes reutilizáveis.
 - TypeScript: Adotado para garantir tipagem estática, aumentando a segurança, manutenção e previsibilidade do código.
 - Bootstrap: Aplicado para agilizar o desenvolvimento da interface com componentes visuais prontos e responsividade.
 - Git: Controlar versões, organizar o histórico de alterações e permitir trabalho colaborativo.
 - Render: Plataforma escolhida para hospedagem e deploy automatizado da aplicação em ambiente de produção.
 - GitHub Actions (CI/CD): Configurado para automatizar o build, testes e deploy contínuo diretamente a partir do repositório.
 - React Hook Form: Gerenciar formulários com performance, validação simplificada e mínimo re-render.
 - Axios: Realizar requisições HTTP à API, facilitando autenticação, interceptação e tratamento de erros.
 - Docker: Utilizado para containerizar a aplicação, garantindo ambientes padronizados e facilitando o deploy em produção.

## Relatos dos Desafios Superados
*Gustavo Rocha - RM365401*:

## Entregas

- *Apresentação em vídeo gravado*  
    - Conforme procedimento validado na fase 01 da pós-tech, o vídeo de apresentação gravado foi disponibilizado na plataforma Youtube para acesso irrestrito dos professores e avaliadores. O vídeo foi gravado com o intuito de apresentar apenas o essencial do projeto para que não ficasse uma apresentação muita longa, sendo complementar com a documentação do projeto. O vídeo pode ser acessado através da seguinte URL: 

- *Código-fonte do projeto*  
    - O código-fonte e a documentação está disponibilizado na plataforma GitHub no repositório do projeto e pode ser acessado através da URL: 

    - Além disso, também é possível acessar apenas a imagem de produção do Docker do projeto através do DockerHub na seguinte URL: 

- *Arquivos utilizados na apresentação*  
    - Todos os arquivos utilizados na apresentação do vídeo serão entregues em forma de evidência neste documento "README.md" do projeto. Durante o processo da apresentação foi criado slides de exemplicação do conteúdo e, está evidência, também será entregue e disponibilizada através da seguinte URL: 

## Bônus

## Melhorias futuras

## Conclusão
