import { readFileSync } from 'fs';

const addEach = (array1: number[], array2: number[]): number[] => {
	const result: number[] = [];
	for (let i = 0; i < array1.length; i++) {
		result.push(array1[i] + array2[i]);
	}
	return result;
};

const mostOften = (array1: number[], divisor: number): number[] => {
	const result: number[] = [];
	for (let i = 0; i < array1.length; i++) {
		result.push(Math.round(array1[i] / divisor));
	}
	return result;
};

const asBinary = (array: number[]): number => {
	return array
		.reverse()
		.map((bit, index) => {
			return bit * Math.pow(2, index);
		})
		.reduce((a, b) => a + b, 0);
};

const input: number[][] = readFileSync('src/input.txt', 'utf8')
	.split('\n')
	.filter((x) => x.length)
	.map((bits) => bits.split('').map((x) => parseInt(x.trim())));

const deltaArray = mostOften(
	input.reduce(
		(a, b) => {
			return addEach(a, b);
		},
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	),
	input.length,
);

const epsilonArray = deltaArray.map((x) => 1 - x);

const delta = asBinary(deltaArray);

const epsilon = asBinary(epsilonArray);

console.log(delta * epsilon);
