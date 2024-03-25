import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  entries: ["src/index", "src/strict", "src/react", "src/nest"],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
