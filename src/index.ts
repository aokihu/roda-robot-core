/**
 * THIS FILE IS A PART OF Roda Robot Framework
 *
 * @file index.ts - Application entry
 * @module core
 * @author aokihu <aokihu@gmail.com>
 * @license MIT
 *
 * Copyright (c) 2020 aokihu
 */

import Check from './helpers/check'
import Config from './libs/config'


/* Application entry */
async function main() {
  await Check();
}

main();
