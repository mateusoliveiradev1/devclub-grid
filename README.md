# Calculadora Grid

Projeto simples de calculadora construída com HTML, CSS (Grid) e JavaScript. Ideal para portfólio: interface moderna, layout responsivo e código limpo.

## Recursos

- Layout com CSS Grid e tema escuro
- Responsividade total (mobile → desktop)
- Operações básicas: soma, subtração, multiplicação e divisão
- Botão AC para limpar o display
- Botão de inversão de sinal (+/−) do número atual
- Validação básica da expressão antes de calcular
- Histórico de operações com persistência local
- Suporte a teclado (0–9, + - \* / . | Enter = | Backspace | Esc)
- Alternância de tema claro/escuro com preferência salva
- Design responsivo aprimorado com tipografia moderna (Rubik) e sombras suaves
- Suporte básico a PWA (ícone e manifest) para instalação em dispositivos móveis

## Demonstração

- Abra o arquivo `index.html` diretamente no navegador
- Opcional: use uma extensão como “Live Server” do VS Code para atualização automática

## Como usar

1. Faça o download/clonagem do projeto.
2. Abra `index.html` em um navegador moderno.
3. Use os botões para inserir números e operadores. Clique em `=` para ver o resultado.

## Estrutura do projeto

```
devclub-grid/
├─ index.html
├─ assets/
│  ├─ style.css
│  ├─ script.js
│  ├─ favicon.svg
│  └─ site.webmanifest
├─ .gitignore
├─ LICENSE
└─ README.md
```

## Melhorias incluídas

- Correção do botão “+/−” para realmente inverter o sinal
- Display marcado como somente leitura para evitar edições acidentais
- Tratativa de erros e validação de entrada antes do cálculo
- Histórico com armazenamento em localStorage e botão para limpar
- Suporte completo a teclado (digitar números/operadores, Enter, Backspace, Esc)
- Responsividade com tipografia (clamp), grid flexível e transições suaves
- Melhorias de acessibilidade (ARIA labels, contraste e navegação por teclado)
- SEO básico (meta description, keywords, theme-color)
- Otimização de performance (script defer, preconnect fonts)

## Ideias futuras

- Testes automatizados de funções principais

## Tecnologias

- HTML5
- CSS3 (Grid Layout)
- JavaScript (vanilla)

## Contribuindo

Sinta-se à vontade para abrir issues e enviar pull requests com melhorias no layout, acessibilidade, testes ou novas funções.

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
