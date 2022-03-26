/**
 * THIS FILE IS A PART OF Roda Robot Framework
 *
 * @file helpers/log - Log records output
 * @module log
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 * Copyright (c) 2020 aokihu
 */

import * as Colors from './colors';
export type LogFormatTimestamp = 'short' | 'full';

/**
 * @class Log
 */
class Log {
  /* ---------------------------------- */
  /*         Private properties         */
  /* ---------------------------------- */
  private enable: boolean = process.env.RODA_LOG != null ?? false;
  private formatTimestamp: LogFormatTimestamp = 'full';
  private cache: Set<string> = new Set();

  /* ---------------------------------- */
  /*          Private functions         */
  /* ---------------------------------- */

  /**
   * Formated timestamp string
   * @returns timstamp string
   */
  private timestamp() {
    const now = new Date();
    const Y = now.getFullYear();
    const M = now.getMonth();
    const D = now.getDate();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds().toString().padStart(3, '0');

    switch (this.formatTimestamp) {
      case 'full':
        return `${Y}-${M}-${D} ` + `${h}:${m}:${s}.${ms}`;
      case 'short':
        return `${h}:${m}:${s}.${ms}`;
    }
  }

  /* ---------------------------------- */
  /*          Public functions          */
  /* ---------------------------------- */

  /**
   * Log enable
   */
  on = () => (this.enable = true);

  /**
   * Log disable
   */
  off = () => (this.enable = false);

  /**
   * Set the format of timestamp
   * @param format 'full' or 'short'
   */
  setFormatTimestamp = (format: LogFormatTimestamp) =>
    (this.formatTimestamp = format);

  /**
   * return error format string
   * @param msg Message string
   * @returns error format string
   */
  errorMessage = (msg: string) => Colors.red(`[${msg}]`);

  /**
   * return success fromat string
   * @param msg success format string
   * @returns success format string
   */
  successMessage = (msg: string) => Colors.green(`[${msg}]`);

  /**
   * Put message
   * @param msg message string array
   * @returns this
   */
  record(...msg: string[]): Log {
    for (const m of msg) {
      this.cache.add(m);
    }
    return this;
  }

  /**
   * Clear cache
   */
  flush = () => this.cache.clear();

  /**
   * print message to std
   */
  print(): Log {
    if (this.enable) {
      console.log(
        Colors.gray(this.timestamp()!),
        [...this.cache.values()].join('')
      );
    }
    return this;
  }

  /**
   * Print and flush cache
   */
  print_f = () => {
    this.print();
    this.flush();
  };
}

/* Exports*/
let _singleInstance: Log | null = null;
_singleInstance = _singleInstance ?? new Log();

export default _singleInstance;
