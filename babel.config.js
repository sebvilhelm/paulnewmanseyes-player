module.exports = {
  plugins: ["@vanilla-extract/babel-plugin"],
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
};
