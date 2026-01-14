🅰️ VetHypnos - Frontend (Cliente Web)

Este diretório contém a interface do usuário do sistema, desenvolvida em Angular 16+. Aqui estão as telas, componentes, serviços de consumo de API e estilos.

🚀 Como Rodar o Frontend

O Angular precisa de um servidor de desenvolvimento Node.js rodando no terminal para funcionar.

Passo 1: Instalar Dependências (Obrigatório na 1ª vez)

Dentro da pasta frontend, execute:

    npm install


Isso vai ler o arquivo package.json e baixar todas as bibliotecas necessárias para a pasta node_modules.

Passo 2: Iniciar o Servidor

Para ver o site funcionando e editá-lo em tempo real:

    ng serve


Ou, se quiser abrir o navegador automaticamente:

    ng serve -o


Acesse em: http://localhost:4200/

🔄 Como Atualizar o Projeto

Para garantir que seu ambiente local tenha as mesmas funcionalidades e bibliotecas que o resto da equipe:

Baixar atualizações do código:

    git pull origin develop


Atualizar bibliotecas (Importante):
Se alguém instalou um novo plugin (ex: um calendário novo), o código vai quebrar se você não rodar:

    npm install


Dica: Sempre que der erro de "Module not found" após um git pull, rode este comando.

🏗️ Comandos Úteis do Angular

Criar um novo Componente:

    ng g c components/nome-do-componente


Criar um novo Serviço:

    ng g s services/nome-do-servico


Gerar versão final para produção (Build):

    ng build


(Isso cria a pasta dist/ com os arquivos otimizados para colocar no servidor real)

📂 Estrutura de Pastas

/src/app/components: Onde ficam as telas e partes visuais (Header, Modal, Tabelas).

/src/app/components/hdk: É a biblioteca personalizada do projeto, contando com seus componentes genéricos.

/src/app/services: Arquivos que chamam o Backend (PHP).

/src/app/models: Interfaces TypeScript para tipar os dados.

/src/assets: Imagens, ícones e arquivos estáticos.

/src/environments: Configuração da URL da API (Local vs Produção).