/*
 * DESIGN DIRECTION SWITCH
 * -----------------------
 * Runs in the <head> right after config.js and sets
 *   <html data-direction="boutique">  or  <html data-direction="minimal">
 * which css/direction-minimal.css uses to restyle the site.
 *
 * The default comes from SITE_CONFIG.designDirection. For reviewing, any page
 * can be opened with ?direction=minimal (or boutique) — the choice is then
 * remembered for this browser tab, so you can click around the whole site.
 * ?direction=default goes back to the configured choice.
 */
(function setDesignDirection() {
  var DIRECTIONS = ["boutique", "minimal"];
  var STORAGE_KEY = "alfajar-direction-preview";
  var choice = SITE_CONFIG.designDirection;

  try {
    var requested = new URLSearchParams(location.search).get("direction");
    // Previews embedded on design.html must not change the choice for the whole tab.
    var isTopWindow = window.self === window.top;

    if (requested === "default" && isTopWindow) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else if (DIRECTIONS.indexOf(requested) !== -1) {
      choice = requested;
      if (isTopWindow) sessionStorage.setItem(STORAGE_KEY, requested);
    } else {
      var remembered = sessionStorage.getItem(STORAGE_KEY);
      if (DIRECTIONS.indexOf(remembered) !== -1) choice = remembered;
    }
  } catch (error) {
    // sessionStorage can be blocked (e.g. strict privacy settings) — just use the default.
  }

  document.documentElement.setAttribute(
    "data-direction",
    DIRECTIONS.indexOf(choice) !== -1 ? choice : "boutique"
  );
})();
