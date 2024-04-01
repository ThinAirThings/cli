#!/usr/bin/env node

// src/cli.tsx
import { program as program2 } from "@commander-js/extra-typings";

// package.json
var package_default = {
  name: "@thinairthings/cli",
  version: "1.0.1",
  license: "MIT",
  bin: {
    thinair: "dist/cli.js"
  },
  type: "module",
  engines: {
    node: ">=16"
  },
  scripts: {
    build: "tsup",
    dev: "tsc --watch",
    npmpub: 'npm run build && git add . && git commit -m "mod" && git push && npm version patch && npm publish --access public',
    start: "npm run build && node dist/cli.js",
    raizer: "tsup --out-dir .raizer src/raizer/main.tsx && node .raizer/main.js ",
    commit: "npx cz",
    prepublishOnly: "npm run build"
  },
  files: [
    "dist"
  ],
  repository: {
    type: "git",
    url: "git+https://github.com/thinairthings/cli.git"
  },
  dependencies: {
    "@commander-js/extra-typings": "^12.0.1",
    "@pulumi/aws": "^6.28.1",
    "@pulumi/github": "^6.2.0",
    "@pulumi/pulumi": "^3.112.0",
    "@thinairthings/use-immer": "^0.9.1",
    "@tqman/ink-table": "^0.0.0-development",
    dedent: "^1.5.1",
    immer: "^10.0.4",
    ink: "^4.4.1",
    "ink-markdown": "^1.0.4",
    "ink-select-input": "^5.0.0",
    "ink-spinner": "^5.0.0",
    "ink-text-input": "^5.0.1",
    lodash: "^4.17.21",
    react: "^18.2.0",
    "react-nil": "^1.2.0",
    zustand: "^4.5.2"
  },
  devDependencies: {
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/github": "^10.0.2",
    "@semantic-release/npm": "^12.0.0",
    "@sindresorhus/tsconfig": "^3.0.1",
    "@types/ink-divider": "^2.0.4",
    "@types/lodash": "^4.17.0",
    "@types/node": "^20.11.30",
    "@types/react": "^18.0.32",
    "@vdemedes/prettier-config": "^2.0.1",
    chalk: "^5.2.0",
    "cz-conventional-changelog": "^3.3.0",
    "semantic-release": "^23.0.6",
    "ts-node": "^10.9.1",
    tsup: "^8.0.2",
    typescript: "^5.0.3"
  },
  publishConfig: {
    access: "public"
  },
  release: {
    branches: [
      "main"
    ],
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/npm",
      "@semantic-release/git"
    ]
  },
  config: {
    commitizen: {
      path: "./node_modules/cz-conventional-changelog"
    }
  }
};

// src/organizations/organizationsCommand.tsx
import { Command } from "@commander-js/extra-typings";
import { writeFileSync as writeFileSync3 } from "fs";
import path3 from "path";
import os4 from "os";
import { render } from "ink";
import React8 from "react";

// src/organizations/create/CreateOrganization.tsx
import { Text as Text3 } from "ink";
import React4 from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// src/organizations/create/EnterOrganizationName.tsx
import { Box, Text } from "ink";
import React from "react";
import TextInput from "ink-text-input";
var EnterOrganizationName = () => {
  const organization = useCreateOrganizationStore((state) => state.organizationName);
  return /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, { color: "green" }, "\u{1F3E2} Enter your organization name: "), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      value: organization,
      onChange: (value) => {
        useCreateOrganizationStore.setState((state) => {
          state.organizationName = value;
        });
      },
      onSubmit: () => {
        useCreateOrganizationStore.setState((state) => {
          state.step += 1;
        });
      }
    }
  ));
};

// src/organizations/create/EnterGithubToken.tsx
import { Box as Box2, Text as Text2 } from "ink";
import React2 from "react";
import TextInput2 from "ink-text-input";
var EnterGithubToken = () => {
  const githubToken = useCreateOrganizationStore((state) => state.githubToken);
  return /* @__PURE__ */ React2.createElement(Box2, null, /* @__PURE__ */ React2.createElement(Text2, { color: "green" }, "\u{1F4BB} Enter your github token: "), /* @__PURE__ */ React2.createElement(
    TextInput2,
    {
      value: githubToken,
      onChange: (value) => {
        useCreateOrganizationStore.setState((state) => {
          state.githubToken = value;
        });
      },
      onSubmit: () => {
        useCreateOrganizationStore.setState((state) => {
          state.step += 1;
        });
      }
    }
  ));
};

