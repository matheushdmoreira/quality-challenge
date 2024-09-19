# Quality - App

Esta aplicação foi desenvolvida como um desafio para a empresa Quality. 🚀

## Executando o projeto

Abaixo seguem as instruções para você executar o projeto em sua máquina.

Comece clonando o repositório:

```sh
git clone https://github.com/matheushdmoreira/quality-challenge
```

### Back-end

O back-end desse projeto é construído em Node.js, mais especificamente sua versão LTS.

> Você pode instalar o Node.js seguindo [esse guia](https://efficient-sloth-d85.notion.site/Instalando-o-Node-js-d40fdabe8f0a491eb33b85da93d90a2f).

> Você pode instalar o Docker acessando (https://www.docker.com).

Após instalar o Node.js e o Docker, vamos acessar a pasta server do projeto, instalar as dependências, rodar a imagem do docker com o banco de dados e, então, subir o servidor HTTP.

```sh
cd server

# Instalando as dependências
npm install

# Rodando a imagem do docker
docker compose up -d

# Subir o servidor HTTP
npm run start:dev
```

### Front-end

O front-end desse projeto é construído com Vite.

Acessar a pasta web do projeto, instalar as dependências e, então, subir o servidor.

```sh
cd web

# Instalando as dependências
npm install

# Subir o servidor
npm run dev
```

## Links rápidos ↗

**🏧 Server:**

- [Fastify](https://fastify.dev)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
- [Zod](https://zod.dev)
- [DateFNS](https://date-fns.org/docs/Getting-Started#installation)

**💻 Web:**

- [Vite](https://vitejs.dev/guide/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React Router](https://reactrouter.com/en/main/start/tutorial)
- [DateFNS](https://date-fns.org/docs/Getting-Started#installation)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/installation)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [React Hook Form](https://react-hook-form.com)
- [Sonner](https://sonner.emilkowal.ski)
- [Tailwindcss](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com)
- [Zod](https://zod.dev)

## License

MIT License © [Matheus Moreira](https://github.com/matheushdmoreira)

