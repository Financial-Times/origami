// Removes support for ">/< styles" so non-indented HTML shows correctly in the diff.
// Prism creates a global object which we remove https://github.com/PrismJS/prism/blob/v1.15.0/prism.js#L6
// @see https://github.com/PrismJS/prism/blob/v1.15.0/components/prism-diff.js#L11
Prism.languages.diff = {
    'coord': [
        // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
        /^(?:\*{3}|-{3}|\+{3}).*$/m,
        // Match "@@ ... @@" coord lines in unified diff.
        /^@@.*@@$/m,
        // Match coord lines in normal diff (starts with a number).
        /^\d+.*$/m
    ],

    // Match inserted and deleted lines. Support both +/- and >/< styles.
    'deleted': /^[-].*$/m,
    'inserted': /^[+].*$/m,

    // Match "different" lines (prefixed with "!") in context diff.
    'diff': {
        'pattern': /^!(?!!).+$/m,
        'alias': 'important'
    }
};
