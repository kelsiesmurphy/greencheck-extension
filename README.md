# GreenCheck Web Extension

GreenCheck is a browser extension that identifies websites running on green energy and does analysis on the site’s carbon emissions.

It was built using Plasmo, a framework to build web extensions, and integrates Typescript, TailwindCSS, customised Shadcn components and multiple APIs.

## Plasmo Instructions

### Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

For further guidance, [visit the Plasmo Documentation](https://docs.plasmo.com/)

### Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.
