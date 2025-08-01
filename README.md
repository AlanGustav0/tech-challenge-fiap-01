# Tech Challenge Fiap

## Tecnologias utilizadas no projeto
#### • Node version 20.19.0
#### • Next.js 14
#### • Figma
#### • json-server

---------------------------------------------------------------

# Orietações para execução do projeto

Para executar o projeto, siga os passos abaixo:

**Subida do projeto Next.js abra o terminal e execute o comando abaixo**

- npm run dev

*O projeto será executado na porta 3000*

**Subida do banco de dados json-server, abra outro terminal e execute o comando abaixo**

- npm run json-server

*O banco de dados será executado na porta 4000*

**O projeto já possui um usuário criado para testes, para realizar o login, utilize o usuário de teste abaixo**

usuario: teste@email.com
senha: 123456

---------------------------------------------------------------

# 🚀 Instalação e Configuração do Docker Desktop no Windows

## 📥 Passo 1: Download do Docker Desktop
1. Acesse [docker.com](https://www.docker.com/products/docker-desktop).
2. Clique em **Download for Windows (Windows 10/11)**.
3. Aguarde o download do instalador `.exe`.

## 🛠️ Passo 2: Instalação
1. Execute o instalador baixado.
2. Marque a opção **"Use WSL 2 instead of Hyper-V"** (recomendado).
3. Clique em **Install**.
4. Após a instalação, clique em **Close and restart**.

## 🔄 Passo 3: Configuração Inicial
1. Após reiniciar, abra o Docker Desktop.
2. Faça login com sua conta Docker Hub.
3. Verifique se o Docker está rodando na bandeja do sistema (ícone de baleia).

## ⚙️ Passo 4: Verificar a instalação
1. Abra o **Prompt de Comando** ou o **PowerShell**.
2. Execute: `docker --version` → confirma a versão instalada.
3. Execute: `docker run hello-world` → testa a instalação executando um contêiner básico.

## 🧪 Passo 5: Primeiros passos

Para inicialiar o docker neste projeto, basta abrir o terminal e ir tá a pasta do projeto, então digitar os comandos abaixo:

`docker build -t tech-challenge-fiap-01 .` **(faz o build e cria um container para o projeto)**

`docker run -p 3000:3000 --name tech-challenge tech-challenge-fiap-01` **(executa o projeto na porta 3000)**

##  Link do projeto no Vercel

https://tech-challenge-fiap-01.vercel.app/