#!/usr/bin/env node
const { Command } = require("commander");
const NanoAPI = require("../index");
const program = new Command();

program.name("nanoapi").description("CLI to interact with NanoAPI Gateway");

program
  .command("ask")
  .description("Ask the AI a question")
  .argument("<prompt>", "Your question for the AI")
  .requiredOption("-k, --key <string>", "Your NanoKey")
  .action(async (prompt, options) => {
    const client = new NanoAPI(options.key);
    const result = await client.generate(prompt);
    console.log(`\n🤖 Response: ${result.data}`);
    console.log(`💰 Balance: ₹${result.balance}`);
  });

program.parse();
