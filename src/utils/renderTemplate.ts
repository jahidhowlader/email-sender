// renderTemplate.ts
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';

export default async function renderTemplate(templateName: string, variables: Record<string, any>) {
  const templatePath = path.join(__dirname, '../mail/templates', `${templateName}.ejs`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  const content = fs.readFileSync(templatePath, 'utf-8');
  return ejs.render(content, variables);
}
