import inquirer from "inquirer";
import { selectFolder } from "./folderSelector.js";

export async function promptUser() {
  const basicAnswers = await inquirer.prompt([
    {
      name: "componentName",
      message: "Component name (PascalCase):",
      validate: (val) =>
        /^[A-Z][A-Za-z0-9]+$/.test(val) ? true : "Use PascalCase only",
    },
    {
      type: "list",
      name: "styling",
      message: "Styling choice:",
      choices: ["SCSS Module", "Styled Components"],
    },
    {
      type: "confirm",
      name: "createStory",
      message: "Create Storybook story?",
      default: true,
    },
    {
      type: "confirm",
      name: "createTest",
      message: "Create Jest test?",
      default: true,
    },
  ]);

  const location = await selectFolder(process.cwd());
  return { ...basicAnswers, location };
}
