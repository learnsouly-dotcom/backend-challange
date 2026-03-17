# Password Validator API

API para validação de senhas, construída com NestJS com Express e TypeScript, Jest para unitários e com Supertest para end-to-end

## Pré-requisitos

- Node.js >= 20

## Como executar

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run start:dev

# rodar testes unitários
npm test

# rodar testes e2e
npm run test:e2e

# cobertura de testes
npm run test:cov
```

A aplicação sobe na porta 3000 por padrão.

## Uso da API

```
POST /passwords/validate
Content-Type: application/json

{ "password": "AbTp9!fok" }
```

Resposta (senha válida):

```json
{ "isValid": true, "failedRules": [] }
```

Resposta (senha inválida):

```json
{ "isValid": false, "failedRules": ["MinLength", "HasDigit"] }
```

Os valores possíveis em `failedRules` são: `MinLength`, `HasDigit`, `HasLowercase`, `HasUppercase`, `HasSpecialChar`, `NoRepeatedChars`, `NoWhitespace`.

## Decisões técnicas

### Cada regra é um validator isolado

A principal decisão foi separar cada regra de validação em sua própria classe (`MinLengthValidator`, `HasDigitValidator`, etc.), todas implementando a interface `PasswordValidator`. O service recebe a lista de validators por injeção de dependência e usa `.filter()` para identificar quais regras falharam, retornando tanto o resultado booleano quanto a lista de regras violadas.

Fiz assim porque achei que ficava claro o que cada regra faz, fácil de testar individualmente, e se precisar adicionar ou remover uma regra no futuro é só mexer no módulo — o service não muda.

### Injeção via token

Os validators são registrados no módulo com um token (`PASSWORD_VALIDATORS`) e injetados como array no service. Isso desacopla o service das implementações concretas e facilita mockar nos testes unitários do service.

### Validação do DTO com class-validator

Usei `ValidationPipe` do NestJS com `@IsString()` e `@IsNotEmpty()` no DTO. Isso garante que a API retorna 400 antes de chegar no controller quando o body é inválido (campo faltando, tipo errado, string vazia). A validação de regras de negócio fica exclusivamente nos validators.

### Estrutura de testes

- **Testes unitários** dos validators: testam cada regra de forma isolada com casos de boundary (ex: 8 chars false, 9 chars true no min length).
- **Teste unitário do service**: usa mocks dos validators para testar só a orquestração (todos passam = true, um falha = false, lista vazia = true).
- **Testes e2e**: testam a API de ponta a ponta com os exemplos do enunciado, violações individuais de cada regra e validações do DTO.

## Premissas

- **Espaços em branco**: o enunciado diz que "não devem ser considerados como caracteres válidos". Interpretei como: se a senha contém qualquer whitespace (espaço, tab, newline), ela é inválida. O exemplo `"AbTp9 fok" → false` confirma isso.

- **Case sensitive na repetição**: `'a'` e `'A'` são caracteres diferentes. O enunciado não menciona case insensitive, então assumi que a comparação é exata. O `Set` do JavaScript já funciona assim.

- **String vazia retorna 400**: como usei `@IsNotEmpty()` no DTO, `{ password: "" }` retorna 400 (bad request) em vez de 200 com `{ isValid: false }`. Considerei esse o comportamento correto — string vazia é input inválido, não uma senha inválida. Os testes unitários do `MinLengthValidator` cobrem o caso `"" → false` diretamente.

## Estrutura do projeto

```
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── context/
│   │   └── request-context.ts
│   ├── interceptors/
│   │   └── logging.interceptor.ts
│   └── middleware/
│       └── request-id.middleware.ts
└── password/
    ├── password.module.ts
    ├── password.controller.ts
    ├── password.service.ts
    ├── dto/
    │   └── validate-password.dto.ts
    └── validators/
        ├── password-validator.interface.ts
        ├── min-length.validator.ts
        ├── has-digit.validator.ts
        ├── has-lowercase.validator.ts
        ├── has-uppercase.validator.ts
        ├── has-special-char.validator.ts
        ├── no-repeated-chars.validator.ts
        └── no-whitespace.validator.ts
```
