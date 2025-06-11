#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function printUsage() {
  console.log('Usage: npx express-ts-prisma-starter <project-directory>');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  printUsage();
}

const targetDir = args[0];

if (fs.existsSync(targetDir)) {
  console.error(`Directory '${targetDir}' already exists. Please choose another name or remove the directory first.`);
  process.exit(1);
}

console.log(`\nCreating new project in ./${targetDir}\n`);

// Use degit to copy the template (assume this repo is public on GitHub)
const repo = 'github:ramdhanrizkij/express-prisma-typescript-starter'; // <-- CHANGE THIS to your repo

try {
  execSync(`npx degit ${repo} ${targetDir}`, { stdio: 'inherit' });
  console.log('\nProject created!');
  console.log(`\nNext steps:`);
  console.log(`  cd ${targetDir}`);
  console.log('  npm install');
  console.log('  # Configure your .env file');
  console.log('  npm run dev');
} catch (err) {
  console.error('Failed to create project:', err.message);
  process.exit(1);
} 