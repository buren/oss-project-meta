const schema = {
  project: {
    name: ``,
    ingress: ``,
    prerequisites: ``,
    installation: ``,
    test: ``, // optional
    deployment: ``, // optional
    builtWith: ``, // optional
    license: ``, // valid license
    contributing: ``,
    acknowledgments: ``, // optional
  }
};

const hN = (size, title) => `${'#'.repeat(size)} ${title}`;
const section = (title, content) => `${title}

${content}

`;
const h1 = title => hN(1, title);
const h2 = title => hN(2, title);
const h3 = title => hN(3, title);
const h1Section = (title, content) => section(h1(title), content);
const h2Section = (title, content) => section(h2(title), content);
const h3Section = (title, content) => section(h3(title), content);

const generateReadme = project => {
  const parts = [];
  parts.push(`${h1(project.name)}

${project.ingress}

## Getting started

`);

  if (project.prerequisites) {
    parts.push(h3Section('Prerequisites', project.prerequisites));
  }

  parts.push(h3Section('Installation', project.installation));

  if (project.test) {
    parts.push(h2Section('Test', project.test));
  }

  if (project.deployment) {
    parts.push(h2Section('Deployment', project.deployment));
  }

  if (project.builtWith) {
    parts.push(h2Section('Built with', project.builtWith));
  }

  // TODO: Support separate contributing file
  if (project.contributing) {
    parts.push(h2Section('Contributing', project.contributing));
  }

  if (project.license) {
    parts.push(h2Section('License', project.license));
  }

  if (project.acknowledgments) {
    parts.push(h2Section('Acknowledgments', project.acknowledgments));
  }

  return parts.join('');
};
