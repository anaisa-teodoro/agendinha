# 📅Agenda Pessoal - Eletrônica

Uma aplicação web desenvolvida em Angular para gerenciamento de compromissos, contatos, locais e usuários. A aplicação possui autenticação JWT e suporte a dois níveis de acesso: **Administrador** e **Usuário Comum**. 

## Descrição do Projeto
Os usuários podem cadastrar compromissos, associar contatos e locais, e gerenciar suas informações. O sistema define permissões com base no nível de acesso:
- **Usuário Comum**: Pode gerenciar seus próprios compromissos e contatos.
- **Administrador**: Tem acesso completo ao sistema, podendo gerenciar compromissos, contatos, locais e usuários.

## Funcionalidades Principais

### 1. Autenticação e Controle de Acesso
- Login e logout de usuários.
- Níveis de acesso:
  - **Administrador**: Gerencia todos os compromissos, locais e usuários.
  - **Usuário Comum**: Gerencia apenas seus próprios compromissos.
- A API de autenticação foi fornecida pelo professor na URL https://api-users-gdsb.onrender.com .

### 2. Gestão de Compromissos
- Criar um novo compromisso com data, hora e descrição.
- Associar um compromisso a um contato e um local.
- Listar compromissos agendados.
- Editar e excluir compromissos (somente o dono ou um administrador).

### 3. Gestão de Contatos
- Adicionar, editar e excluir contatos.
- Associar contatos a compromissos.

### 4. Gestão de Locais
- Cadastrar locais onde os compromissos ocorrerão.
- Listar locais cadastrados (somente administradores).

---

## Modelo de Dados

### Usuário
```typescript
interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  nivelAcesso: 'admin' | 'usuario';
}
```

### Compromisso
```typescript
interface Compromisso {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  contatoId: number;
  localId: number;
  usuarioId: number; 
}
```

### Contato
```typescript
interface Contato {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
}
```

### Local
```typescript
interface Local {
  id?: number;
  nome: string;
  endereco: string;
}
```

---

## Tecnologias Utilizadas
- **Angular**: Framework para o frontend.
- **Angular Material**: Biblioteca de componentes para UI.
- **JSON Server**: Simulação de backend.
- **JWT (JSON Web Token)**: Para autenticação e controle de acesso.

---

## Regras de Acesso

| Ação                  | Usuário Comum | Administrador |
|-----------------------|---------------|---------------|
| Criar compromisso     | ✅            | ✅            |
| Editar compromisso    | ✅ (somente seus) | ✅ (todos) |
| Excluir compromisso   | ✅ (somente seus) | ✅ (todos) |
| Criar contato         | ✅            | ✅            |
| Editar contato        | ✅ (somente seus) | ✅ (todos) |
| Excluir contato       | ✅ (somente seus) | ✅ (todos) |
| Criar local           | ❌            | ✅            |
| Editar local          | ❌            | ✅            |
| Excluir local         | ❌            | ✅            |

---

## Requisitos para Rodar

### Pré-requisitos
- **Node.js**: Versão 16 ou superior.
- **npm**: Versão 8 ou superior.
- **Angular CLI**: Instale globalmente com:
  ```bash
  npm install -g @angular/cli
  ```
- **JSON Server**: Para simular a API local.

### Dependências
Instale as dependências do projeto:
```bash
npm install
npm install @angular/material @angular/cdk
```

---

## Executando o Projeto

1. Inicie o servidor Angular:
   ```bash
   ng serve
   ```
2. Acesse a aplicação em `http://localhost:4200`.

3. Inicie o JSON Server para simular o backend:
   ```bash
   json-server --watch db.json
   ```
## Caso queira, execute o Projeto via Docker 

   ```bash
 docker-compose up -d 
  ```
 

## Exemplo de Requisição para Criar um Usuário

Para criar um usuário na API do professor, envie uma requisição `POST` para o endpoint:

**URL**: `https://api-users-gdsb.onrender.com/register`

### Exemplo de Corpo da Requisição (JSON)
```json
{
  "name": "sindel",
  "email": "sindel@gmail.com",
  "password": "1234",
  "role": "user"
}

{
"name": "Raiden", 
"email":"raiden@gmail.com", 
"password":"1234", 
"role": "admin"
}
```
---
## Estrutura do Projeto

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── login/          # Tela de login
│   │   ├── compromissos/   # Gestão de compromissos
│   │   ├── contatos/       # Gestão de contatos
│   │   ├── locais/         # Gestão de locais
│   │   ├── usuarios/       # Gestão de usuários
│   ├── services/           # Serviços para comunicação com a API
│   ├── models/             # Interfaces de dados
│   ├── app-routing.module.ts # Configuração de rotas
│   ├── app.module.ts       # Módulo principal
├── assets/                 # Recursos estáticos
├── environments/           # Configurações de ambiente
│   ├── environment.ts      # Ambiente de desenvolvimento
│   ├── environment.prod.ts # Ambiente de produção

```

<br>

<p>👉 Exercício realizado nas aulas do Devs2Blu - 2025 .</p>

