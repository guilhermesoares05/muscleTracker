[Teste a aplicação aqui](https://mk-grvdeveloper.netlify.app/)

# Muscle Tracker - Acompanhamento de Evolução na Musculação

Uma aplicação SPA (Single Page Application) desenvolvida em React para acompanhar a evolução semanal de praticantes de musculação. A aplicação utiliza armazenamento local (LocalStorage) para manter os dados do usuário e oferece visualização de gráficos e geração de certificado após 12 semanas de acompanhamento.

## Características

- **Registro de Dados Iniciais**: Coleta nome, idade, peso, altura e cálculo automático do IMC
- **Acompanhamento Semanal**: Registro de medidas semanais (peito, bíceps, cintura, quadril e coxa)
- **Armazenamento Local**: Todos os dados são salvos no navegador usando LocalStorage
- **Visualização de Gráficos**: Gráficos interativos mostrando evolução das medidas ao longo das semanas
- **Histórico de Evoluções**: Lista completa de todos os registros com datas
- **Barra de Progresso**: Visualização do progresso em relação às 12 semanas
- **Certificado de Conclusão**: Geração automática de certificado em PDF após completar 12 semanas
- **Design Mobile-First**: Interface responsiva otimizada para dispositivos móveis

## Estrutura do Projeto

```
muscle_tracker/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   │   ├── Dashboard.tsx
│   │   │   ├── InitialProfileForm.tsx
│   │   │   ├── WeeklyEvolutionForm.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── EvolutionHistory.tsx
│   │   │   └── EvolutionChart.tsx
│   │   ├── models/          # Tipos TypeScript
│   │   │   └── types.ts
│   │   ├── services/        # Lógica de negócio
│   │   │   ├── storageService.ts
│   │   │   └── certificateService.ts
│   │   ├── hooks/           # Hooks customizados
│   │   │   └── useMuscleTracker.ts
│   │   ├── pages/           # Páginas da aplicação
│   │   │   └── Home.tsx
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Ponto de entrada
│   │   └── index.css        # Estilos globais
│   └── index.html
├── package.json
└── README.md
```

## Como Usar

### Instalação

1. Clone o repositório ou extraia os arquivos do projeto
2. Navegue até o diretório do projeto:
   ```bash
   cd muscle_tracker
   ```

3. Instale as dependências:
   ```bash
   pnpm install
   ```

### Executar a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000` (ou outra porta se 3000 estiver em uso).

### Compilar para Produção

Para criar uma versão otimizada para produção:

```bash
pnpm build
```

Os arquivos compilados estarão no diretório `dist/`.

## Fluxo de Uso

### 1. Preenchimento Inicial

Ao acessar a aplicação pela primeira vez, você será solicitado a preencher seus dados iniciais:

- **Nome**: Seu nome completo
- **Idade**: Sua idade em anos
- **Peso**: Seu peso atual em quilogramas
- **Altura**: Sua altura em centímetros

Após preencher, clique em "Iniciar Acompanhamento" para começar.

### 2. Registro de Evolução Semanal

A cada semana, você pode registrar suas medidas:

- **Peito**: Medida em centímetros
- **Bíceps**: Medida em centímetros
- **Cintura**: Medida em centímetros
- **Quadril**: Medida em centímetros
- **Coxa**: Medida em centímetros

Clique no botão "Registrar Evolução Semana X" para adicionar um novo registro.

### 3. Visualização de Progresso

O dashboard exibe:

- **Dados Pessoais**: Resumo com idade, peso, altura e IMC
- **Barra de Progresso**: Visualização das semanas completadas (máximo 12)
- **Gráfico de Evolução**: Linha mostrando a evolução de cada medida ao longo das semanas
- **Histórico**: Lista de todos os registros com datas

### 4. Conclusão e Certificado

Após registrar a 12ª semana, um botão "📜 Baixar Certificado" aparecerá. Clique nele para gerar e baixar um certificado em PDF com:

- Seu nome
- Dados pessoais
- Evolução de medidas principais (peito, bíceps, cintura)
- Data de emissão

## Tecnologias Utilizadas

- **React 19**: Framework JavaScript para construção de interfaces
- **TypeScript**: Tipagem estática para melhor qualidade de código
- **Tailwind CSS 4**: Framework CSS utilitário para estilização
- **Recharts**: Biblioteca para criação de gráficos interativos
- **jsPDF**: Geração de documentos PDF
- **Wouter**: Roteamento leve para SPA
- **shadcn/ui**: Componentes UI de alta qualidade

## Armazenamento de Dados

Todos os dados são armazenados localmente no navegador usando a API LocalStorage. Os dados incluem:

- Perfil do usuário (nome, idade, peso, altura)
- Histórico de evoluções semanais com todas as medidas
- Data e hora de cada registro

**Importante**: Os dados são específicos do navegador e do dispositivo. Se você limpar o histórico do navegador ou usar outro navegador/dispositivo, os dados serão perdidos.

## Padrão de Arquitetura

A aplicação segue o padrão **MVC** (Model-View-Controller):

- **Models** (`client/src/models/`): Definição de tipos e estruturas de dados
- **Views** (`client/src/components/` e `client/src/pages/`): Componentes React responsáveis pela apresentação
- **Controllers** (`client/src/services/` e `client/src/hooks/`): Lógica de negócio e gerenciamento de estado

## Responsividade

A aplicação foi desenvolvida com abordagem **mobile-first**, garantindo ótima experiência em:

- Dispositivos móveis (smartphones)
- Tablets
- Desktops

O layout se adapta automaticamente ao tamanho da tela.

## Validação de Dados

A aplicação valida todos os inputs do usuário:

- Campos obrigatórios devem ser preenchidos
- Idade deve ser maior que 13 anos
- Peso e altura devem ser maiores que zero
- Medidas devem ser maiores que zero

Mensagens de erro são exibidas em tempo real para guiar o usuário.

## Dicas de Uso

1. **Consistência**: Registre suas medidas no mesmo dia da semana para melhor comparação
2. **Precisão**: Use fita métrica para medir com precisão
3. **Backup**: Se precisar trocar de navegador/dispositivo, anote seus dados
4. **Certificado**: Guarde o certificado PDF como comprovante de conclusão

## Suporte e Contribuições

Para dúvidas ou sugestões sobre a aplicação, consulte a documentação do código ou entre em contato com o desenvolvedor.

## Licença

Este projeto é fornecido como está para fins educacionais e pessoais.

---

**Desenvolvido com ❤️ para ajudar você a acompanhar sua evolução na musculação!**
