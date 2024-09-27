// To parse this data:
//
//   import { Convert, ManifestD } from "./file";
//
//   const manifestD = Convert.toManifestD(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ManifestD {
  chrome_settings_overrides?: any;
  /**
   * Override pages are a way to substitute an HTML file from your extension for a page that
   * Google Chrome normally provides.
   */
  chrome_url_overrides?: ChromeURLOverrides;
  /**
   * Use the commands API to add keyboard shortcuts that trigger actions in your extension,
   * for example, an action to open the browser action or send a command to the extension.
   */
  commands?: { [key: string]: { [key: string]: any } };
  content_pack?: any;
  /**
   * Content scripts are JavaScript files that run in the context of web pages.
   */
  content_scripts?: ContentScript[];
  current_locale?: any;
  /**
   * Specifies the subdirectory of _locales that contains the default strings for this
   * extension.
   */
  default_locale?: string;
  /**
   * A plain text description of the extension
   */
  description?: string;
  /**
   * A DevTools extension adds functionality to the Chrome DevTools. It can add new UI panels
   * and sidebars, interact with the inspected page, get information about network requests,
   * and more.
   */
  devtools_page?: string;
  /**
   * Declares which extensions, apps, and web pages can connect to your extension via
   * runtime.connect and runtime.sendMessage.
   */
  externally_connectable?: ExternallyConnectable;
  /**
   * You can use this API to enable users to upload files to your website.
   */
  file_browser_handlers?: FileBrowserHandler[];
  /**
   * The URL of the homepage for this extension.
   */
  homepage_url?: string;
  /**
   * One or more icons that represent the extension, app, or theme. Recommended format: PNG;
   * also BMP, GIF, ICO, JPEG.
   */
  icons?: Icons;
  import?: any;
  /**
   * Specify how this extension will behave if allowed to run in incognito mode.
   */
  incognito?: Incognito;
  /**
   * Allows your extension to handle keystrokes, set the composition, and manage the candidate
   * window.
   */
  input_components?: InputComponent[];
  /**
   * This value can be used to control the unique ID of an extension, app, or theme when it is
   * loaded during development.
   */
  key?: string;
  /**
   * One integer specifying the version of the manifest file format your package requires.
   */
  manifest_version: number;
  /**
   * The version of Chrome that your extension, app, or theme requires, if any.
   */
  minimum_chrome_version?: string;
  /**
   * One or more mappings from MIME types to the Native Client module that handles each type.
   */
  nacl_modules?: NaclModule[];
  /**
   * The name of the extension
   */
  name: string;
  /**
   * Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into
   * their Google Account and the launchWebAuthFlow for users logged into a non-Google account.
   */
  oauth2?: Oauth2;
  /**
   * Whether the app or extension is expected to work offline. When Chrome detects that it is
   * offline, apps with this field set to true will be highlighted on the New Tab page.
   */
  offline_enabled?: boolean;
  /**
   * The omnibox API allows you to register a keyword with Google Chrome's address bar, which
   * is also known as the omnibox.
   */
  omnibox?: Omnibox;
  /**
   * Use the chrome.permissions API to request declared optional permissions at run time
   * rather than install time, so users understand why the permissions are needed and grant
   * only those that are necessary.
   */
  optional_permissions?: string[];
  /**
   * To allow users to customize the behavior of your extension, you may wish to provide an
   * options page. If you do, a link to it will be provided from the extensions management
   * page at chrome://extensions. Clicking the Options link opens a new tab pointing at your
   * options page.
   */
  options_page?: string;
  /**
   * To allow users to customize the behavior of your extension, you may wish to provide an
   * options page. If you do, an Options link will be shown on the extensions management page
   * at chrome://extensions which opens a dialogue containing your options page.
   */
  options_ui?: OptionsUI;
  /**
   * Permissions help to limit damage if your extension or app is compromised by malware. Some
   * permissions are also displayed to users before installation, as detailed in Permission
   * Warnings.
   */
  permissions?: string[];
  platforms?: any;
  /**
   * Technologies required by the app or extension. Hosting sites such as the Chrome Web Store
   * may use this list to dissuade users from installing apps or extensions that will not work
   * on their computer.
   */
  requirements?: Requirements;
  /**
   * Defines an collection of app or extension pages that are to be served in a sandboxed
   * unique origin, and optionally a Content Security Policy to use with them.
   */
  sandbox?: Sandbox;
  /**
   * The short name is typically used where there is insufficient space to display the full
   * name.
   */
  short_name?: string;
  signature?: any;
  spellcheck?: any;
  storage?: any;
  system_indicator?: any;
  /**
   * Register itself as a speech engine.
   */
  tts_engine?: TTSEngine;
  /**
   * If you publish using the Chrome Developer Dashboard, ignore this field. If you host your
   * own extension or app: URL to an update manifest XML file.
   */
  update_url?: string;
  /**
   * One to four dot-separated integers identifying the version of this extension.
   */
  version: string;
  /**
   * In addition to the version field, which is used for update purposes, version_name can be
   * set to a descriptive version string and will be used for display purposes if present.
   */
  version_name?: string;
  [property: string]: any;
}

