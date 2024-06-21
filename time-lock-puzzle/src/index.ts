import Puzzle from 'crypto-puzzle'

async function main(): Promise<void> {
    const puzzle = await Puzzle.generate({
        opsPerSecond: 3_200_000,
        duration: 5_000,
        message: "What is 2 + 2?"
    });
    const solution = await Puzzle.solve(puzzle);

    // after 5 sec duration...
    console.log(solution);
}

main();