// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations

// EsLint 规则表
// http://eslint.cn/docs/rules/
module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // 全局环境
  env: {
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
    // // 允许使用ES语法
    // ecmaVersion: 6,
    // // 允许解析JSX
    // ecmaFeatures: {
    //   jsx: true,
    // },
    // // extraFileExtensions: [".vue"],
  },
  // plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["taro/vue3"],
  /*
  "off"或者0    //关闭规则关闭
  "warn"或者1    //在打开的规则作为警告（不影响退出代码）
  "error"或者2    //把规则作为一个错误（退出代码触发时为1）
  */
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }], //缩进
    "linebreak-style": ["error", "unix"], //换行符风格 |unix|windows|
    quotes: ["error", "double"], //使用双引号或单引号
    semi: ["error", "always"], //语句末尾使用分号
    "comma-dangle": ["error", "always-multiline"], //禁止使用拖尾逗号
    eqeqeq: "error", //需要使用 `===` and `!==`
    curly: ["error", "multi-line"], //需要遵循花括号约定,括号风格
    "no-unused-vars": "off", //禁止出现未使用过的变量
    "no-undef": "error", // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-useless-escape": "error", // 禁用不必要的转义字符
    "no-console": "error", // 提交的代码禁止出现console
    "no-debugger": "error", // 提交的代码禁止出现debugger
    "no-throw-literal": "warn", //禁止抛出异常字面量
    // "@typescript-eslint/no-explicit-any": ["off"] //关闭any类型的警告
  },
  ignorePatterns: ["dist", "**/*.d.ts"],
};
