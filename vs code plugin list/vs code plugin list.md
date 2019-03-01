<center><h2>vs code plugin list and setting</h2></center>

### color themes
* Atom One Dark Theme -- Mahmoud Ali
* Night Owl -- sarah.drasner

### editor Extended
* Color Highlight -- Sergii Naumov  
* filesize -- Matheus Kautzmann  
* open HTML in Default Browser -- peakchen90  
* live server -- Ritwick Dey  
* code runner -- Jun Han  
* import cost -- Wix  
* todo tree -- Gruntfuggly  
* minify -- HookyQR  


### coding
* auto Rename Tag -- Jun Han  
* ESLint -- Dirk Baeumer  
* prettier - code formatter -- christian kohler  
* language-stylus -- sysoev  
* Path Intellisense -- Christian Kohler
* Vetur -- Pine Wu  
* weex -- JaylinWang  
* vscode wweapp api -- coderfee    
* codeMetrics -- Kiss Tamas    
* DOtENV -- mikestead  
* GraphQL for VSCode -- kumar-harsh  
* language-stylus -- sysoev
* Manta's Stylus Supremacy -- thisismanta
* minapp -- qiu8310
* VS Live Share -- Microsoft


### debug
* debugger for Chrome -- Microsoft  

### npm
* npm instellisense -- Christian Kohler

### other
* vscode-fileheader -- mikey

## setting
```json
{
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.formatOnPaste": true,
  "editor.tabSize": 2,
  "html.format.preserveNewLines": true,
  "[javascript]": {},
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  "prettier.singleQuote": true,
  "editor.fontFamily": "Consolas, '微软雅黑', 'Courier New', monospace",
  "editor.wordWrap": "on",
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": true
  },
  "fileheader.Author": "poi-mashiro",
  "fileheader.LastModifiedBy": "poi-mashiro",
  "fileheader.tpl": "/*\r\n * @Author: {author} \r\n * @Date: {createTime} \r\n * @Last Modified by:   {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n */\r\n",
  "eslint.options": {
    "extensions": [
      ".js",
      ".vue"
    ]
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    "vue-html"
  ],
  "emmet.syntaxProfiles": {
    "javascript": "jsx",
    "vue": "html",
    "vue-html": "html"
  },
  "editor.wordWrapColumn": 120,
  "stylusSupremacy.insertBraces": false,
  "stylusSupremacy.insertColons": false,
  "stylusSupremacy.insertSemicolons": false,
  "liveServer.settings.mount": [],
  "window.zoomLevel": 0,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "prettier.eslintIntegration": false,
  "prettier.printWidth": 120,
  "files.associations": {
    "*.wxss": "css",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "prettier.trailingComma": "es5",
  "tslint.autoFixOnSave": true,
  "vetur.format.defaultFormatter.ts": "vscode-typescript",
  "workbench.colorTheme": "Night Owl",
  "editor.fontSize": 10,
  "eslint.alwaysShowStatus": true
}
```
