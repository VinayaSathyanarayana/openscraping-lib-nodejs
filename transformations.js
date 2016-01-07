/*
This file conforms to ESLint linting rules: http://eslint.org/docs/user-guide/command-line-interface.
ESLine configuration is below. Here is what the numbers mean:
0 - turn the rule off
1 - turn the rule on as a warning (doesn't affect exit code)
2 - turn the rule on as an error (exit code is 1 when triggered)
*/

/* eslint-env node */
/* eslint new-cap: 0 */
/* eslint no-trailing-spaces: [2, { "skipBlankLines": true }] */

'use strict'

module.exports = (function createTransformations () {
  var moment = require('moment')
  var findExtraWhitespacesRegex = new RegExp('\\s\\s+', 'gm')
  
  return {
    TrimTransformation: trim,
    ParseDateTransformation: parseDate,
    RemoveExtraWhitespaceTransformation: removeExtraWhitespace
  }
  
  function trim (node, config) {
    var textContent
    
    if (typeof node === 'string') {
      textContent = node
    } else {
      textContent = node.textContent
    }
    
    return textContent.trim()
  }
  
  function parseDate (node, config) {
    var textContent
    
    if (typeof node === 'string') {
      textContent = node
    } else {
      textContent = node.textContent
    }
    
    var extractedDate = moment(new Date(textContent))
    
    if (extractedDate.isValid()) {
      if (config && config._format) {
        return extractedDate.format(config._format)
      } else {
        return extractedDate.format()
      }
    } else {
      return undefined
    }
  }
  
  function removeExtraWhitespace (node, config) {
    var textContent
    
    if (typeof node === 'string') {
      textContent = node
    } else {
      textContent = node.textContent
    }
    
    return textContent.replace(findExtraWhitespacesRegex, ' ')
  }
}())
