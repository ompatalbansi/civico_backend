
const cspMiddleware = async(req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        `connect-src 'self' ${process.env.BACKEND_URL} ${process.env.WS_URL} ${process.env.FRONTEND_URL} https://cdnjs.cloudflare.com;`
    );
    return next();
};

export default cspMiddleware;
