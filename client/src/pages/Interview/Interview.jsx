import React from "react";
import InputNotes from "../../components/InterviewInputNotes";
import NavBar from "../../components/DashboardNavBar";
import CodeEditor from "./CodeEditor";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackConsole,
  useSandpack,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import useCodeEditorStore from "../../store/CodeEditorStore";
import ClientEditor from "./ClientEditor";

const Interview = ({ userid }) => {
  const files = {
    "/index.js": `console.log("test")`,
  };
  const { clientID } = useCodeEditorStore();

  return (
    <div>
      <NavBar userid={userid} />
      <InputNotes userid={userid} />
      <SandpackProvider files={files}>
        <CodeEditor />
      </SandpackProvider>
      <SandpackProvider>
        <ClientEditor />
      </SandpackProvider>
    </div>
  );
};

/*
{
  "visibleFiles": [
    "/index.js"
  ],
  "activeFile": "/index.js",
  "files": {
    "/styles.css": {
      "code": "body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: auto;\n  -moz-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: auto;\n  text-rendering: optimizeLegibility;\n  font-smooth: always;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nh1 {\n  font-size: 1.5rem;\n}"
    },
    "/index.js": {
      "code": "console.log(\"test\")"
    },
    "/index.html": {
      "code": "<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Parcel Sandbox</title>\n  <meta charset=\"UTF-8\" />\n</head>\n\n<body>\n  <div id=\"app\"></div>\n\n  <script src=\"index.js\">\n  </script>\n</body>\n\n</html>"
    },
    "/package.json": {
      "code": "{\n  \"dependencies\": {},\n  \"main\": \"/index.js\",\n  \"devDependencies\": {}\n}"
    }
  },
  "environment": "parcel",
  "shouldUpdatePreview": true,
  "visibleFilesFromProps": [
    "/index.js"
  ],
  "error": null,
  "initMode": "lazy",
  "status": "initial",
  "editorState": "pristine",
  "clients": {
    "41dd": {
      "status": "done",
      "options": {
        "skipEval": false,
        "showOpenInCodeSandbox": false,
        "showErrorScreen": true,
        "showLoadingScreen": false
      },
      "sandboxSetup": {
        "files": {
          "/styles.css": {
            "code": "body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: auto;\n  -moz-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: auto;\n  text-rendering: optimizeLegibility;\n  font-smooth: always;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nh1 {\n  font-size: 1.5rem;\n}"
          },
          "/index.js": {
            "code": "console.log(\"test\")"
          },
          "/index.html": {
            "code": "<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Parcel Sandbox</title>\n  <meta charset=\"UTF-8\" />\n</head>\n\n<body>\n  <div id=\"app\"></div>\n\n  <script src=\"index.js\">\n  </script>\n</body>\n\n</html>"
          },
          "/package.json": {
            "code": "{\n  \"dependencies\": {},\n  \"main\": \"/index.js\",\n  \"devDependencies\": {}\n}"
          }
        },
        "template": "parcel"
      },
      "iframeSelector": {},
      "bundlerURL": "https://2-6-7-sandpack.codesandbox.io/",
      "bundlerState": {
        "transpiledModules": {
          "/index.js:": {
            "query": "",
            "module": {
              "code": "console.log(\"test\")",
              "path": "/index.js"
            },
            "isEntry": true,
            "isTestFile": false,
            "sourceEqualsCompiled": false,
            "childModules": [],
            "dependencies": [],
            "initiators": [],
            "transpilationDependencies": [],
            "transpilationInitiators": [],
            "asyncDependencies": [],
            "warnings": [],
            "hasMissingDependencies": false,
            "source": {
              "fileName": "/index.js",
              "compiledCode": "\"use strict\";\n\nconsole.log(\"test\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxRQUFRQyxHQUFSLENBQVksTUFBWiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwidGVzdFwiKSJdfQ==",
              "sourceEqualsCompiled": false
            }
          }
        },
        "version": "https://2-6-7-sandpack.codesandbox.io/static/js/sandbox.d5016ca19.js",
        "timestamp": 1686426778742,
        "configurations": {
          "package": {
            "path": "/package.json",
            "code": "{\n  \"dependencies\": {},\n  \"main\": \"/index.js\",\n  \"devDependencies\": {}\n}",
            "generated": false,
            "parsed": {
              "dependencies": {},
              "main": "/index.js",
              "devDependencies": {}
            }
          },
          "sandbox": {
            "path": "/sandbox.config.json",
            "code": "{\n  \"infiniteLoopProtection\": true,\n  \"hardReloadOnChange\": false,\n  \"view\": \"browser\"\n}",
            "generated": true,
            "parsed": {
              "infiniteLoopProtection": true,
              "hardReloadOnChange": false,
              "view": "browser"
            }
          },
          "now": {
            "path": "/vercel.json",
            "code": "{}",
            "generated": true,
            "parsed": {}
          },
          "babel": {
            "path": "/.babelrc",
            "code": "{\n  \"presets\": [\n    \"env\"\n  ],\n  \"plugins\": [\n    [\n      \"transform-runtime\",\n      {\n        \"polyfill\": false,\n        \"regenerator\": true\n      }\n    ],\n    \"transform-object-rest-spread\"\n  ],\n  \"parserOpts\": {}\n}",
            "generated": true,
            "parsed": {
              "presets": [
                "env"
              ],
              "plugins": [
                [
                  "transform-runtime",
                  {
                    "polyfill": false,
                    "regenerator": true
                  }
                ],
                "transform-object-rest-spread"
              ],
              "parserOpts": {}
            }
          },
          "typescript": {
            "path": "/tsconfig.json",
            "code": "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"jsx\": \"preserve\",\n    \"esModuleInterop\": true,\n    \"sourceMap\": true,\n    \"allowJs\": true,\n    \"lib\": [\n      \"es6\",\n      \"dom\"\n    ],\n    \"rootDir\": \"src\",\n    \"moduleResolution\": \"node\"\n  }\n}",
            "generated": true,
            "parsed": {
              "compilerOptions": {
                "module": "commonjs",
                "jsx": "preserve",
                "esModuleInterop": true,
                "sourceMap": true,
                "allowJs": true,
                "lib": [
                  "es6",
                  "dom"
                ],
                "rootDir": "src",
                "moduleResolution": "node"
              }
            }
          }
        },
        "entry": "/index.js",
        "meta": {},
        "dependenciesQuery": "babel-runtime%406.26.0+node-libs-browser%402.2.1"
      },
      "errors": [],
      "element": {},
      "iframe": {},
      "iframeProtocol": {
        "globalListeners": [
          null
        ],
        "globalListenersCount": 1,
        "channelListeners": [
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "channelListenersCount": 6,
        "channelId": 22085,
        "origin": "https://2-6-7-sandpack.codesandbox.io/"
      }
    },
    "41df": {
      "status": "done",
      "options": {
        "skipEval": false,
        "showOpenInCodeSandbox": false,
        "showErrorScreen": true,
        "showLoadingScreen": false
      },
      "sandboxSetup": {
        "files": {
          "/styles.css": {
            "code": "body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: auto;\n  -moz-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: auto;\n  text-rendering: optimizeLegibility;\n  font-smooth: always;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nh1 {\n  font-size: 1.5rem;\n}"
          },
          "/index.js": {
            "code": "console.log(\"test\")"
          },
          "/index.html": {
            "code": "<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Parcel Sandbox</title>\n  <meta charset=\"UTF-8\" />\n</head>\n\n<body>\n  <div id=\"app\"></div>\n\n  <script src=\"index.js\">\n  </script>\n</body>\n\n</html>"
          },
          "/package.json": {
            "code": "{\n  \"dependencies\": {},\n  \"main\": \"/index.js\",\n  \"devDependencies\": {}\n}"
          }
        },
        "template": "parcel"
      },
      "iframeSelector": {},
      "bundlerURL": "https://2-6-7-sandpack.codesandbox.io/",
      "bundlerState": {
        "transpiledModules": {
          "/index.js:": {
            "query": "",
            "module": {
              "code": "console.log(\"test\")",
              "path": "/index.js"
            },
            "isEntry": true,
            "isTestFile": false,
            "sourceEqualsCompiled": false,
            "childModules": [],
            "dependencies": [],
            "initiators": [],
            "transpilationDependencies": [],
            "transpilationInitiators": [],
            "asyncDependencies": [],
            "warnings": [],
            "hasMissingDependencies": false,
            "source": {
              "fileName": "/index.js",
              "compiledCode": "\"use strict\";\n\nconsole.log(\"test\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxRQUFRQyxHQUFSLENBQVksTUFBWiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwidGVzdFwiKSJdfQ==",
              "sourceEqualsCompiled": false
            }
          }
        },
        "version": "https://2-6-7-sandpack.codesandbox.io/static/js/sandbox.d5016ca19.js",
        "timestamp": 1686426778350,
        "configurations": {
          "package": {
            "path": "/package.json",
            "code": "{\n  \"dependencies\": {},\n  \"main\": \"/index.js\",\n  \"devDependencies\": {}\n}",
            "generated": false,
            "parsed": {
              "dependencies": {},
              "main": "/index.js",
              "devDependencies": {}
            }
          },
          "sandbox": {
            "path": "/sandbox.config.json",
            "code": "{\n  \"infiniteLoopProtection\": true,\n  \"hardReloadOnChange\": false,\n  \"view\": \"browser\"\n}",
            "generated": true,
            "parsed": {
              "infiniteLoopProtection": true,
              "hardReloadOnChange": false,
              "view": "browser"
            }
          },
          "now": {
            "path": "/vercel.json",
            "code": "{}",
            "generated": true,
            "parsed": {}
          },
          "babel": {
            "path": "/.babelrc",
            "code": "{\n  \"presets\": [\n    \"env\"\n  ],\n  \"plugins\": [\n    [\n      \"transform-runtime\",\n      {\n        \"polyfill\": false,\n        \"regenerator\": true\n      }\n    ],\n    \"transform-object-rest-spread\"\n  ],\n  \"parserOpts\": {}\n}",
            "generated": true,
            "parsed": {
              "presets": [
                "env"
              ],
              "plugins": [
                [
                  "transform-runtime",
                  {
                    "polyfill": false,
                    "regenerator": true
                  }
                ],
                "transform-object-rest-spread"
              ],
              "parserOpts": {}
            }
          },
          "typescript": {
            "path": "/tsconfig.json",
            "code": "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"jsx\": \"preserve\",\n    \"esModuleInterop\": true,\n    \"sourceMap\": true,\n    \"allowJs\": true,\n    \"lib\": [\n      \"es6\",\n      \"dom\"\n    ],\n    \"rootDir\": \"src\",\n    \"moduleResolution\": \"node\"\n  }\n}",
            "generated": true,
            "parsed": {
              "compilerOptions": {
                "module": "commonjs",
                "jsx": "preserve",
                "esModuleInterop": true,
                "sourceMap": true,
                "allowJs": true,
                "lib": [
                  "es6",
                  "dom"
                ],
                "rootDir": "src",
                "moduleResolution": "node"
              }
            }
          }
        },
        "entry": "/index.js",
        "meta": {},
        "dependenciesQuery": "babel-runtime%406.26.0+node-libs-browser%402.2.1"
      },
      "errors": [],
      "element": {},
      "iframe": {},
      "iframeProtocol": {
        "globalListeners": [
          null
        ],
        "globalListenersCount": 1,
        "channelListeners": [
          null,
          null,
          null,
          null,
          null
        ],
        "channelListenersCount": 5,
        "channelId": 153943,
        "origin": "https://2-6-7-sandpack.codesandbox.io/"
      }
    }
  },
  "lazyAnchorRef": {
    "current": {}
  },
  "unsubscribeClientListenersRef": {
    "current": {
      "41dd": {},
      "41df": {}
    }
  },
  "queuedListenersRef": {
    "current": {
      "global": {},
      "41dd": {},
      "41df": {}
    }
  },
  "autoReload": true
}
*/

export default Interview;
