/** @type {import('svgo').Config} */
export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
        },
      },
    },
    "removeDimensions",
    {
      name: "removeAttrs",
      params: {
        attrs: ["data-*", "inkscape:*", "sodipodi:*"],
      },
    },
  ],
};
