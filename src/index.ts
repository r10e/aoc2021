import { readFileSync } from 'fs';

const input: number[] = readFileSync('src/input.txt', 'utf8')
	.split('\n')
	.map((x: string) => parseInt(x));

let threes: number[] = [];

input.forEach((depth, index) => {
	if (index >= 2) {
		const lastThree = depth + input[index - 1] + input[index - 2];
		threes.push(lastThree);
	}
});
let increases = 0;

threes.forEach((sumOfThree, index) => {
	const lastSum = threes[index - 1];
	if (index > 0 && sumOfThree > lastSum) {
		increases++;
	}
});

console.log(increases);
