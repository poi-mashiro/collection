<center><h2>vs code plugin list and setting</h2></center>

### color themes
Atom One Dark Theme -- Mahmoud Ali

### editor Extended
Color Highlight -- Sergii Naumov  
filesize -- Matheus Kautzmann  
open HTML in Default Browser -- peakchen90
live server -- Ritwick Dey
code runner -- Jun Han

### coding
auto Rename Tag -- Jun Han  
ESLint -- Dirk Baeumer  
prettier - code formatter -- christian kohler  
language-stylus -- sysoev  
Path Intellisense -- Christian Kohler
Vetur -- Pine Wu  
vue 2 snippets -- hollowtree
weex -- JaylinWang
vscode wxml -- coderfee
vscode wweapp api -- coderfee

### debug
debugger for Chrome -- Microsoft  

### npm
npm -- egamma (wait for a try)  
npm instellisense -- Christian Kohler (wait for a try)  
-- use npm with node and git bash more than in vs code  

### other
vscode-fileheader -- mikey

## setting
-- some setting inherited from low version vs code  
<pre><code style="white-space: pre-line; word-break: break-all;">{
  "window.menuBarVisibility": "default",
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
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "extensions": [
      ".js",
      ".vue"
    ]
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "vue-html"
  ],
  "emmet.syntaxProfiles": {
    "javascript": "jsx",
    "vue": "html",
    "vue-html": "html"
  },
  "editor.tabSize": 2,
  "git.enabled": false,
  "beautify.tabSize": 2,
  "workbench.colorTheme": "Atom One Dark",
  "prettier.singleQuote": true,
  "stylusSupremacy.insertBraces": false,
  "stylusSupremacy.insertColons": false,
  "stylusSupremacy.insertSemicolons": false
}</code></pre>