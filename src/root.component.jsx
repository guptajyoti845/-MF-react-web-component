import "./styles.scss";

export default function Root(props) {
  return (
    <div
      id="cookie-consent"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-label"
      aria-describedby="cookie-consent-desc"
      className="hide"
    >
      <h2 id="cookie-consent-label" className="m-0 mb-1">
        This website uses cookies
      </h2>
      <div className="m-0 mb-1">
        <label className="flex align-center">
          <input type="checkbox" id="cookie-consent-no-sell" />
          &nbsp;Do Not Sell My Personal Information
        </label>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue py-1 px-2 rounded-1 border-none text-white text-base"
          type="button"
          id="cookie-consent-accept"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
