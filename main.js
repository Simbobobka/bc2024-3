const { program } = require('commander');
const fs = require('fs');

function readInputFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("Cannot find input file");
        process.exit(1);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function writeOutputFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Result written to ${filePath}`);
}

program
    .requiredOption('-i, --input <path>', 'Path to input JSON file')
    .option('-o, --output <path>', 'Path to output file')
    .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

const inputData = readInputFile(options.input);


if (options.display) {
    console.log("Data:", inputData);
}


if (options.output) {
    writeOutputFile(options.output, inputData);
}

if (!options.output && !options.display) {
    process.exit(0);
}
