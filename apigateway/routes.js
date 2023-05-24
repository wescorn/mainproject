const { logger } = require('./logging');
const { GetUrl } = require('./serviceurls');

const ROUTES = [
    {
        url: '/orders',
        proxy: {
            target: `http://${GetUrl('orders')}/`,
            changeOrigin: true,
            pathRewrite: {
                [`^/orders`]: '',
            },
        },
        callback: (req, res) => {
            console.log('callback works!');
            console.log('REQUEST HEADERS',req.headers)
            logger.info('requested orders!')
        }
    },
    {
        url: '/products',
        proxy: {
            target: `http://${GetUrl('products')}/`,
            changeOrigin: true,
            pathRewrite: {
                [`^/products`]: '',
            },
        },
        callback: (req, res) => {
            console.log('callback works!');
            console.log('REQUEST HEADERS',req.headers)
            logger.info('requested products!')
        }
    },
]

exports.ROUTES = ROUTES;




/* {
    url: '/orders',
    auth: false,
    creditCheck: false,
    rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 5
    },
    proxy: {
        target: "https://www.google.com",
        changeOrigin: true,
        pathRewrite: {
            [`^/free`]: '',
        },
    }
}, */