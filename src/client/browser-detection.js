let isBrowser = false;
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  isBrowser = true;
}

module.exports.isBrowser = isBrowser;