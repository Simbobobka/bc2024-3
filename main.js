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
    fs.writeFileSync(filePath, data, 'utf8');
    console.log(`Result written to ${filePath}`);
}


program
    .requiredOption('-i, --input <path>', 'Path to input JSON file')
    .option('-o, --output <path>', 'Path to output file')
    .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

function formatBondData(bond) {
    return `${bond.StockCode}-${bond.ValCode}-${bond.Attraction}`;
}

const inputData = readInputFile(options.input);

const formattedResults = inputData.map(formatBondData).join('\n');
// Виведення в консоль, якщо задано параметр -d
if (options.display) {
    console.log(formattedResults);
}

// Запис у файл, якщо задано параметр -o
if (options.output) {
    writeOutputFile(options.output, formattedResults);
}

// Якщо не задано жодного з параметрів -o або -d, програма не повинна виводити нічого
if (!options.output && !options.display) {
    process.exit(0);
}