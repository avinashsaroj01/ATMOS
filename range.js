module.exports = (req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.header('Content-Range', 'posts 0-10/40');
    next();
}
