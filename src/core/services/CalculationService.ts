export class CalculationService {
    private static precedence: Record<string, number> = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
        '^': 3,
    };

    static calculate(expression: string): number | 'Erro' {
        try {
            // Handle square root first: √9 -> 3
            let parsedExpr = expression.replace(/√(\d+\.?\d*)/g, (_, val) => {
                return Math.sqrt(parseFloat(val)).toString();
            });

            // Clean other symbols
            const cleanExpr = parsedExpr.replace(/[^-+*/%^.0-9()]/g, '');
            if (!cleanExpr) return 0;

            const tokens = cleanExpr.match(/(\d+\.?\d*)|[+\-*/%^()]/g) || [];
            if (tokens.length === 0) return 0;

            const values: number[] = [];
            const ops: string[] = [];

            const applyOp = () => {
                if (values.length < 2) return;
                const b = values.pop()!;
                const a = values.pop()!;
                const op = ops.pop()!;

                switch (op) {
                    case '+': values.push(a + b); break;
                    case '-': values.push(a - b); break;
                    case '*': values.push(a * b); break;
                    case '/': values.push(b === 0 ? NaN : a / b); break;
                    case '%': values.push(a % b); break;
                    case '^': values.push(Math.pow(a, b)); break;
                }
            };

            tokens.forEach(token => {
                if (!isNaN(Number(token))) {
                    values.push(parseFloat(token));
                } else if (token === '(') {
                    ops.push(token);
                } else if (token === ')') {
                    while (ops.length > 0 && ops[ops.length - 1] !== '(') applyOp();
                    ops.pop();
                } else {
                    while (
                        ops.length > 0 &&
                        ops[ops.length - 1] !== '(' &&
                        this.precedence[ops[ops.length - 1]] >= this.precedence[token]
                    ) {
                        applyOp();
                    }
                    ops.push(token);
                }
            });

            while (ops.length > 0) applyOp();

            const result = values[0];
            if (isNaN(result) || !isFinite(result)) return 'Erro';
            return Number(result.toFixed(8));
        } catch (e) {
            return 'Erro';
        }
    }

    static formatDisplay(value: string | number): string {
        return String(value);
    }
}
