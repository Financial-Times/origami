import nNotification from "./src/js/n-notification";

const constructAll = function() {
  nNotification.init();
  document.removeEventListener("o.DOMContentLoaded", constructAll);
};

document.addEventListener("o.DOMContentLoaded", constructAll);

export default nNotification;
