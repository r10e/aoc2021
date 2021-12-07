import { readFileSync } from 'fs';


const crabPositions: number[] = readFileSync('src/input', 'utf8')
	.split(',')
	.map((number) => parseInt(number));
const start = Math.min(...crabPositions);
const end = Math.max(...crabPositions);

const result = Math.min(
	...Array.from(Array(end - start + 1).keys())
		.map((x) => x + start)
		.map((position) =>
			crabPositions
				.map((crabPosition) => {
					const difference = Math.abs(position - crabPosition);
					// return difference;
					return (difference * difference + difference) / 2;
				})
				.reduce((a, b) => a + b, 0),
		),
);

console.log(result); // 336701
