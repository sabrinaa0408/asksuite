module.exports = {
    caminho: (urlString) => {
        var pat = /^https?:\/\//i;
        if (pat.test(urlString)) {
            return false;
        }
        return true;
    }
}