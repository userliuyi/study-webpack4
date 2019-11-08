module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    //如果没有使用extends就配置为：eslint-loader,extends:"eslint:recommended"；
    // 使用了extends就配置为： "extends": ["plugin:vue/essential"],
   /* "extends": "eslint:recommended",*/
    "extends": [
        "plugin:vue/essential",
    ],
	"plugins": [
		"html", "vue"
	],
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module",
        "ecmaVersion": 7,
        "ecmaFeatures": {
            "jsx": true
        }
    }, 
   
    "rules": {
        "indent": [
            "error", 
            4
        ],
        "linebreak-style": [
            "error", 
            "windows"
        ],
        "quotes": [
            "error", 
            "single"
        ],
        "semi": [
            "error", 
            "always"
        ],
        "no-console": 'off',   //可以使用console
        "no-unused-vars": 'off'  //允许变量定义了未使用
    }
};
