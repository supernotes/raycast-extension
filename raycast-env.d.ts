/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - Get your API key from Supernotes. */
  "apiKey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `send` command */
  export type Send = ExtensionPreferences & {}
  /** Preferences accessible in the `create` command */
  export type Create = ExtensionPreferences & {}
  /** Preferences accessible in the `search` command */
  export type Search = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `send` command */
  export type Send = {}
  /** Arguments passed to the `create` command */
  export type Create = {}
  /** Arguments passed to the `search` command */
  export type Search = {}
}