/**
 * Override pages are a way to substitute an HTML file from your extension for a page that
 * Google Chrome normally provides.
 */
export interface ChromeURLOverrides {
  /**
   * The page that appears when the user chooses the Bookmark Manager menu item from the
   * Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also
   * get to this page by entering the URL chrome://bookmarks.
   */
  bookmarks?: string;
  /**
   * The page that appears when the user chooses the History menu item from the Chrome menu
   * or, on Mac, the Show Full History item from the History menu. You can also get to this
   * page by entering the URL chrome://history.
   */
  history?: string;
  /**
   * The page that appears when the user creates a new tab or window. You can also get to this
   * page by entering the URL chrome://newtab.
   */
  newtab?: string;
}

export interface ContentScript {
  /**
   * Controls whether the content script runs in all frames of the matching page, or only the
   * top frame.
   */
  all_frames?: boolean;
  /**
   * The list of CSS files to be injected into matching pages. These are injected in the order
   * they appear in this array, before any DOM is constructed or displayed for the page.
   */
  css?: string[];
  /**
   * Applied after matches to exclude URLs that match this glob. Intended to emulate the
   * @exclude Greasemonkey keyword.
   */
  exclude_globs?: string[];
  /**
   * Excludes pages that this content script would otherwise be injected into.
   */
  exclude_matches?: string[];
  /**
   * Applied after matches to include only those URLs that also match this glob. Intended to
   * emulate the @include Greasemonkey keyword.
   */
  include_globs?: string[];
  /**
   * The list of JavaScript files to be injected into matching pages. These are injected in
   * the order they appear in this array.
   */
  js?: string[];
  /**
   * Whether to insert the content script on about:blank and about:srcdoc.
   */
  match_about_blank?: boolean;
  /**
   * Specifies which pages this content script will be injected into.
   */
  matches: string[];
  /**
   * Controls when the files in js are injected.
   */
  run_at?: RunAt;
  /**
   * The JavaScript world for a script to execute within.
   */
  world?: World;
}

/**
 * Controls when the files in js are injected.
 */
export enum RunAt {
  DocumentEnd = 'document_end',
  DocumentIdle = 'document_idle',
  DocumentStart = 'document_start',
}

/**
 * The JavaScript world for a script to execute within.
 */
export enum World {
  Isolated = 'ISOLATED',
  Main = 'MAIN',
}

/**
 * Declares which extensions, apps, and web pages can connect to your extension via
 * runtime.connect and runtime.sendMessage.
 */
export interface ExternallyConnectable {
  /**
   * Indicates that the extension would like to make use of the TLS channel ID of the web page
   * connecting to it. The web page must also opt to send the TLS channel ID to the extension
   * via setting includeTlsChannelId to true in runtime.connect's connectInfo or
   * runtime.sendMessage's options.
   */
  accepts_tls_channel_id?: boolean;
  ids?: string[];
  matches?: string[];
}

export interface FileBrowserHandler {
  /**
   * What the button will display.
   */
  default_title: string;
  /**
   * Filetypes to match.
   */
  file_filters: string[];
  /**
   * Used by event handling code to differentiate between multiple file handlers
   */
  id: string;
}

/**
 * One or more icons that represent the extension, app, or theme. Recommended format: PNG;
 * also BMP, GIF, ICO, JPEG.
 */