// src/organizations/create/WriteToConfig.tsx
import { useEffect } from "react";
import React3 from "react";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import os2 from "os";
import { useApp } from "ink";

// node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/chalk/source/vendor/supports-color/index.js
import process from "node:process";
import os from "node:os";
import tty from "node:tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env || "GITEA_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version2 = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version2 >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/organizations/create/WriteToConfig.tsx
var WriteToConfig = () => {
  const organizationName = useCreateOrganizationStore((state) => state.organizationName);
  const githubToken = useCreateOrganizationStore((state) => state.githubToken);
  const app = useApp();
  useEffect(() => {
    const configPath = path.join(os2.homedir(), ".thinair", "config");
    const config = JSON.parse(readFileSync(configPath).toString());
    config.organizations[organizationName] = {
      githubToken
    };
    if (Object.keys(config.organizations).length === 1) {
      config["defaultOrganization"] = Object.keys(config.organizations)[0];
    }
    writeFileSync(path.join(os2.homedir(), ".thinair", "config"), JSON.stringify(config, null, 2));
    console.log(source_default.green(`
            \u{1F680} Added ${organizationName} to ${configPath} with github token ${githubToken}
        `.trim()));
    useCreateOrganizationStore.setState((state) => {
      state.complete = true;
    });
  }, []);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null);
};

// src/organizations/create/CreateOrganization.tsx
var useCreateOrganizationStore = create()(
  immer(() => {
    return {
      organizationName: "",
      githubToken: "",
      step: 1,
      complete: false
    };
  })
);
var CreateOrganization = () => {
  const step = useCreateOrganizationStore((state) => state.step);
  const complete = useCreateOrganizationStore((state) => state.complete);
  if (complete) {
    return /* @__PURE__ */ React4.createElement(Text3, null, "\u{1F680} Organization created!");
  }
  return /* @__PURE__ */ React4.createElement(React4.Fragment, null, step === 1 && /* @__PURE__ */ React4.createElement(EnterOrganizationName, null), step === 2 && /* @__PURE__ */ React4.createElement(EnterGithubToken, null), step === 3 && /* @__PURE__ */ React4.createElement(WriteToConfig, null));
};

// src/organizations/list/ListOrganizations.tsx
import React5, { useEffect as useEffect2 } from "react";
import { Table } from "@tqman/ink-table";

// src/(libs)/utils/getThinairConfig.ts
import { readFileSync as readFileSync2 } from "fs";
import path2 from "path";
import os3 from "os";
var getThinairConfig = () => {
  return JSON.parse(readFileSync2(path2.join(os3.homedir(), ".thinair", "config")).toString());
};
var getThinairConfigPath = () => {
  return path2.join(os3.homedir(), ".thinair", "config");
};

// src/organizations/list/ListOrganizations.tsx
var ListOrganizations = () => {
  const [data, setData] = React5.useState([]);
  useEffect2(() => {
    const config = getThinairConfig();
    const organizations = Object.keys(config.organizations).map((organization) => {
      return {
        organization,
        githubToken: config.organizations[organization].githubToken
      };
    });
    setData(organizations);
  }, []);
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, data.length > 0 && /* @__PURE__ */ React5.createElement(Table, { data }));
};

// src/organizations/select/SelectOrganization.tsx
import React6, { useState as useState2 } from "react";
import SelectInput from "ink-select-input";

// src/(hooks)/useThinairConfig.ts
import { useEffect as useEffect3 } from "react";
import { writeFileSync as writeFileSync2 } from "fs";
import { useImmer } from "@thinairthings/use-immer";
var useThinairConfig = () => {
  const [config, updateConfig] = useImmer(getThinairConfig());
  useEffect3(() => {
    if (!config)
      return;
    writeFileSync2(getThinairConfigPath(), JSON.stringify(config, null, 2));
  }, [config]);
  return [config, updateConfig];
};

