import { readFileSync } from 'fs';

const input: number[] = readFileSync('src/input.txt', 'utf8')
	.split('\n')
	.map((x: string) => parseInt(x));


let increases = 0;

input.forEach((depth, index) => {
	if (index > 0 && depth > input[index - 1]) {
		increases++;
	}
});

console.log(increases);
