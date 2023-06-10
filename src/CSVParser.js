const parsingMethods = {
  toArrays(csv, options) {
    // cache settings
    const separator = options.separator;
    const delimiter = options.delimiter;

    // set initial state if it's missing
    if (!options.state.rowNum) {
      options.state.rowNum = 1;
    }
    if (!options.state.colNum) {
      options.state.colNum = 1;
    }

    // clear initial state
    const data = [];
    let entry = [];
    let state = 0;
    let value = '';
    let exit = false;

    function endOfEntry() {
      // reset the state
      state = 0;
      value = '';

      // if 'start' hasn't been met, don't output
      if (options.start && options.state.rowNum < options.start) {
        // update global state
        entry = [];
        options.state.rowNum++;
        options.state.colNum = 1;
        return;
      }

      if (options.onParseEntry === undefined) {
        // onParseEntry hook not set
        data.push(entry);
      } else {
        const hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
        // false skips the row, configurable through a hook
        if (hookVal !== false) {
          data.push(hookVal);
        }
      }
      // console.log('entry:' + entry);

      // cleanup
      entry = [];

      // if 'end' is met, stop parsing
      if (options.end && options.state.rowNum >= options.end) {
        exit = true;
      }

      // update global state
      options.state.rowNum++;
      options.state.colNum = 1;
    }

    function endOfValue() {
      if (options.onParseValue === undefined) {
        // onParseValue hook not set
        entry.push(value);
      } else if (options.headers && options.state.rowNum === 1) {
        // don't onParseValue object headers
        entry.push(value);
      } else {
        const hook = options.onParseValue(value, options.state); // onParseValue Hook
        // false skips the row, configurable through a hook
        if (hook !== false) {
          entry.push(hook);
        }
      }
      // console.log('value:' + value);
      // reset the state
      value = '';
      state = 0;
      // update global state
      options.state.colNum++;
    }

    // escape regex-specific control chars
    // const escSeparator = RegExp.escape(separator)
    // const escDelimiter = RegExp.escape(delimiter)

    // compile the regEx str using the custom delimiter/separator
    let match = /(D|S|\r\n|\n|\r|[^DS\r\n]+)/;
    let matchSrc = match.source;
    matchSrc = matchSrc.replace(/S/g, separator);
    matchSrc = matchSrc.replace(/D/g, delimiter);
    match = new RegExp(matchSrc, 'gm');

    // put on your fancy pants...
    // process control chars individually, use look-ahead on non-control chars
    csv.replace(match, function (m0) {
      if (exit) {
        return;
      }
      switch (state) {
        // the start of a value
        case 0:
          // null last value
          if (m0 === separator) {
            value += '';
            endOfValue();
            break;
          }
          // opening delimiter
          if (m0 === delimiter) {
            state = 1;
            break;
          }
          // null last value
          if (/^(\r\n|\n|\r)$/.test(m0)) {
            endOfValue();
            endOfEntry();
            break;
          }
          // un-delimited value
          value += m0;
          state = 3;
          break;

        // delimited input
        case 1:
          // second delimiter? check further
          if (m0 === delimiter) {
            state = 2;
            break;
          }
          // delimited data
          value += m0;
          state = 1;
          break;

        // delimiter found in delimited input
        case 2:
          // escaped delimiter?
          if (m0 === delimiter) {
            value += m0;
            state = 1;
            break;
          }
          // null value
          if (m0 === separator) {
            endOfValue();
            break;
          }
          // end of entry
          if (/^(\r\n|\n|\r)$/.test(m0)) {
            endOfValue();
            endOfEntry();
            break;
          }
          // broken paser?
          throw Error(
            'CSVDataError: Illegal State [Row:' +
              options.state.rowNum +
              '][Col:' +
              options.state.colNum +
              ']'
          );

        // un-delimited input
        case 3:
          // null last value
          if (m0 === separator) {
            endOfValue();
            break;
          }
          // end of entry
          if (/^(\r\n|\n|\r)$/.test(m0)) {
            endOfValue();
            endOfEntry();
            break;
          }
          if (m0 === delimiter) {
            // non-compliant data
            throw Error(
              'CSVDataError: Illegal Quote [Row:' +
                options.state.rowNum +
                '][Col:' +
                options.state.colNum +
                ']'
            );
          }
          // broken parser?
          throw Error(
            'CSVDataError: Illegal Data [Row:' +
              options.state.rowNum +
              '][Col:' +
              options.state.colNum +
              ']'
          );
        default:
          // shenanigans
          throw Error(
            'CSVDataError: Unknown State [Row:' +
              options.state.rowNum +
              '][Col:' +
              options.state.colNum +
              ']'
          );
      }
      // console.log('val:' + m0 + ' state:' + state);
    });

    // submit the last entry
    // ignore null last line
    if (entry.length !== 0) {
      endOfValue();
      endOfEntry();
    }

    return data;
  },
};

class CSVParser {
  constructor(parsingMethods) {
    this.parsers = parsingMethods;
    this.defaults = {
      separator: ',',
      delimiter: '"',
      headers: true,
    };
  }

  toArrays(csv, options, callback) {
    // if callback was passed to options swap callback with options
    if (options !== undefined && typeof options === 'function') {
      if (callback !== undefined) {
        return console.error(
          'You cannot 3 arguments with the 2nd argument being a function'
        );
      }
      callback = options;
      options = {};
    }

    options = options !== undefined ? options : {};
    const config = {};
    config.callback =
      callback !== undefined && typeof callback === 'function'
        ? callback
        : false;
    config.separator =
      'separator' in options ? options.separator : this.defaults.separator;
    config.delimiter =
      'delimiter' in options ? options.delimiter : this.defaults.delimiter;

    // setup
    let data = [];
    options = {
      delimiter: config.delimiter,
      separator: config.separator,
      onPreParse: options.onPreParse,
      onParseEntry: options.onParseEntry,
      onParseValue: options.onParseValue,
      onPostParse: options.onPostParse,
      start: options.start,
      end: options.end,
      state: {
        rowNum: 1,
        colNum: 1,
      },
    };

    // onPreParse hook
    if (options.onPreParse !== undefined) {
      csv = options.onPreParse(csv, options.state);
    }

    // parse the data
    data = this.parsers.toArrays(csv, options);

    // onPostParse hook
    if (options.onPostParse !== undefined) {
      data = options.onPostParse(data, options.state);
    }

    // push the value to a callback if one is defined
    if (!config.callback) {
      return data;
    } else {
      config.callback('', data);
    }
  }
}

export default new CSVParser(parsingMethods);