// src/organizations/select/SelectOrganization.tsx
var SelectOrganization = () => {
  const [thinairConfig, updateThinairConfig] = useThinairConfig();
  const [complete, setComplete] = useState2(false);
  return /* @__PURE__ */ React6.createElement(React6.Fragment, null, !complete && /* @__PURE__ */ React6.createElement(
    SelectInput,
    {
      items: Object.keys(thinairConfig.organizations).map((organization) => {
        return {
          label: organization,
          value: organization
        };
      }),
      onSelect: (item) => {
        updateThinairConfig((draft) => {
          draft.defaultOrganization = item.value;
        });
        setComplete(true);
        console.log(source_default.bold.magenta(`
Selected ${item.value} as default organization`));
      }
    }
  ));
};

// src/organizations/update/UpdateOrganization.tsx
import React7, { useEffect as useEffect4, useState as useState3 } from "react";
import SelectInput2 from "ink-select-input";
import TextInput3 from "ink-text-input";
import { Box as Box4, Newline, Text as Text4 } from "ink";
var UpdateOrganization = () => {
  const [thinairConfig, updateThinairConfig] = useThinairConfig();
  const [selectedOrganization, updateSelectedOrganization] = useState3(null);
  const [githubToken, setGithubToken] = useState3("");
  const [step, setStep] = useState3(1);
  useEffect4(() => {
    if (step === 3) {
      console.log(source_default.bold.magenta(`
Updated ${selectedOrganization} with new GitHub Token`));
    }
  }, [step]);
  return /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement(Newline, null), step === 1 && /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement(Text4, null, `\u2B06\uFE0F   Select an organization to update it's GitHub Token`), /* @__PURE__ */ React7.createElement(
    SelectInput2,
    {
      items: Object.keys(thinairConfig.organizations).map((organization) => {
        return {
          label: organization,
          value: organization
        };
      }),
      onSelect: (item) => {
        updateSelectedOrganization(item.value);
        setStep(2);
      }
    }
  )), step === 2 && /* @__PURE__ */ React7.createElement(Box4, null, /* @__PURE__ */ React7.createElement(Text4, { color: "green" }, "\u{1F4BB} Enter your github token: "), /* @__PURE__ */ React7.createElement(
    TextInput3,
    {
      value: githubToken,
      onChange: (value) => {
        setGithubToken(value);
      },
      onSubmit: () => {
        updateThinairConfig((draft) => {
          draft.organizations[selectedOrganization].githubToken = githubToken;
        });
        setStep(3);
      }
    }
  )));
};

// src/organizations/organizationsCommand.tsx
var organizationsCommand = (program3) => {
  const command = new Command("organizations");
  command.addCommand(
    new Command("create").action(() => {
      render(/* @__PURE__ */ React8.createElement(CreateOrganization, null));
    })
  );
  command.addCommand(
    new Command("list").action(() => {
      render(/* @__PURE__ */ React8.createElement(ListOrganizations, null));
    })
  );
  command.addCommand(
    new Command("update").action(() => {
      render(/* @__PURE__ */ React8.createElement(UpdateOrganization, null));
    })
  );
  command.addCommand(
    new Command("select").action(() => {
      render(/* @__PURE__ */ React8.createElement(SelectOrganization, null));
    })
  );
  command.addCommand(
    new Command("clear-config").action(() => {
      writeFileSync3(path3.join(os4.homedir(), ".thinair", "config"), JSON.stringify({
        organizations: {}
      }, null, 2));
    })
  );
  program3.addCommand(command);
};

// src/github/githubCommand.tsx
import { Command as Command2 } from "@commander-js/extra-typings";
import { render as render2 } from "ink";
import React13 from "react";

// src/github/make-releasable/UpdatePackageJson.tsx
import { useEffect as useEffect8, useState as useState5 } from "react";

// src/(hooks)/useNearestPackageJson.ts
import { useEffect as useEffect5, useMemo } from "react";
import { writeFileSync as writeFileSync4 } from "fs";
import { useImmer as useImmer2 } from "@thinairthings/use-immer";

