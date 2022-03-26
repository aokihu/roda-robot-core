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
 * Check runtime envrioment
 * - Node.json version must > 16
 */
async function check (param?: {
  nodeVersion?: string
}): Promise<IRodaCheckResult> {
  precheck();
  const result: IRodaCheckResult = { passed: true }

  // - Check node.js version
  const versionPartten = /v(\d+)\.(\d+)\.(\d+)/
  const nodeVersion = param?.nodeVersion ?? version
  const versionMatchs = versionPartten.exec(nodeVersion)
  
  if(Number(versionMatchs![1]) < 16) {
    result.passed = false;
    result.reason = "Node.js version must > v16"
    Log?.record(Log.errorMessage("failed")," Node.js version is ", Colors.brightBlue(nodeVersion)).print_f()
    return result
  }
  Log?.record( Log.successMessage("pass"), " Node.js version is ", Colors.brightBlue(nodeVersion)).print_f()
  
  return result;
}


/* Exports */
export default check;
