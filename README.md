# 💅 manikure - Manifest Builder for Kubernetes Resources
### **Try it out:** https://manikure.netlify.app

🔎 **Manikure is a single-page web application for creating Kubernetes resource definitions (JSON/YAML manifests).** It's built with VueJS, TailwindCSS, blood, sweat and tears.

> This is a personal project, developed when I grew fed up of writing Kubernetes manifests all the time. This project is also my playground for learning modern front-end development (I'm normally a back-end engineer so this is a bit of a change for me!) 👴 I don't work on this project regularly, but in fits and starts. I come back to it infrequently, to update and add new features. Your issues and pull requests are welcome!

**Latest news (06/01/2025):** Updated the app to use shadcn-vue components, and Zod schema.

## Future roadmap

- [ ] Support for more fields in the core objects (Pod, Deployment, Service)
- [x] Support for dynamic fields in objects (e.g. environment variables, volumes) (implemented using Zod/AutoForm)
- [ ] Combine multiple objects into a Kubernetes List or OpenShift Template
- [ ] Support for creating Helm charts
- [x] Make it look nicer (Now done using shadcn-vue!)

## Project setup

If you want to build and run this application locally, you'll need _npm_ installed:

```
npm install
```

Compile and hot-reload for development (starts a web server and enables hot-reload):

```
npm run dev
```

Compile and minify for production (builds the application into the `dist/` folder):

```
npm run build
```

## Licence

(c) 2020-2024 Tom Donohue and authors. This is free software. It's provided to you under the terms of the [AGPL-3.0 License](LICENSE). You are free to copy, distribute or modify, but you must follow the terms of the licence.

### What does this licence mean?

You may copy, distribute and modify the software as long as you make your modifications available under the AGPL, along with build & install instructions.

The AGPL terms mean that these conditions also apply if you're providing this software over a network. If you're doing that, the corresponding **source code** of your modified version(s) of the software must be prominently **offered to all users** who interact with it.

For a plain English explanation of the licence, see [this guide](https://www.tldrlegal.com/license/gnu-affero-general-public-license-v3-agpl-3-0).
