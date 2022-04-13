// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations

// EsLint 规则表
// http://eslint.cn/docs/rules/
module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 全局环境
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  // 指定如何解析语法。可以为空，但若不为空，只能配该值
  parser: "vue-eslint-parser",
  // 优先级低于parse的语法解析配置
  parserOptions: {
    // 指定ESlint的解析器
    parser: "@typescript-eslint/parser",
    // 允许使用import
    sourceType: "module",
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
    // // extraFileExtensions: [".vue"],
  },
  // plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "taro/vue3",
    "plugin:vue/vue3-strongly-recommended",
    // "plugin:vue/base",
    // "plugin:vue/vue3-essential",
    // "plugin:@typescript-eslint/recommended",
  ],
  /*
  "规则名": [规则值, 规则配置]
  "off"或者0    //关闭规则关闭
  "warn"或者1    //在打开的规则作为警告（不影响退出代码）
  "error"或者2    //把规则作为一个错误（退出代码触发时为1）
  */
  rules: {
    //对模板中的自定义组件强制执行 v-on 事件命名样式
    "vue/v-on-event-hyphenation": [0, "never"],
    // 强制每行的最大属性数 (在vue中，每个标签的属性数量不能超过该值)
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    //在标签的右括号之前需要或不允许有空格
    "vue/html-closing-bracket-spacing": [
      2,
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always",
      },
    ],
    //在单行元素的内容之前和之后需要换行符
    "vue/singleline-html-element-content-newline": 0,
    // 关闭any类型的警告
    // "@typescript-eslint/no-explicit-any": ["off"]
    //========================================================
    //缩进
    indent: [2, 2, { SwitchCase: 1 }],
    //换行符风格 |unix|windows|
    "linebreak-style": [2, "unix"],
    //使用双引号或单引号
    quotes: [2, "double"],
    //语句末尾使用分号
    semi: [2, "always"],
    //禁止使用拖尾逗号
    "comma-dangle": [2, "always-multiline"],
    //需要使用 `===` and `!==`
    eqeqeq: 2,
    //需要遵循花括号约定,括号风格
    curly: [2, "multi-line"],
    //禁止出现未使用过的变量
    "no-unused-vars": "off",
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undef": 2,
    // 禁用不必要的转义字符
    "no-useless-escape": 2,
    // 提交的代码禁止出现console
    "no-console": 2,
    // 提交的代码禁止出现debugger
    "no-debugger": 2,
    //禁止抛出字面量错误 throw "error"
    "no-throw-literal": 2,
    //禁用行尾空白
    "no-trailing-spaces": [
      2,
      {
        //(默认) 禁止在空行使用空白符
        skipBlankLines: false,
        // (默认) 禁止在注释块中使用空白符
        ignoreComments: false,
      },
    ],
    //禁止在对象字面量中禁止空白
    "no-whitespace-before-property": 2,
    //不能有不规则的空格
    "no-irregular-whitespace": 2,
    //禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [2, false],
    //不能用多余的空格
    "no-multi-spaces": 2,
    //空行最多不能超过2行
    "no-multiple-empty-lines": [1, { max: 2 }],
    //禁止使用alert confirm prompt
    "no-alert": 2,
    //禁止在条件中使用常量表达式 if(true) if(1)
    "no-constant-condition": 2,
    //在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-keys": 2,
    //switch中的case标签不能重复
    "no-duplicate-case": 2,
    //禁止省略浮点数中的0 .5 3.
    "no-floating-decimal": 2,
    //禁止使用eval
    "no-eval": 2,
    //禁止使用隐式eval
    "no-implied-eval": 2,
    //禁止扩展native对象
    "no-extend-native": 2,
    //变量初始化时不能直接给它赋值为undefined
    "no-undef-init": 2,
    //禁用var，用let和const代替
    "no-var": 2,
    //禁用with
    "no-with": 2,
    //是否允许非空数组里面有多余的空格
    "array-bracket-spacing": [2, "never"],
    //强制驼峰法命名
    camelcase: [
      2,
      {
        // (默认) 强制驼峰法命名
        properties: "always",
        // 允许使用下划线的命名(string[])
        allow: [],
      },
    ],
    //禁止在代码后使用内联注释
    "no-inline-comments": 0,
    //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    "new-cap": 2,
    // 强制在花括号中使用一致的空格
    "object-curly-spacing": ["error", "always"],
    // 强制在注释中使用一致的空格
    "spaced-comment": ["error", "always"],
    //对象字面量中冒号的前后空格
    "key-spacing": [2, { beforeColon: false, afterColon: true }],
    //小括号里面要不要有空格
    "space-in-parens": [0, "never"],
    //中缀操作符周围要不要有空格==>(a + b)
    "space-infix-ops": 2,
    //强制数组元素间出现换行
    "array-element-newline": [2, { multiline: true, minItems: 3 }],
    //数组括号换行
    "array-bracket-newline": [2, { multiline: true }],
    //回调嵌套深度
    "max-nested-callbacks": [2, { max: 2 }],
    //要求方法链中每个调用都有一个换行符
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 2 }],
    // 强制在花括号内使用一致的换行符
    // "object-curly-newline": ["error", { minProperties: 1 }],
    //强制将对象的属性放在不同的行上
    // "object-property-newline": "error",
  },
  ignorePatterns: ["dist", "**/*.d.ts", "src/types","src/components/ec-canvas"],
};

//整个文件范围内禁止规则出现警告   将/* eslint-disable */放置于文件最顶部===============
/* eslint-disable */

//将需要忽略的代码块用注释包裹起来============
/* eslint-disable */
// alert('foo');
/* eslint-enable */

//将需要忽略的代码块用注释包裹起来==================
/* eslint-disable no-alert, no-console */
// alert('foo');
// console.log('bar');
/* eslint-enable no-alert, no-console */

//在指定行上禁用指定的某个规则============
// alert("foo"); // eslint-disable-line no-alert
// eslint-disable-next-line no-alert
// alert("foo");

//在某个特定的行上禁用多个规则==============
// alert("foo"); // eslint-disable-line no-alert, quotes, semi
// eslint-disable-next-line no-alert, quotes, semi
// alert("foo");

//对指定行禁用规则警告==============
// alert("foo"); // eslint-disable-line
// eslint-disable-next-line
// alert("foo");