export interface Icons {
  /**
   * Used during installation and in the Chrome Web Store.
   */
  '128'?: string;
  /**
   * Used as the favicon for an extension's pages and infobar.
   */
  '16'?: string;
  /**
   * Used during installation and in the Chrome Web Store.
   */
  '256'?: string;
  /**
   * Used on the extension management page (chrome://extensions).
   */
  '48'?: string;
  [property: string]: any;
}

/**
 * Specify how this extension will behave if allowed to run in incognito mode.
 */
export enum Incognito {
  NotAllowed = 'not_allowed',
  Spanning = 'spanning',
  Split = 'split',
}

export interface InputComponent {
  description: string;
  id: string;
  language: string;
  layouts: any[];
  name: string;
  type: string;
}

export interface NaclModule {
  /**
   * The MIME type for which the Native Client module will be registered as content handler.
   */
  mime_type: string;
  /**
   * The location of a Native Client manifest (a .nmf file) within the extension directory.
   */
  path: string;
}

/**
 * Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into
 * their Google Account and the launchWebAuthFlow for users logged into a non-Google account.
 */
export interface Oauth2 {
  /**
   * You need to register your app in the Google APIs Console to get the client ID.
   */
  client_id: string;
  scopes: string[];
}

/**
 * The omnibox API allows you to register a keyword with Google Chrome's address bar, which
 * is also known as the omnibox.
 */
export interface Omnibox {
  /**
   * The keyword that will trigger your extension.
   */
  keyword: string;
}

/**
 * To allow users to customize the behavior of your extension, you may wish to provide an
 * options page. If you do, an Options link will be shown on the extensions management page
 * at chrome://extensions which opens a dialogue containing your options page.
 */
export interface OptionsUI {
  /**
   * If true, a Chrome user agent stylesheet will be applied to your options page. The default
   * value is false, but we recommend you enable it for a consistent UI with Chrome.
   */
  chrome_style?: boolean;
  /**
   * If true, your extension's options page will be opened in a new tab rather than embedded
   * in chrome://extensions. The default is false, and we recommend that you don't change it.
   * This is only useful to delay the inevitable deprecation of the old options UI! It will be
   * removed soon, so try not to use it. It will break.
   */
  open_in_tab?: boolean;
  /**
   * The path to your options page, relative to your extension's root.
   */
  page: string;
  [property: string]: any;
}

/**
 * Technologies required by the app or extension. Hosting sites such as the Chrome Web Store
 * may use this list to dissuade users from installing apps or extensions that will not work
 * on their computer.
 */
export interface Requirements {
  /**
   * The '3D' requirement denotes GPU hardware acceleration.
   */
  '3D'?: The3D;
  /**
   * Indicates if an app or extension requires NPAPI to run. This requirement is enabled by
   * default when the manifest includes the 'plugins' field.
   */
  plugins?: Plugins;
}

/**
 * The '3D' requirement denotes GPU hardware acceleration.
 */
export interface The3D {
  /**
   * List of the 3D-related features your app requires.
   */
  features: Feature[];
}

export enum Feature {
  Webgl = 'webgl',
}

/**
 * Indicates if an app or extension requires NPAPI to run. This requirement is enabled by
 * default when the manifest includes the 'plugins' field.
 */
export interface Plugins {
  npapi: boolean;
}

/**
 * Defines an collection of app or extension pages that are to be served in a sandboxed
 * unique origin, and optionally a Content Security Policy to use with them.
 */
export interface Sandbox {
  content_security_policy?: string;
  pages: string[];
}

/**
 * Register itself as a speech engine.
 */
export interface TTSEngine {
  /**
   * Voices the extension can synthesize.
   */
  voices: Voice[];
}

export interface Voice {
  /**
   * Events sent to update the client on the progress of speech synthesis.
   */
  event_types: EventType[];
  /**
   * If your voice corresponds to a male or female voice, you can use this parameter to help
   * clients choose the most appropriate voice for their application.
   */
  gender?: string;
  /**
   * Almost always, a voice can synthesize speech in just a single language. When an engine
   * supports more than one language, it can easily register a separate voice for each
   * language.
   */
  lang?: string;
  /**
   * Identifies the name of the voice and the engine used.
   */
  voice_name: string;
}

export enum EventType {
  End = 'end',
  Error = 'error',
  Marker = 'marker',
  Sentence = 'sentence',
  Start = 'start',
  Word = 'word',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toManifestD(json: string): ManifestD {
        return cast(JSON.parse(json), r("ManifestD"));
    }

