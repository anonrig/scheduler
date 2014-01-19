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
    var chars = {"0":17,"1":17,"2":17,"3":17,"4":17,"5":17,"6":17,"7":17,"8":17,"9":17,":":9,";":9,"<":18,"=":18,">":18,"?":16,"@":24,"A":18,"B":19,"C":22,"D":21,"E":17,"F":16,"G":23,"H":21,"I":6,"J":15,"K":19,"L":16,"M":25,"N":21,"O":23,"P":18,"Q":23,"R":19,"S":19,"T":16,"U":21,"V":17,"W":27,"X":17,"Y":18,"Z":17,"[":8,"\\":10,"]":8,"^":18,"_":16,"`":6,"a":16,"b":17,"c":16,"d":17,"e":16,"f":8,"g":17,"h":16,"i":6,"j":6,"k":14,"l":6,"m":24,"n":16,"o":17,"p":17,"q":17,"r":9,"s":15,"t":8,"u":16,"v":14,"w":22,"x":14,"y":14,"z":13},
    //{"0":17,"1":17,"2":17,"3":17,"4":17,"5":17,"6":17,"7":17,"8":17,"9":17,":":8,";":8,"<":18,"=":18,">":18,"?":16,"@":24,"A":19,"B":20,"C":21,"D":21,"E":18,"F":16,"G":22,"H":21,"I":7,"J":15,"K":19,"L":16,"M":25,"N":21,"O":22,"P":19,"Q":22,"R":20,"S":19,"T":17,"U":21,"V":18,"W":27,"X":17,"Y":18,"Z":17,"[":7,"\\":10,"]":7,"^":18,"_":15,"`":6,"a":16,"b":17,"c":16,"d":17,"e":16,"f":8,"g":17,"h":16,"i":6,"j":6,"k":15,"l":6,"m":25,"n":16,"o":17,"p":17,"q":17,"r":9,"s":14,"t":9,"u":16,"v":14,"w":22,"x":14,"y":14,"z":14},
        defaultCharWidth = 6;

//    var sizer = tart.dom.createElement('<span style="font-size: 30px"></span>');
//    document.body.appendChild(sizer);
//
//    for (var i = 48; i < 123; i++) {
//        var charK = String.fromCharCode(i);
//
//        sizer.innerHTML = charK;
//        chars[charK] = sizer.offsetWidth;
//    }
//    document.body.removeChild(sizer);

    /**
     * Calculates a string's width assuming that it's original font size is 30px.
     *
     * @param {string} word String that need control for adding three dot.
     * @param {number=} width Optional width value for sizer limit.
     */
    sc.util.calcuteFontSizeForWidth = function(word, width) {
        var length = word.split('').reduce(function(i, v) {
            return i + (chars[v] || defaultCharWidth);
        }, 0);

        return length <= width ? 30 : Math.floor(30 * width / length);
    };
})();
