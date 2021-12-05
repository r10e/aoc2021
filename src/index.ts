import { readFileSync } from 'fs';
const input: string[] = readFileSync('src/input4.txt', 'utf8').split('\n\n');

const drawn: number[] = (input.shift() || '')
	.split(',')
	.map((x: string) => parseInt(x));

class Entry {
	number: number;
	called: boolean = false;
	constructor(number: number) {
		this.number = number;
	}
	mark(): void {
		this.called = true;
	}
	toString(): string {
		return this.called ? '*' : `${this.number}`;
	}
}

class Board {
	field: Entry[][];
	hasAlreadyWon: boolean = false;
	constructor(rows: number[][]) {
		this.field = rows
			.filter((row) => row.length)
			.map((row) => row.map((number) => new Entry(number)));
	}
	hasBingo(): boolean {
		if (this.field.some((row) => row.every((entry) => entry.called))) {
			this.hasAlreadyWon = true;
			return true;
		}
		for (let i = 0; i < this.field.length; i++) {
			if (this.field.map((row) => row[i]).every((entry) => entry.called)) {
				this.hasAlreadyWon = true;
				return true;
			}
		}
		return false;
	}
	call(number: number) {
		this.field.forEach((row) =>
			row.forEach((entry) => {
				if (entry.number === number) {
					entry.mark();
				}
			}),
		);
	}
	score(): number {
		return this.field
			.flat()
			.filter((entry) => !entry.called)
			.map((entry) => entry.number)
			.reduce((x, y) => x + y, 0);
	}
	toString(): string {
		return (
			this.field
				.map((row) => row.map((entry) => entry.toString()).join(' '))
				.join('\n') + '\n\n'
		);
	}
}

const parsed = input
	.map((block) =>
		block.split('\n').map((row) =>
			row
				.split(' ')
				.filter((x) => x != '')
				.map((x) => parseInt(x)),
		),
	)
	.map((x) => new Board(x));

const winningBoard = (): number => {
	for (let drawIndex = 0; drawIndex < drawn.length; drawIndex++) {
		const number = drawn[drawIndex];
		for (let boardIndex = 0; boardIndex < parsed.length; boardIndex++) {
			const board = parsed[boardIndex];
			board.call(number);
			if (!board.hasAlreadyWon && board.hasBingo()) {
				console.log(
					`draw: ${drawIndex}, board: ${boardIndex}, score: ${
						board.score() * number
					}, winning board:\n ${board}`,
				);
			}
		}
	}
	return 0;
};

console.log(`${winningBoard()}`);
