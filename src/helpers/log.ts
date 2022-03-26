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

export type LogFormatTimestamp = 'short' | 'full'

/**
 * @class Log
 */
class Log {

  /* Private properties */
  private enable: boolean = true
  private formatTimestamp: LogFormatTimestamp = 'full'
  private cache: Set<string> = new Set()

  /* Private functions */

  private timestamp() {
    const now = new Date();

    if(this.formatTimestamp === 'full') {
      return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
    } else if(this.formatTimestamp === 'short') {
      return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`
    }
  }
  
  /* Public functions */

  /**
   * Log enable
   */
  on(): void {
    this.enable = true;
  }

  /**
   * Log disable
   */
  off(): void {
    this.enable = false
  }

  /**
   * Set the format of timestamp
   * @param format 'full' or 'short'
   */
  setFormatTimestamp(format: LogFormatTimestamp) {
    this.formatTimestamp = format
  }
  
  /**
   * return error format string
   * @param msg Message string
   * @returns error format string
   */
  errorMessage(msg: string) {
    return Colors.red(`[${msg}]`);
  }

  /**
   * return success fromat string
   * @param msg success format string
   * @returns success format string
   */
  successMessage(msg: string) {
    return Colors.green(`[${msg}]`)
  }

  /**
   * Put message
   * @param msg message string array
   * @returns this
   */
  record(...msg: string[]): Log{
    for(const m of msg) {
      this.cache.add(m)
    }
    return this;
  }

  /**
   * Clear cache
   */
  flush(): void {
    this.cache.clear();
  }

  /**
   * print message to std
   */
  print(): Log {
    if(this.enable) {
      console.log(Colors.gray(this.timestamp()!), [...this.cache.values()].join(""));
    }
    
    return this;
  }

  /**
   * Print and flush cache
   */
  print_f(): void {
    this.print();
    this.flush();
  }

}

/* Exports*/
let _singleInstance: Log | null = null;
_singleInstance = _singleInstance ?? new Log()

export default _singleInstance