  public static manifestDToJson(value: ManifestD): string {
        return JSON.stringify(uncast(value, r("ManifestD")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
  ManifestD: o(
    [
      {
        json: 'chrome_settings_overrides',
        js: 'chrome_settings_overrides',
        typ: u(undefined, 'any'),
      },
      {
        json: 'chrome_url_overrides',
        js: 'chrome_url_overrides',
        typ: u(undefined, r('ChromeURLOverrides')),
      },
      { json: 'commands', js: 'commands', typ: u(undefined, m(m('any'))) },
      { json: 'content_pack', js: 'content_pack', typ: u(undefined, 'any') },
      { json: 'content_scripts', js: 'content_scripts', typ: u(undefined, a(r('ContentScript'))) },
      { json: 'current_locale', js: 'current_locale', typ: u(undefined, 'any') },
      { json: 'default_locale', js: 'default_locale', typ: u(undefined, '') },
      { json: 'description', js: 'description', typ: u(undefined, '') },
      { json: 'devtools_page', js: 'devtools_page', typ: u(undefined, '') },
      {
        json: 'externally_connectable',
        js: 'externally_connectable',
        typ: u(undefined, r('ExternallyConnectable')),
      },
      {
        json: 'file_browser_handlers',
        js: 'file_browser_handlers',
        typ: u(undefined, a(r('FileBrowserHandler'))),
      },
      { json: 'homepage_url', js: 'homepage_url', typ: u(undefined, '') },
      { json: 'icons', js: 'icons', typ: u(undefined, r('Icons')) },
      { json: 'import', js: 'import', typ: u(undefined, 'any') },
      { json: 'incognito', js: 'incognito', typ: u(undefined, r('Incognito')) },
      {
        json: 'input_components',
        js: 'input_components',
        typ: u(undefined, a(r('InputComponent'))),
      },
      { json: 'key', js: 'key', typ: u(undefined, '') },
      { json: 'manifest_version', js: 'manifest_version', typ: 3.14 },
      { json: 'minimum_chrome_version', js: 'minimum_chrome_version', typ: u(undefined, '') },
      { json: 'nacl_modules', js: 'nacl_modules', typ: u(undefined, a(r('NaclModule'))) },
      { json: 'name', js: 'name', typ: '' },
      { json: 'oauth2', js: 'oauth2', typ: u(undefined, r('Oauth2')) },
      { json: 'offline_enabled', js: 'offline_enabled', typ: u(undefined, true) },
      { json: 'omnibox', js: 'omnibox', typ: u(undefined, r('Omnibox')) },
      { json: 'optional_permissions', js: 'optional_permissions', typ: u(undefined, a('')) },
      { json: 'options_page', js: 'options_page', typ: u(undefined, '') },
      { json: 'options_ui', js: 'options_ui', typ: u(undefined, r('OptionsUI')) },
      { json: 'permissions', js: 'permissions', typ: u(undefined, a('')) },
      { json: 'platforms', js: 'platforms', typ: u(undefined, 'any') },
      { json: 'requirements', js: 'requirements', typ: u(undefined, r('Requirements')) },
      { json: 'sandbox', js: 'sandbox', typ: u(undefined, r('Sandbox')) },
      { json: 'short_name', js: 'short_name', typ: u(undefined, '') },
      { json: 'signature', js: 'signature', typ: u(undefined, 'any') },
      { json: 'spellcheck', js: 'spellcheck', typ: u(undefined, 'any') },
      { json: 'storage', js: 'storage', typ: u(undefined, 'any') },
      { json: 'system_indicator', js: 'system_indicator', typ: u(undefined, 'any') },
      { json: 'tts_engine', js: 'tts_engine', typ: u(undefined, r('TTSEngine')) },
      { json: 'update_url', js: 'update_url', typ: u(undefined, '') },
      { json: 'version', js: 'version', typ: '' },
      { json: 'version_name', js: 'version_name', typ: u(undefined, '') },
    ],
    'any',
  ),
  ChromeURLOverrides: o(
    [
      { json: 'bookmarks', js: 'bookmarks', typ: u(undefined, '') },
      { json: 'history', js: 'history', typ: u(undefined, '') },
      { json: 'newtab', js: 'newtab', typ: u(undefined, '') },
    ],
    false,
  ),
  ContentScript: o(
    [
      { json: 'all_frames', js: 'all_frames', typ: u(undefined, true) },
      { json: 'css', js: 'css', typ: u(undefined, a('')) },
      { json: 'exclude_globs', js: 'exclude_globs', typ: u(undefined, a('')) },
      { json: 'exclude_matches', js: 'exclude_matches', typ: u(undefined, a('')) },
      { json: 'include_globs', js: 'include_globs', typ: u(undefined, a('')) },
      { json: 'js', js: 'js', typ: u(undefined, a('')) },
      { json: 'match_about_blank', js: 'match_about_blank', typ: u(undefined, true) },
      { json: 'matches', js: 'matches', typ: a('') },
      { json: 'run_at', js: 'run_at', typ: u(undefined, r('RunAt')) },
      { json: 'world', js: 'world', typ: u(undefined, r('World')) },
    ],
    false,
  ),
  ExternallyConnectable: o(
    [
      { json: 'accepts_tls_channel_id', js: 'accepts_tls_channel_id', typ: u(undefined, true) },
      { json: 'ids', js: 'ids', typ: u(undefined, a('')) },
      { json: 'matches', js: 'matches', typ: u(undefined, a('')) },
    ],
    false,
  ),
  FileBrowserHandler: o(
    [
      { json: 'default_title', js: 'default_title', typ: '' },
      { json: 'file_filters', js: 'file_filters', typ: a('') },
      { json: 'id', js: 'id', typ: '' },
    ],
    false,
  ),
  Icons: o(
    [
      { json: '128', js: '128', typ: u(undefined, '') },
      { json: '16', js: '16', typ: u(undefined, '') },
      { json: '256', js: '256', typ: u(undefined, '') },
      { json: '48', js: '48', typ: u(undefined, '') },
    ],
    'any',
  ),
  InputComponent: o(
    [
      { json: 'description', js: 'description', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'language', js: 'language', typ: '' },
      { json: 'layouts', js: 'layouts', typ: a('any') },
      { json: 'name', js: 'name', typ: '' },
      { json: 'type', js: 'type', typ: '' },
    ],
    false,
  ),
  NaclModule: o(
    [
      { json: 'mime_type', js: 'mime_type', typ: '' },
      { json: 'path', js: 'path', typ: '' },
    ],
    false,
  ),
  Oauth2: o(
    [
      { json: 'client_id', js: 'client_id', typ: '' },
      { json: 'scopes', js: 'scopes', typ: a('') },
    ],
    false,
  ),
  Omnibox: o([{ json: 'keyword', js: 'keyword', typ: '' }], false),
  OptionsUI: o(
    [
      { json: 'chrome_style', js: 'chrome_style', typ: u(undefined, true) },
      { json: 'open_in_tab', js: 'open_in_tab', typ: u(undefined, true) },
      { json: 'page', js: 'page', typ: '' },
    ],
    'any',
  ),
  Requirements: o(
    [
      { json: '3D', js: '3D', typ: u(undefined, r('The3D')) },
      { json: 'plugins', js: 'plugins', typ: u(undefined, r('Plugins')) },
    ],
    false,
  ),
  The3D: o([{ json: 'features', js: 'features', typ: a(r('Feature')) }], false),
  Plugins: o([{ json: 'npapi', js: 'npapi', typ: true }], false),
  Sandbox: o(
    [
      { json: 'content_security_policy', js: 'content_security_policy', typ: u(undefined, '') },
      { json: 'pages', js: 'pages', typ: a('') },
    ],
    false,
  ),
  TTSEngine: o([{ json: 'voices', js: 'voices', typ: a(r('Voice')) }], false),
  Voice: o(
    [
      { json: 'event_types', js: 'event_types', typ: a(r('EventType')) },
      { json: 'gender', js: 'gender', typ: u(undefined, '') },
      { json: 'lang', js: 'lang', typ: u(undefined, '') },
      { json: 'voice_name', js: 'voice_name', typ: '' },
    ],
    false,
  ),
  RunAt: ['document_end', 'document_idle', 'document_start'],
  World: ['ISOLATED', 'MAIN'],
  Incognito: ['not_allowed', 'spanning', 'split'],
  Feature: ['webgl'],
  EventType: ['end', 'error', 'marker', 'sentence', 'start', 'word'],
};
