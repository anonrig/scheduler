goog.provide('sc.util');



(function() {
    var charMappings = [
        new RegExp('[cç]', 'ig'),
        new RegExp('[gğ]', 'ig'),
        new RegExp('[iı]', 'ig'),
        new RegExp('[oö]', 'ig'),
        new RegExp('[sş]', 'ig'),
        new RegExp('[uü]', 'ig')
    ];

    /**
     * Generate a word matching regular expression pattern.
     *
     * Maps regex character class mappings to extend matching of [a-zA-Z0-9] character class pattern.
     *
     * Two regexps are tested to match a word.
     * First regexp is used to match the word beginning in the string.
     * Second regexp is used to match the word after the beginning of the string.
     *
     * @param {string} pattern Word pattern.
     * @return {RegExp}
     */
    sc.util.generateWordMatchingPattern = function(pattern) {
        pattern = goog.string.regExpEscape(pattern);
        goog.array.forEach(charMappings, function(regex) {
            pattern = pattern.replace(regex, regex.source);
        });

        return new RegExp('(^' + pattern + '|\\W' + pattern + ')', 'ig');
    };
})();


(function() {
    var sizer = tart.dom.createElement('<span class="sizer"></span>');
    document.body.appendChild(sizer);

    /**
     * Calculate a string's length in document.
     *
     * @param {!string} word String to calculate width for.
     * @param {Function} styler Styler.
     */
    sc.util.getWordWidth = function(word, styler) {
        styler(sizer);
        sizer.innerHTML = word;
        return sizer.clientWidth + 1;
    };
})();
