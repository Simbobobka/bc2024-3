const { program } = require('commander');
const fs = require('fs');

// Функція для читання вхідного файлу
function readInputFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("Cannot find input file");
        process.exit(1);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Функція для запису у файл
function writeOutputFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Result written to ${filePath}`);
}

// Налаштування аргументів командного рядка
program
    .requiredOption('-i, --input <path>', 'Path to input JSON file')
    .option('-o, --output <path>', 'Path to output file')
    .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

// Перевірка, чи існує вхідний файл
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Читання вхідного файлу
const inputData = readInputFile(options.input);

// Виведення в консоль, якщо задано параметр -d
if (options.display) {
    console.log("Data:", inputData);
}

// Запис у файл, якщо задано параметр -o
if (options.output) {
    writeOutputFile(options.output, inputData);
}

// Якщо не задано жодного з параметрів -o або -d, програма не повинна виводити нічого
if (!options.output && !options.display) {
    process.exit(0);
}
