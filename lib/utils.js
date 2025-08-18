import inquirer from "inquirer";
import { selectFolder } from "./folderSelector.js";

export async function promptUser() {
  // 1️⃣ Component name
  const { componentName } = await inquirer.prompt([
    {
      name: "componentName",
      message: "Component name (PascalCase):",
      validate: (val) =>
        /^[A-Z][A-Za-z0-9]+$/.test(val) ? true : "Use PascalCase only",
    },
  ]);

  // 2️⃣ Component location
  const location = await selectFolder(process.cwd());

  // 3️⃣ Styling choice
  const { styling } = await inquirer.prompt([
    {
      type: "list",
      name: "styling",
      message: "Styling choice:",
      choices: ["SCSS Module", "Styled Components"],
    },
  ]);

  // 4️⃣ Test creation
  const { createTest } = await inquirer.prompt([
    {
      type: "confirm",
      name: "createTest",
      message: "Create Jest test?",
      default: true,
    },
  ]);

  // 5️⃣ Story creation
  const { createStory } = await inquirer.prompt([
    {
      type: "confirm",
      name: "createStory",
      message: "Create Storybook story?",
      default: true,
    },
  ]);

  // 6️⃣ Story location (default: component folder)
  let storyLocation = location;
  if (createStory) {
    const { useDefault } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useDefault",
        message: `Use component folder (${location}) for the story?`,
        default: true,
      },
    ]);

    if (!useDefault) {
      storyLocation = await selectFolder(process.cwd());
    }
  }

  return {
    componentName,
    styling,
    location,
    createTest,
    createStory,
    storyLocation,
  };
}
