'use strict';
function globLookup(src, keypath) {
  var timeStart = new Date().getTime();
  var path = keypath.split(globLookup.delimiter);
  var res = path.reduce(function (candidates, key, idx) {
    if (!key.length) {
      throw new Error('Path cannot be empty.');
    }

    var newCandidates = [];
    candidates.map(function (candidate) {
      if (key === '*') {
        if (Array.isArray(candidate)) {
          candidate.map(function (entry) {
            newCandidates.push(entry);
          });
        } else if (typeof candidate === 'object') {
          Object.keys(candidate).map(function (candidateName) {
            newCandidates.push(candidate[candidateName]);
          });
        }

        return;
      }

      var entry = candidate[key];
      if (typeof entry !== 'undefined') {
        newCandidates.push(entry);
      }
    });
    return newCandidates;
  }, [src]);

  return res;
}

globLookup.delimiter = '.';

module.exports = globLookup;

