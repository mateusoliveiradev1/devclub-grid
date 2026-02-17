function adicionarCaractere(caracter) {
  const display = document.querySelector(".display");
  let valor = display.value || "";

  if (valor === "Erro") valor = "";

  const operadores = ["+", "-", "*", "/"];
  const ultimo = valor.slice(-1);

  if (operadores.includes(caracter)) {
    if (valor.length === 0 && caracter !== "-") return;
    if (operadores.includes(ultimo)) {
      valor = valor.slice(0, -1);
    }
  }

  display.value = valor + caracter;
}

function limparDisplay() {
  document.querySelector(".display").value = "";
}

function calcularResultado() {
  const display = document.querySelector(".display");
  const expressao = display.value;

  if (!expressao) return;

  const permitido = /^[0-9+\-*/().\s]+$/;
  if (!permitido.test(expressao)) {
    display.value = "Erro";
    return;
  }

  try {
    const resultado = eval(expressao);
    if (typeof resultado !== "number" || !isFinite(resultado)) {
      display.value = "Erro";
    } else {
      display.value = resultado;
      adicionarAoHistorico(expressao, resultado);
    }
  } catch (_) {
    display.value = "Erro";
  }
}

function inverterSinal() {
  const display = document.querySelector(".display");
  let valor = display.value;
  if (!valor || valor === "Erro") return;

  const temOperadorInterno = /[+\-*/].+/.test(valor.replace(/^\-/, ""));

  if (temOperadorInterno) {
    display.value = `(${valor})*-1`;
  } else {
    if (valor.startsWith("-")) {
      display.value = valor.slice(1);
    } else {
      display.value = "-" + valor;
    }
  }
}

function apagarUltimo() {
  const display = document.querySelector(".display");
  if (display.value === "Erro") {
    display.value = "";
    return;
  }
  display.value = display.value.slice(0, -1);
}

function obterHistorico() {
  try {
    return JSON.parse(localStorage.getItem("calcHistory") || "[]");
  } catch {
    return [];
  }
}

function salvarHistorico(lista) {
  localStorage.setItem("calcHistory", JSON.stringify(lista.slice(-50)));
}

function renderizarHistorico() {
  const ul = document.getElementById("history-list");
  if (!ul) return;
  ul.innerHTML = "";
  const lista = obterHistorico();
  lista
    .slice()
    .reverse()
    .forEach((item) => {
      const li = document.createElement("li");
      const expr = document.createElement("span");
      expr.textContent = item.expr;
      const res = document.createElement("strong");
      res.textContent = item.res;
      li.appendChild(expr);
      li.appendChild(res);
      ul.appendChild(li);
    });
}

function adicionarAoHistorico(expr, res) {
  const lista = obterHistorico();
  lista.push({ expr: String(expr), res: String(res), ts: Date.now() });
  salvarHistorico(lista);
  renderizarHistorico();
}

function limparHistorico() {
  localStorage.removeItem("calcHistory");
  renderizarHistorico();
}

function reutilizarDoHistorico(index) {
  const lista = obterHistorico();
  const item = lista[index];
  if (!item) return;
  const display = document.querySelector(".display");
  display.value = item.expr;
}

function copiarDoHistorico(index) {
  const lista = obterHistorico();
  const item = lista[index];
  if (!item) return;
  const texto = `${item.expr} = ${item.res}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto);
  }
}

function excluirDoHistorico(index) {
  const lista = obterHistorico();
  if (index < 0 || index >= lista.length) return;
  lista.splice(index, 1);
  salvarHistorico(lista);
  renderizarHistorico();
}

document.addEventListener("keydown", (e) => {
  const tecla = e.key;
  if (/^[0-9]$/.test(tecla)) {
    adicionarCaractere(tecla);
    return;
  }
  if (["+", "-", "*", "/", "."].includes(tecla)) {
    adicionarCaractere(tecla);
    e.preventDefault();
    return;
  }
  if (tecla === "Enter" || tecla === "=") {
    calcularResultado();
    e.preventDefault();
    return;
  }
  if (tecla === "Backspace") {
    apagarUltimo();
    e.preventDefault();
    return;
  }
  if (tecla === "Escape") {
    limparDisplay();
    e.preventDefault();
  }
});

function aplicarTema(theme) {
  const body = document.body;
  const btn = document.getElementById("themeToggle");
  if (theme === "light") {
    body.classList.add("theme-light");
    if (btn) {
      btn.setAttribute("aria-pressed", "true");
      btn.textContent = "Tema: Claro";
    }
  } else {
    body.classList.remove("theme-light");
    if (btn) {
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "Tema: Escuro";
    }
  }
}

function alternarTema() {
  const atual = localStorage.getItem("theme") || "";
  const proximo = atual === "light" ? "dark" : "light";
  localStorage.setItem("theme", proximo);
  aplicarTema(proximo);
}

function inicializarTema() {
  let theme = localStorage.getItem("theme");
  if (!theme) {
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    theme = prefersLight ? "light" : "dark";
  }
  aplicarTema(theme);
}

function formatarData(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

function renderizarHistorico() {
  const ul = document.getElementById("history-list");
  if (!ul) return;
  ul.innerHTML = "";
  const lista = obterHistorico();
  lista
    .slice()
    .reverse()
    .forEach((item, idx) => {
      const realIndex = lista.length - 1 - idx;
      const li = document.createElement("li");
      const left = document.createElement("div");
      left.style.display = "flex";
      left.style.flexDirection = "column";
      const expr = document.createElement("span");
      expr.className = "history-expr";
      expr.textContent = `${item.expr} =`;
      const meta = document.createElement("small");
      meta.style.opacity = "0.7";
      meta.textContent = formatarData(item.ts);
      const res = document.createElement("strong");
      res.className = "history-res";
      res.textContent = item.res;
      left.appendChild(expr);
      left.appendChild(res);
      left.appendChild(meta);
      const actions = document.createElement("div");
      actions.className = "history-actions";
      const btnReuse = document.createElement("button");
      btnReuse.className = "history-reuse";
      btnReuse.textContent = "Usar";
      btnReuse.addEventListener("click", () => reutilizarDoHistorico(realIndex));
      const btnCopy = document.createElement("button");
      btnCopy.className = "history-copy";
      btnCopy.textContent = "Copiar";
      btnCopy.addEventListener("click", () => copiarDoHistorico(realIndex));
      const btnDel = document.createElement("button");
      btnDel.className = "history-delete";
      btnDel.textContent = "Excluir";
      btnDel.addEventListener("click", () => excluirDoHistorico(realIndex));
      actions.appendChild(btnReuse);
      actions.appendChild(btnCopy);
      actions.appendChild(btnDel);
      li.appendChild(left);
      li.appendChild(actions);
      ul.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarTema();
  renderizarHistorico();
});
