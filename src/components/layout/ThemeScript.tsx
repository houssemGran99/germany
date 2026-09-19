/**
 * Runs before paint so the correct theme is applied with no flash, and marks
 * the document as JavaScript-capable — scroll reveals only hide their content
 * when `.js` is present, so the page degrades to fully visible without it.
 * Always resolves to an explicit `data-theme` value on <html>, which is what
 * the `dark:` variant in globals.css keys off.
 */
const script = `(function(){
document.documentElement.classList.add('js');
try{
var stored=localStorage.getItem('sd-theme');
var dark=stored?stored==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme',dark?'dark':'light');
}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
