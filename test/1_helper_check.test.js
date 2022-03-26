/**
 * THIS FILE IS A PART OF Roda Robot Framework
 *
 * @file 1_helper_check - Testcase for check helpers
 * @module 
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 * Copyright (c) 2020 aokihu
 */

const assert = require('assert')
const {version} = require('process')
const {default: check} = require('../build/helpers/check.js')

describe("Check helper testcase", () => {
  
  it("Fake version 'v12.0.1', it will be fail", (done) => {
    check({nodeVersion: 'v12.0.1'}).then(({passed, reason}) => {
      assert.strictEqual(passed, false, reason)
      done()
    })
  })

  it("Fake version 'v16.0.2', it will be passed", (done) => {
    check({nodeVersion: 'v16.0.2'}).then(({passed, reason}) => {
      assert.strictEqual(passed, true, reason)
      done()
    })
  })

  it("Fake version 'v17.2.1', it will bepassed", (done) => {
    check({nodeVersion: 'v17.2.1'}).then(({passed, reason}) => {
      assert.strictEqual(passed, true, reason)
      done()
    })
  })

  it("Nodejs runtime version", (done) => {
    const matchs = /v(\d+)\.(\d+)\.(\d+)/.exec(version)
    const isGreater = Number(matchs[1]) >= 16

    check().then(({passed, reason}) => {
      assert.strictEqual(passed, isGreater, reason)
      done()
    })
  })

})
