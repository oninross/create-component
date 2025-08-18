import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateComponent({
  componentName,
  styling,
  createStory,
  createTest,
  location,
  storyLocation,
}) {
  // 1️⃣ Component folder
  const basePath = path.join(location, componentName);
  await fs.ensureDir(basePath);

  // 2️⃣ Styling setup
  const styleImport =
    styling === "SCSS Module"
      ? `import styles from './${componentName}.module.scss';`
      : `import { Container } from './${componentName}.styles';`;

  const rootElement =
    styling === "SCSS Module"
      ? `<div className={styles.container}>{children}</div>`
      : `<Container>{children}</Container>`;

  // 3️⃣ Templates for the component
  const templates = [
    { src: "component.tsx", dest: `${componentName}.tsx` },
    { src: "types.ts", dest: `${componentName}.types.ts` },
    {
      src: styling === "SCSS Module" ? "module.scss" : "styles.ts",
      dest:
        styling === "SCSS Module"
          ? `${componentName}.module.scss`
          : `${componentName}.styles.ts`,
    },
  ];

  if (createTest)
    templates.push({ src: "test.tsx", dest: `${componentName}.test.tsx` });

  // 4️⃣ Generate component files
  for (const t of templates) {
    const templatePath = path.join(__dirname, "../templates", t.src);
    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    let content = await fs.readFile(templatePath, "utf-8");
    content = content
      .replace(/{{COMPONENT_NAME}}/g, componentName)
      .replace(/{{STYLE_IMPORT}}/g, styleImport)
      .replace(/{{ROOT_ELEMENT}}/g, rootElement);

    await fs.outputFile(path.join(basePath, t.dest), content);
  }

  await fs.outputFile(
    path.join(basePath, "index.ts"),
    `export { default } from './${componentName}';`
  );

  // 5️⃣ Generate Storybook story (in storyLocation)
  if (createStory) {
    const storyBase = path.join(storyLocation, componentName);
    await fs.ensureDir(storyBase);

    const storyTemplatePath = path.join(__dirname, "../templates/story.tsx");
    if (!(await fs.pathExists(storyTemplatePath))) {
      throw new Error(`Story template file not found: ${storyTemplatePath}`);
    }

    let storyContent = await fs.readFile(storyTemplatePath, "utf-8");
    storyContent = storyContent.replace(/{{COMPONENT_NAME}}/g, componentName);

    await fs.outputFile(
      path.join(storyBase, `${componentName}.stories.tsx`),
      storyContent
    );
  }
}
