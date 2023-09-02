import { compressToBase64 } from "lz-string";

const dataToLzCompressedJson = (data: object) => {
  /**
   * Ejected from
   * "codesandbox-import-utils/lib/api/define" from
   * "codesandbox/lib/api/define"
   */
  const json = JSON.stringify(data);
  const base64 = compressToBase64(json)
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '='

  return base64;
};

type CodeSandBoxProps = { jsx: string; store: string };

function getSandBoxParameters({ jsx, store }: CodeSandBoxProps) {
  return dataToLzCompressedJson({
    files: {
      "index.tsx": {
        content: `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
        `,
      },
      "App.tsx": {
        content: jsx,
        isBinary: false,
      },
      "store.ts": {
        content: store,
        isBinary: false,
      },
      "package.json": {
        // @ts-ignore
        content: {
          dependencies: {
            mobx: "^6.10.0",
            "mobx-react-lite": "^3.4.3",
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            "react-router-dom": "^6.15.0",
            swr: "^2.2.1",
          },
        },
      },
    },
  });
}

export const CodeSandBox = ({ jsx, store }: CodeSandBoxProps) => {
  const parameters = getSandBoxParameters({ jsx, store });
  return (
    <iframe
      title="codesandbox"
      style={{
        width: "100%",
        height: "100vh",
      }}
      src={`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`}
    ></iframe>
  );
};
