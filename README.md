# FactSet API Salesforce Recipes

A collection of code examples for Lightning Web Components using FactSet's APIs. FactSet offers powerful APIs to help integrate your financial data needs within your applications, web portals and statistical packages.

More information on FactSet's API can be found [here](https://developer.factset.com/).

## FactSet API Documentation

[Signals API](https://developer.factset.com/api-catalog/signals-api)

## Installation Instructions

### Prerequisites

This is a list of tools that you will require for using and developing the recipes:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)
- [Code formatting and linting](#Optional-Installation-Instructions)

### Installing Recipes using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

1. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone the factset-api-demo repository:

    ```
    git clone https://github.com/factset/factset-api-salesforce-recipes
    cd factset-api-salesforce-recipes
    ```

1. Create a Developer API Key by [following the instructions here](https://developer.factset.com/authentication).

1. Replace `<MY-API-KEY>` in the file `force-app\main\default\classes\signals\FetchSignals.cls` with the newly generated API Key.

1. Create a scratch org and provide it with an alias (**factset-api-salesforce-recipes** in the command below):

    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a factset-api-salesforce-recipes
    ```

1. Push the app to your scratch org:

    ```
    sfdx force:source:push
    ```

1. Open the scratch org:

    ```
    sfdx force:org:open
    ```

1. Go to `Setup -> Security -> Remote Site Settings` and add the endpoint `https://api.factset.com`.

1. Next, follow *How to add the components* section

## How to add the components 

### **Signals API components**

#### Multiple Accounts Signals Component

1. In App Launcher, click **View All** then select the **Sales** app. This will load the *Home* page.

1. In Setup, click on **Edit Page**.

1. In the *Components* list, under *Custom*, drag the `signalsRecentAccounts` component onto the page.

1. Click `Save`.

1. Make sure to have some accounts created in order for the Signals to be fetched. 

*Accounts need to have the `Ticker Symbol` filled with a valid stock ticker*

#### Single Account Signals Component

1. In App Launcher, click **View All** then select the **Sales** app. This will load the *Home* page.

1. Navigate to **Accounts** tab and click on one of the account. 

1. In Setup, click on **Edit Page**.

1. In the *Components* list, under *Custom*, drag the `signalsAccount` or `signalsAccountTable` component onto the page.
    * `signalsAccount` is a Lightning Web Component that uses the [lightning-accordion](https://developer.salesforce.com/docs/component-library/bundle/lightning-accordion/example) component to display the data
    * `signalsAccountTable` is a Lightning Component that uses the [lightning-datatable](https://developer.salesforce.com/docs/component-library/bundle/lightning:datatable/example) component to display the data

1. Click `Save`.

*The account needs to have the `Ticker Symbol` filled with a valid stock ticker*


1. In App Launcher, select the **LWC** app.

## Optional Installation Instructions

This repository contains several files that are relevant if you want to integrate modern web development tooling to your FactSet API Recipes development processes, or to your continuous integration/continuous deployment processes.

### Code formatting

[Prettier](https://prettier.io/) is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](/.prettierignore) and [.prettierrc](/.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

### Code linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintignore](/.eslintignore) file is provided as part of this repository to exclude specific files from the linting process in the context of Lightning Web Components development.
