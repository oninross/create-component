#!/usr/bin/env node
import chalk from "chalk";
import { promptUser } from "../lib/utils.js";
import { generateComponent } from "../lib/generator.js";

(async () => {
  try {
    const options = await promptUser();
    await generateComponent(options);
    console.log(chalk.green("✅ Component scaffolding complete!"));
  } catch (err) {
    console.error(chalk.red("❌ Error:"), err.message);
  }
})();
