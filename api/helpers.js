module.exports = {
    relativeURLPathCheck: (urlString) => {
        var pat = /^https?:\/\//i;
        if (pat.test(urlString)) {
            return false;
        }
        return true;
    }
}