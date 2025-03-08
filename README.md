![Hackathon Logo](docs/images/hackathon.png?raw=true 'Hackathon Logo')

# Sitecore Hackathon 2025

## Team name

DED

## Category

The Unicategory

## Description

### Content Export Tool for XM Cloud

The purpose of this module is to enable Sitecore authors (with limited technical ability) to flexibly and easily export content in bulk from Sitecore, using a user friendly UI that enables them to export any configuration of item and fields (no need to write Powershell scripts).

The [Content Export Tool](https://github.com/estockwell-alpert/ContentExportTool), created in 2018, is a .NET Sitecore module that provided these features, but the module is not compatible with XM Cloud since XM Cloud does not allow customizations to the CM file system. This project recreates the Content Export Tool as a standalone Node application that runs in the browser and communicates with the user's XM Cloud or XP instance through the GraphQL API, and introduces new AI features using Copilot.

## Video link

⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)

## Pre-requisites and Dependencies

- Docker Desktop

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

You can connect to application to https://edge.sitecorecloud.io, any Sitecore instance with an available GraphQL endpoint, or set up a new Sitecore instance for testing using the Docker steps above! If you want to try the application without any local setup, use the Vercel link above with any valid GraphQL endpoint or Edge.

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

### Setting Up Your Sitecore Instance

TODO: Dan drop details on what someone would need to do to connect this app with their own XP/XM instance.
[ ] - Add Identity Server Configuration Required
[ ] - Add details on the
[ ] - You can optionally talk about the `Generate Token` script here
[ ] - Any cors settings that need to be set up

⟹ If there are any custom configuration that has to be set manually then remember to add all details here.

_Remove this subsection if your entry does not require any configuration that is not fully covered in the installation instructions already_

## Using the Application

### In App Configuration

If using the production environment (https://sitecore-content-export.vercel.app), or if you've completed the local development server setup, you'll need to configure instances within the app. Think of these as "connections" to your Sitecore instances.

From within the application:

1. On the left hand side of the screen, click the dropdown menu for "Content" and select the `Setup` option. Or go directly to it by visiting [/settings/instance](/settings/instance).
2. There are two options:
   - If you are using XM Cloud or already have an access token for the Authoring APIs configured, select the `Add API Token` button.
     - Once you've clicked the button, select the product, and fill in the fields.
   - If you are using XP or XM and do not currently have an access token, select the `Generate Token` button and fill in the required fields. If you have done so already, check out the section below on how to set up your Sitecore instance. This will be required to generate the token.
3. Once you have added atleast one instance, you can now use the `Export Tool` or `Copilot` pages to start working with your content.

### Content Export:

1. Follow the In App Configuration section to to configure your instance settings
   ![Instance Configuration](https://github.com/Sitecore-Hackathon/2025-DED/blob/main/docs/images/InstanceConfiguration.png)
2. Navigate to the Content Export Tool (/Content/Export)
3. Select your Instance from the dropdown
4. Enter your filters
   - Start Item(s): One of more item IDs specifying where to pull content from, separated by comma. Defaults to the full content tree
   - Templates: One or more template ID to specify what types of items to export
   - Fields: All of the fields that you want included in the export. Null/invalid fields will return "n/a" in the export, so you can include fields that do not exist on all items
     ![Export Page](https://github.com/Sitecore-Hackathon/2025-DED/blob/main/docs/images/Export.png)
5. Click Run Export and wait for your CSV to download!

### Content Import:

Example files:

[Update Content](https://github.com/Sitecore-Hackathon/2025-DED/blob/main/docs/exampleFiles/Import-Update.csv)

[Create Content](https://github.com/Sitecore-Hackathon/2025-DED/blob/main/docs/exampleFiles/Import-Create.csv)

1. Get an Auth Token for your
2. Follow the In App Configuration section, configure an **authoring API endpoing endpoint**, e.g. https://mysite.sc/sitecore/api/authoring/graphql/v1/

   ![Instance Configuration](https://github.com/Sitecore-Hackathon/2025-DED/blob/main/docs/images/AuthoringSetup.png)

3. Navigate to the Content Export Tool (/Content/Export)
4. Select your Instance from the dropdown
5. Enter your filters
   - Start Item(s): One of more item IDs specifying where to pull content from, separated by comma. Defaults to the full content tree
   - Templates: One or more template ID to specify what types of items to export
   - Fields: All of the fields that you want included in the export. Null/invalid fields will return "n/a" in the export, so you can include fields that do not exist on all items
     ![Export Page](https://github.com/Sitecore-Hackathon/2025-DED/blob/main/docs/images/Export.png)
6. Click Run Export and wait for your CSV to download!
