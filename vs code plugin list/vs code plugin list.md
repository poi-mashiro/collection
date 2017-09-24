<center><h2>vs code plugin list and setting</h2></center>

### color themes
#### none can satisfy me, I decide to write one for myself one day
Atom One Dark Theme -- Mahmoud Ali  
Cobalt2 Theme Official -- Wes Bos  
Darcula Theme -- rokoroku  
Flatland Monokai Theme -- gerane  
Hackers Haze Theme -- Nuuf  
JetJet-theme -- Jhony Georges  
Material Neutral Theme -- bernardodsanderson  
Meterial Palenight Theme -- whizkydee  

### editor Extended
Beautify css/sass/css/less -- michelemelluso  
Color Highlight -- Sergii Naumov  
filesize -- Matheus Kautzmann  

### coding
auto Rename Tag -- Jun Han  
Beautify -- HookyQR (wait for a try)  
ESLint -- Dirk Baeumer  
language-stylus -- sysoev  
Path Intellisense -- Christian Kohler
Vetur -- Pine Wu  

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
  "fileheader.Author": "",
  "fileheader.LastModifiedBy": "",
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
  "window.zoomLevel": 0,
  "fileheader.tpl": "/*\r\n * @Author: {author} \r\n * @Date: {createTime} \r\n * @Last Modified by:   {lastModifiedBy} \r\n * @Last Modified time: {updateTime} \r\n */\r\n",
  "git.enabled": false,
  "beautify.tabSize": 2,
  "workbench.colorTheme": "Red"
}</code></pre>