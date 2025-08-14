import inquirer from "inquirer";
import fs from "fs";
import path from "path";

export async function selectFolder(currentPath = process.cwd()) {
  const items = fs
    .readdirSync(currentPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const choices = ["📁 Select this folder"];

  if (currentPath !== path.parse(currentPath).root) {
    choices.push("../ Go up");
  }

  choices.push(...items);

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: `Select folder in: ${currentPath}`,
      choices,
      pageSize: 20,
    },
  ]);

  if (choice === "📁 Select this folder") return currentPath;
  if (choice === "../ Go up") return selectFolder(path.dirname(currentPath));

  return selectFolder(path.join(currentPath, choice));
}
