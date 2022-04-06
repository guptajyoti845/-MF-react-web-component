import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  domElementGetter: () => {
    const id = "web-component:@mf-demo/react-web-component";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.prepend(el); // single-spa automatically _appends_, but this content should be _prepended_ for accessibility
    }
    return el;
  },
});

export const name = "parcel-react";

export const bootstrap = [lifecycles.bootstrap];

export const mount = (props) => {
  return localStorage.getItem("cookie-consent") // look for value; this could instead be a cookie if you wanted to send it back and forth to your server.
    ? Promise.resolve(null) // don't render anything if they have already "consented"
    : lifecycles.mount(props).then(() => {
        // extend single-spa mount lifecycle; after single-spa has mounted the template, enhance with plain JavaScript
        const dialog = document.querySelector("#cookie-consent"), // get outermost node
          noSellCheckbox =
            dialog && dialog.querySelector("#cookie-consent-no-sell"), // get checkbox node
          acceptBtn = dialog && dialog.querySelector("#cookie-consent-accept"); // get button node

        if (!dialog || !noSellCheckbox || !acceptBtn) return;

        // bind and handle click event on button
        acceptBtn.addEventListener("click", () => {
          // create consent data object
          const consent = {
            date: new Date().toJSON(),
            noSell: noSellCheckbox.checked,
          };
          localStorage.setItem("cookie-consent", JSON.stringify(consent));
          dialog.classList.add("hide"); // add hidden class to animate out
        });

        // dialog starts out with 'hide' class; this removes it so that it animates in.
        setTimeout(() => dialog.classList.remove("hide"));

        dialog.addEventListener("transitionend", () => {
          // listen for when animation ends and set hidden attribute so that they remain in sync
          dialog.classList.contains("hide") &&
            dialog.setAttribute("hidden", "");
        });
      });
};

export const unmount = [lifecycles.unmount];
