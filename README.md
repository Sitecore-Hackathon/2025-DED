![Hackathon Logo](docs/images/hackathon.png?raw=true 'Hackathon Logo')

# Sitecore Hackathon 2025

## Team name

DED

## Category

The Unicategory

## Description

⟹ Write a clear description of your hackathon entry.

- Module Purpose
- What problem was solved (if any)
  - How does this module solve it

_You can alternately paste a [link here](#docs) to a document within this repo containing the description._

## Video link

⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)

## Pre-requisites and Dependencies

⟹ Does your module rely on other Sitecore modules or frameworks?

- List any dependencies
- Or other modules that must be installed
- Or services that must be enabled/configured

_Remove this subsection if your entry does not have any prerequisites other than Sitecore_

## Installation instructions

### Docker Build Steps

Run these steps in PowerShell:

1. `cd docker`
2. `Set-ExecutionPolicy -Scope Process Bypass`
3. `.\compose-init.ps1 -LicenseXmlPath path\to\your\license.xml`
4. `.\up.ps1`
5. `start https://xm1cm.localhost`

### Running this Application

You can see the application running by visiting our production instance here: [https://sitecore-content-export.vercel.app](https://sitecore-content-export.vercel.app).

To run the application locally, using Node, run the following commands:

1. Ensure Node.js version 22.13.1 or higher is installed
   > Using nvm? Run these commands:
   >
   > ```bash
   > $ nvm install 22.13.1
   > $ nvm use 22.13.1
   > ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the local development server:
   ```bash
   $ npm run dev
   ```
4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

⟹ Write a short clear step-wise instruction on how to install your module.

> _A simple well-described installation process is required to win the Hackathon._  
> Feel free to use any of the following tools/formats as part of the installation:
>
> - Sitecore Package files
> - Docker image builds
> - Sitecore CLI
> - msbuild
> - npm / yarn
>
> _Do not use_
>
> - TDS
> - Unicorn

for example:

1. Use the Sitecore Installation wizard to install the [package](#link-to-package)
2. ...
3. profit

### In App Configuration

If using the production environment (https://sitecore-content-export.vercel.app), or if you've completed the local development server setup, you'll need to configure instances within the app. Think of these as "connections" to your Sitecore instances.

From within the application:

1. On the left hand side of the screen, click the dropdown menu for "Content" and select the `Setup` option. Or go directly to it by visiting [/settings/instance](/settings/instance).
2. There are two options:
   - If you are using XM Cloud or already have an access token for the Authoring APIs configured, select the `Add API Token` button.
     - Once you've clicked the button, select the product, and fill in the fields.
   - If you are using XP or XM and do not currently have an access token, select the `Generate Token` button and fill in the required fields. If you have done so already, check out the section below on how to set up your Sitecore instance. This will be required to generate the token.
3. Once you have added atleast one instance, you can now use the `Export Tool` or `Copilot` pages to start working with your content.

### Setting Up Your Sitecore Instance

TODO: Dan drop details on what someone would need to do to connect this app with their own XP/XM instance.
[ ] - Add Identity Server Configuration Required
[ ] - Add details on the
[ ] - You can optionally talk about the `Generate Token` script here
[ ] - Any cors settings that need to be set up

⟹ If there are any custom configuration that has to be set manually then remember to add all details here.

_Remove this subsection if your entry does not require any configuration that is not fully covered in the installation instructions already_

<details>

## Usage instructions

⟹ Provide documentation about your module, how do the users use your module, where are things located, what do the icons mean, are there any secret shortcuts etc.

Include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

![Hackathon Logo](docs/images/hackathon.png?raw=true 'Hackathon Logo')

You can embed images of different formats too:

![Deal With It](docs/images/deal-with-it.gif?raw=true 'Deal With It')

And you can embed external images too:

![Random](https://thiscatdoesnotexist.com/)

## Comments

If you'd like to make additional comments that is important for your module entry.

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)

### ⟹ [Insert your documentation here](ENTRYFORM.md)

- Dylan Test Push
- Dan Test Push
</details>
