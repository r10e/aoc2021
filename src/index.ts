import { readFileSync } from 'fs';

class Instruction {
	constructor(input: string = '') {
		const [direction, by] = input.split(' ');
		switch (direction) {
			case 'forward': {
				this.forward = parseInt(by);
				break;
			}
			case 'down': {
				this.down = parseInt(by);
				break;
			}
			case 'up': {
				this.up = parseInt(by);
				break;
			}
		}
	}
	forward: number = 0;
	down: number = 0;
	up: number = 0;
}

class Position {
	constructor(horizontal: number = 0, depth: number = 0, aim: number = 0) {
		this.horizontal = horizontal;
		this.depth = depth;
		this.aim = aim;
	}
	horizontal: number;
	depth: number;
	aim: number;


	move1(by: Instruction): Position {
		return new Position(
			this.horizontal + by.forward,
			this.depth + by.down - by.up,
			this.aim
		);
	}

	move2(by: Instruction): Position {
		if (by.forward) {
			return new Position(
				this.horizontal + by.forward,
				this.depth + this.aim * by.forward,
				this.aim,
			);
		} else {
			return new Position(
				this.horizontal,
				this.depth,
				this.aim + by.down - by.up,
			);
		}
	}

	result1(): number {
		return this.horizontal * this.depth;
	}
}

const input: string[] = readFileSync('src/input.txt', 'utf8').split('\n');

console.log(
	input
		.map((str) => new Instruction(str))
		.reduce((pos: Position, move: Instruction) => {
			const newPosition = pos.move1(move);
			return newPosition;
		}, new Position())
		.result1(),
);


console.log(
	input
		.map((str) => new Instruction(str))
		.reduce((pos: Position, move: Instruction) => {
			const newPosition = pos.move2(move);
			return newPosition;
		}, new Position())
		.result1(),
);
