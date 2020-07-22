const parse = expr => { return Function('"use strict";return (' + expr + ')')(); }

export default parse;