// src/(libs)/utils/findPackageJson.ts
import path4 from "path";
import fs from "fs";
var findPackageJson = (startingDirectory) => {
  const findPackageJson2 = (cd) => {
    try {
      const potentialPath = path4.join(cd, "package.json");
      fs.accessSync(potentialPath);
      return {
        packageJsonObj: JSON.parse(fs.readFileSync(potentialPath).toString()),
        packageJsonPath: potentialPath
      };
    } catch (e) {
      const pd = path4.dirname(cd);
      if (pd === cd) {
        return null;
      }
      return findPackageJson2(pd);
    }
  };
  return findPackageJson2(startingDirectory);
};

// src/(hooks)/useNearestPackageJson.ts
var useNearestPackageJson = (startingPath) => {
  const packageJsonResult = useMemo(() => findPackageJson(startingPath), [startingPath]);
  const [packageJson, updatePackageJson] = useImmer2(packageJsonResult?.packageJsonObj ?? null);
  useEffect5(() => {
    if (!packageJsonResult)
      return;
    writeFileSync4(packageJsonResult.packageJsonPath, JSON.stringify(packageJson, null, 2));
  }, [packageJson]);
  return [
    packageJson,
    updatePackageJson,
    packageJsonResult?.packageJsonPath ?? null
  ];
};

// src/github/make-releasable/UpdatePackageJson.tsx
import _ from "lodash";
import { exec } from "child_process";
import { Box as Box5, Text as Text5 } from "ink";
import React11 from "react";
import Spinner from "ink-spinner";

// src/github/make-releasable/UpdateGitHook.tsx
import path5 from "path";
import { useEffect as useEffect6 } from "react";
import React9 from "react";
import fs3, { writeFileSync as writeFileSync5 } from "fs";
var UpdateGit = ({
  libraryPath
}) => {
  useEffect6(() => {
    try {
      const potentialPath = path5.join(libraryPath, ".git");
      fs3.accessSync(potentialPath);
      console.log(source_default.green("\u{1F332}  Found .git folder."));
      writeFileSync5(path5.join(potentialPath, "hooks", "prepare-commit-msg"), `
#!/bin/bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
`.trim());
      fs3.chmodSync(path5.join(potentialPath, "hooks", "prepare-commit-msg"), "755");
      console.log(source_default.green("\u2705  Updated prepare-commit-msg hook."));
    } catch (e) {
      console.log(source_default.red("No .git folder found. Create a git repo and try again."));
    }
  }, []);
  return /* @__PURE__ */ React9.createElement(React9.Fragment, null);
};

// src/github/make-releasable/CreateGithubWorkflow.tsx
import path6 from "path";
import React10, { useEffect as useEffect7 } from "react";
import fs4 from "fs";
var CreateGithubWorkflow = ({ libraryPath }) => {
  useEffect7(() => {
    const workflowPath = path6.join(libraryPath, ".github", "workflows", "release.yml");
    fs4.mkdirSync(path6.dirname(workflowPath), { recursive: true });
    fs4.writeFileSync(
      workflowPath,
      /* yaml */
      `
name: Release
on:
  push:
    branches:
      - main

permissions:
  contents: read # for checkout

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    permissions:
      contents: write # to be able to publish a GitHub release
      issues: write # to be able to comment on released issues
      pull-requests: write # to be able to comment on released pull requests
      id-token: write # to enable use of OIDC for npm provenance
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm clean-install
      - name: Release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
`.trim()
    );
    console.log(source_default.green("\u{1F680}  Created .github/workflows/release.yml"));
  }, []);
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null);
};

