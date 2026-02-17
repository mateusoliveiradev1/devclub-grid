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
  lista.push({ expr: String(expr), res: String(res) });
  salvarHistorico(lista);
  renderizarHistorico();
}

function limparHistorico() {
  localStorage.removeItem("calcHistory");
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

document.addEventListener("DOMContentLoaded", renderizarHistorico);
