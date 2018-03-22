# vue-i18n 简单使用介绍

#### 安装
npm i vue-i18n -S
npm i raw-loader --save-dev（用于将html 转成字符串）

#### 使用
###### 1 准备
默认使用 vue-cli ，建议建立 src/i18n ，总之建议建立独立文件夹  
config
--index.js
i18n  
--locales  
----zh  
------index.js  
------faq.html  
----en  
------index.js  
------faq.html  
--index.js
例 faq.html  
```
<!-- zh -->
<h1>基础</h1>

<h3>1.如何开始玩XXXX？</h3>

<!-- en -->
<h1>Basis</h1>

<h3>1.How to start playing XXXX?</h3>
```
例 语言的 index.js
```
// zh
const FAQs_CONTENT = require('raw-loader!./faq.html');
module.exports = {
  'Sign In': '登录',
  Home: '首页',
  FAQs: '常见问题（FAQ）',
  'Terms of Service': '使用条款',
  'Privacy Policy': '隐私政策',
  'Contact Us': '联系我们',

  CHANGE_PRICE_COUNTDOWN_TIP: '{time}（{days} 天 {hours} 小时 {minutes} 分钟 {seconds}秒',

  FAQs_CONTENT,
}

// en
const FAQs_CONTENT = require('raw-loader!./faq.html');
module.exports = {
  'Sign In': 'Sign In',
  Home: 'Home',
  FAQs: 'FAQs',
  'Terms of Service': 'Terms',
  'Privacy Policy': 'Privacy',
  'Contact Us': 'Contact',

  CHANGE_PRICE_COUNTDOWN_TIP: 'After {time}（{days} days {hours} hours {minutes} minutes {seconds} seconds）',

  FAQs_CONTENT,
}

```

###### 2 初始化对象  i18n/index.js
```
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = [
  {
    langDisplay: '中文',
    locale: 'zh',
    aliases: ['zh', 'zh-cn', 'zh-hk', 'zh-sg', 'zh-tw'],
  },
  {
    langDisplay: 'English',
    locale: 'en',
    aliases: ['en', 'en-us', 'en-au', 'en-bz', 'en-ca', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-gb', 'en-zw'],
  }
];

const messages = {};

let userLanguage = navigator.language
let language = localStorage.getItem('language')
i18n.forEach((item) => {
  // eslint-disable-next-line
  const locale = require(`./locales/${item.locale}`);
  item.aliases.forEach((alias) => {
    messages[alias] = locale;
    if (!language && userLanguage.toUpperCase() === alias.toUpperCase()) {
      userLanguage = item.locale;
      localStorage.setItem('language', item.locale)
    }
  });
});

export default new VueI18n({
  locale: language || userLanguage || 'en',
  fallbackLocale: 'en',
  messages
});
```

###### 3 挂载到所有对象上  main.js

```
import i18n from './i18n/index';
// 其余 import 自己补充

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
```

###### 4 使用
例 app.vue 中
```
  <span class="navbar-item r link-login" @click="login">{{$t('Sign In')}}</span>
  // 切换语言
  <select class="control" name="" id="" @change="switchLang()" ref="tagSelect">
    <option value="en" :selected=" locale === 'en' ">EN</option>
    <option value="zh" :selected=" locale === 'zh' ">中文</option>
    <option value="jp" :selected=" locale === 'jp' ">日本語</option>
  </select>
```
```
  computed: {
    ...mapState(['locale'])
  },
  created() {
    this.setLocale(this.$i18n.locale)
  },
  methods: {
    // 切换语言，设置值
    switchLang() {
      let index = this.$refs.tagSelect.selectedIndex;
      let value = this.$refs.tagSelect.options[index].value;
      // let text = this.$refs.tagSelect.options[index].text;
      localStorage.setItem('language', value)
      this.$i18n.locale = value
      this.setLocale(value); // 不确定是否要更改vuex才可以影响全局，反正多写也没几行
      // console.log(index, value, text);
    },
    ...mapMutations(['setLocale'])
    //  也可以用actions的方法更新
  }
```
大块的html 模板的使用
```
<template> // template 非必须，我是用的单独的 faq.vue 文件所以这样
  <div class="common privacy" v-html="$t('FAQs_CONTENT')">
  </div>
</template>
```

###### 5 其他
核心用法就是 {{ $t('字段名') }}， 带变量的用法还没实际用到  
没有大段的html使用需求，也可以使用 json 文件存储语言对应的文字