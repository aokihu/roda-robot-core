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
 * Check runtime envrioment
 * - Node.json version must > 16
 */
async function check (param: {
  nodeVersion: string
}): Promise<IRodaCheckResult> {
  const result: IRodaCheckResult = { passed: true }

  // - Check node.js version
  const versionPartten = /v(\d+)\.(\d+)\.(\d+)/
  const versionMatchs = versionPartten.exec(param?.nodeVersion ?? version)
  
  if(Number(versionMatchs![1]) < 16) {
    result.passed = false;
    result.reason = "Node.js version must > v16"

    return result
  }
  

  return result;
}


/* Exports */
export default check;
