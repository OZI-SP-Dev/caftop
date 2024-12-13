# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Permission setup

- Site level permissions
  - Owners - Full Control
  - Members - Read
  - Focal Point - Read
- Broken permissions
  - caftops
    - Owners - Full control
    - Members - Contribute
    - Focal Point - CAFTOPItemLevel
- Custom permission levels
  - CAFTOPItemLevel - Contribue plus Approve Items for use at Item Level

## PowerAutomate setuup

- Ensure the trigger action has the following trigger condition, which will ensure it only fires when needed
  - @not(equals(triggerBody()?['PMandTOMAandAuthorIds'],triggerBody()?['PMandTOMAandAuthorIdsTrigger']))
- Update the trigger action to the correct site
- Update the "Initialize SiteURL" action to the current site
- Update the "Initialize RoleDefId" action to the Id of the CAFTOPItemLevel permission level on the current site
- Update the "Initialize Focal Point GroupId" action to reflect the Id of the Focal Point Group
- Update the "Valid Group Name Array" action - to ensure prefix matches site - Example "CAFTOP UAT", "CAFTOP DEV", or "CAFTOP"

## What does the PowerAutomate do?

The PowerAuotmate is triggered when an item in the `caftops` list is updated, but a trigger condition limits it to only those where `PMandTOMAandAuthorIds` does not equal `PMandTOMAandAuthorIdsTrigger`. When it runs, it does the following:

1. Checks to see if the Group for the Program Name / PEC combination has already been created.
2. If it hasn't, then it creates it, and stores the GroupId back in the appropriate record within the `ProgramNamesAndElementCodes` list
3. It ensures the Author of the item is added to the new/existing group
4. It breaks inheritence on the `caftops` entry
5. It grants this new/existing Group the `CAFTOPItemLevel` permission to the item
6. It grants the Focal Group the `CAFTOPItemLevel` permission to the item
7. It determines which members need added/removed from the group
8. It Adds the users needing added
9. It Removes the users needing removed
10. It updates the CAFTOP entries `PMandTOMAandAuthorIdsTrigger` field to be the value of `PMandTOMAandAuthorIds` (thus preventing future updates from running unless users are changed)
