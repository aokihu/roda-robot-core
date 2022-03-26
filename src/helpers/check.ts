/**
 * THIS FILE IS A PART OF Roda Robot Framework
 *
 * @file helpers/check.ts - Check runtime envrioment
 * @module check
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 * Copyright (c) 2020 aokihu
 */

import {version} from 'process'
import * as Colors from './colors'
import Log from './log'

/**
 * @type IRoadCheckResult
 * @member passed the result of check
 * @member reason? the reason of fail
 */
export interface IRodaCheckResult {
  passed: boolean
  reason?: string
}

/**
 * Before check
 */
function precheck() {
  Log?.record("Check envrioment...").print_f()
}

/**
 * check node runtime version
 * @param ver version string
 * @returns passed return null, or failed return reason
 */
function checkNodeVersion(ver?: string): null | string {
    const versionPartten = /v(\d+)\.(\d+)\.(\d+)/
    const nodeVersion = ver ?? version
    const versionMatchs = versionPartten.exec(nodeVersion)
  
    if(Number(versionMatchs![1]) < 16) {
      Log?.record(Log.errorMessage("failed")," Node.js version is ", Colors.brightBlue(nodeVersion)).print_f()
      return "Node.js version must > v16";
    }
  
    Log?.record( Log.successMessage("pass"), " Node.js version is ", Colors.brightBlue(nodeVersion)).print_f()
    return null;
}

/**
 * Check runtime envrioment
 * - Node.json version must > 16
 */
async function check (param?: {
  nodeVersion?: string
}): Promise<IRodaCheckResult> {
  precheck();
  const result: IRodaCheckResult = { passed: true }

  // - Check node.js version
  let reason = checkNodeVersion(param?.nodeVersion)
  if(reason) {
    result.passed = false;
    result.reason = reason;
  }
  
  // - return check result
  return result;
}


/* Exports */
export default check;
