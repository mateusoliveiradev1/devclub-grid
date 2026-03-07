export type Operator = '+' | '-' | '*' | '/';

export interface HistoryItem {
    id: string;
    expression: string;
    result: string | number;
    timestamp: number;
}

export interface CalculatorState {
    display: string;
    previousOp: string;
    history: HistoryItem[];
    theme: 'dark' | 'light';
}
