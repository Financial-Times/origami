/* The list is from https://origami.ft.com/blog/2021/07/01/origami-on-npm-and-how-to-migrate/#last-bower-releases

To get the latest exact versions, this command was used:
```
for package in o-autoinit o-banner o-big-number o-brand o-buttons o-colors o-cookie-message o-date o-editorial-layout o-editorial-typography o-errors o-expander o-fonts o-fonts-assets o-footer o-footer-services o-forms o-ft-affiliate-ribbon ftdomdelegate o-grid o-header o-header-services o-icons o-labels o-layers o-layout o-lazy-load o-loading o-message o-meter o-normalise o-overlay o-quote o-share o-spacing o-stepped-progress o-subs-card o-syntax-highlight o-table o-tabs o-teaser o-teaser-collection o-toggle o-tooltip o-topper o-tracking o-typography o-utils o-viewport o-visual-effects
do
  echo "\"$package\": $(bower info $package --verbose --json 2>/dev/null | jq -r '.versions[0]'),"
done
```
*/
export default {
    "@financial-times/o-autoinit":"2.0.7",
    "@financial-times/o-banner":"3.4.2",
    "@financial-times/o-big-number":"2.0.4",
    "@financial-times/o-brand":"3.3.0",
    "@financial-times/o-buttons":"6.2.0",
    "@financial-times/o-colors":"5.4.1",
    "@financial-times/o-cookie-message":"5.1.2",
    "@financial-times/o-date":"4.3.0",
    "@financial-times/o-editorial-layout":"1.5.0",
    "@financial-times/o-editorial-typography":"1.2.1",
    "@financial-times/o-errors":"4.0.8",
    "@financial-times/o-expander":"5.0.11",
    "@financial-times/o-fonts":"4.5.0",
    "@financial-times/o-footer":"9.0.1-bower",
    "@financial-times/o-footer-services":"3.3.0",
    "@financial-times/o-forms":"8.5.1",
    "@financial-times/o-ft-affiliate-ribbon":"4.0.4",
    "ftdomdelegate":"4.0.6",
    "@financial-times/o-grid":"5.2.12",
    "@financial-times/o-header":"8.6.0",
    "@financial-times/o-header-services":"4.0.15",
    "@financial-times/o-icons":"6.3.0",
    "@financial-times/o-labels":"5.2.0",
    "@financial-times/o-layers":"2.1.6",
    "@financial-times/o-layout":"4.5.0",
    "@financial-times/o-lazy-load":"2.0.7",
    "@financial-times/o-loading":"4.0.4",
    "@financial-times/o-message":"4.2.6",
    "@financial-times/o-meter":"2.0.6",
    "@financial-times/o-normalise":"3.0.1",
    "@financial-times/o-overlay":"3.1.0",
    "@financial-times/o-quote":"4.1.6",
    "@financial-times/o-share":"7.6.0",
    "@financial-times/o-spacing":"2.1.0",
    "@financial-times/o-stepped-progress":"2.0.7",
    "@financial-times/o-subs-card":"6.0.0-bower",
    "@financial-times/o-syntax-highlight":"3.0.8",
    "@financial-times/o-table":"8.1.5",
    "@financial-times/o-tabs":"5.0.9",
    "@financial-times/o-teaser":"5.2.4",
    "@financial-times/o-teaser-collection":"3.0.8",
    "@financial-times/o-toggle":"2.1.3",
    "@financial-times/o-tooltip":"4.1.0",
    "@financial-times/o-topper":"3.1.7",
    "@financial-times/o-tracking":"4.1.2",
    "@financial-times/o-typography":"6.4.6",
    "@financial-times/o-utils":"1.1.7",
    "@financial-times/o-viewport":"4.0.5",
    "@financial-times/o-visual-effects":"3.0.6",
}