// src/github/make-releasable/UpdatePackageJson.tsx
var UpdatePackageJson = ({
  libraryPath
}) => {
  const [packageJson, updatePackageJson] = useNearestPackageJson(libraryPath);
  const [installationState, setInstallationState] = useState5("idle");
  useEffect8(() => {
    if (!packageJson) {
      console.log(source_default.red("No package.json found."));
      return;
    }
    updatePackageJson((draft) => {
      if (draft === null)
        return;
      _.set(draft, "scripts", {
        ...draft.scripts,
        "prepublishOnly": "npm run build",
        "commit": "npx cz"
      });
      _.set(draft, "devDependencies", {
        ...draft.devDependencies,
        "@semantic-release/changelog": "^6.0.3",
        "@semantic-release/git": "^10.0.1",
        "@semantic-release/github": "^10.0.2",
        "@semantic-release/npm": "^12.0.0",
        "cz-conventional-changelog": "^3.3.0",
        "semantic-release": "^23.0.6"
      });
      _.set(draft, "release.branches", [
        "main"
      ]);
      _.set(draft, "release.plugins", [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/git"
      ]);
    });
  }, []);
  useEffect8(() => {
    if (!packageJson)
      return;
    if (installationState !== "idle")
      return;
    setInstallationState("installingDependencies");
    exec("npm install", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      }
      console.log(stdout);
      console.log(source_default.magenta(`\u2705  Finished installing dependencies.`));
      setInstallationState("initializingCommitizen");
      exec("npx commitizen init cz-conventional-changelog --save-dev --save-exact", {
        cwd: libraryPath
      }, (err2, stdout2, stderr2) => {
        if (err2) {
          console.error(err2);
        }
        console.log(stdout2);
        console.log(source_default.green("\u2705  Finished setting up commitizen."));
        setInstallationState("installationComplete");
      });
    });
  }, [packageJson, installationState]);
  return /* @__PURE__ */ React11.createElement(React11.Fragment, null, installationState === "installingDependencies" && /* @__PURE__ */ React11.createElement(Box5, null, /* @__PURE__ */ React11.createElement(Text5, { color: "green" }, /* @__PURE__ */ React11.createElement(Spinner, { type: "dots" })), /* @__PURE__ */ React11.createElement(Text5, null, " Installing Dependencies...")), installationState === "initializingCommitizen" && /* @__PURE__ */ React11.createElement(Box5, null, /* @__PURE__ */ React11.createElement(Text5, { color: "green" }, /* @__PURE__ */ React11.createElement(Spinner, { type: "dots" })), /* @__PURE__ */ React11.createElement(Text5, null, " Initializing Commitizen...")), installationState === "installationComplete" && /* @__PURE__ */ React11.createElement(React11.Fragment, null, /* @__PURE__ */ React11.createElement(UpdateGit, { libraryPath }), /* @__PURE__ */ React11.createElement(CreateGithubWorkflow, { libraryPath })));
};

// src/github/make-releasable/MakeReleasable.tsx
import React12 from "react";
var MakeReleasable = ({
  libraryPath
}) => {
  return /* @__PURE__ */ React12.createElement(UpdatePackageJson, { libraryPath });
};

// src/github/githubCommand.tsx
var githubCommand = (program3) => {
  const githubCommand2 = new Command2("github");
  githubCommand2.addCommand(
    new Command2("make-releasable").argument("<libraryPath>", "The path to the library to make releasable").action(async (libraryPath) => {
      render2(/* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement(MakeReleasable, { libraryPath })));
    })
  );
  program3.addCommand(githubCommand2);
};

// src/cli.tsx
import path7 from "path";
import os5 from "os";
import { existsSync as existsSync2, mkdirSync as mkdirSync2, writeFileSync as writeFileSync6 } from "fs";
import { Text as Text6, render as render3 } from "ink";
import React14 from "react";
var parts = package_default.version.split(".").map(Number);
var version = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
program2.name("thinair").version(version).hook("preSubcommand", async () => {
  console.log(source_default.cyan(`\u{1F680} Thinair CLI ${version}`));
  const thinairPath = path7.join(os5.homedir(), ".thinair");
  if (!existsSync2(thinairPath)) {
    mkdirSync2(thinairPath);
    const configPath = path7.join(thinairPath, "config");
    console.log(source_default.blue(`\u{1F4C1} No config file found. Writing config file to ${configPath}`));
    writeFileSync6(configPath, JSON.stringify({
      organizations: {}
    }, null, 2));
    render3(/* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement(Text6, null, "Looks like you have no organizations setup. Lets fix that!"), /* @__PURE__ */ React14.createElement(CreateOrganization, null)));
    await new Promise((resolve) => {
      useCreateOrganizationStore.subscribe((state) => {
        if (state.complete)
          resolve();
      });
    });
  }
});
organizationsCommand(program2);
githubCommand(program2);
program2.parse();
