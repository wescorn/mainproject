const { http } = require('winston');
const { logger } = require('./logging');
const { GetUrl } = require('./serviceurls');
const axios = require('axios');

const ROUTES = [
    {
        url: '/orders',
        proxy: {
            target: `http://${GetUrl('orders')}/`,
            changeOrigin: true,
            pathRewrite: {
                [`^/orders`]: '',
            },
            selfHandleResponse: true,
            onProxyRes: function (proxyRes, req, res) {
                console.log('ON PROXY RES');
                // Modify response body
                let responseBody = '';
                proxyRes.on('data', (chunk) => {
                  responseBody += chunk;
                });
                

                proxyRes.on('end', () => {
                    const extra_data = Promise.all([
                        axios.get('http://products/products'),
                        axios.get('http://shipments/shipments')
                    ]);
                    console.log('HIT END');
                    extra_data.then(mres => {
                        const products = mres[0].data;
                        const shipments = mres[1].data;
                        //console.log('REPONSE ssBODY', JSON.parse(responseBody)[0].order_lines);

                        const aggregated_orders = (JSON.parse(responseBody)).map(order => {
                            order.order_lines = order.order_lines.map(orderline => {
                                orderline['product'] = products.find(p => p.id = orderline.product_id);
                                return orderline;
                            });
                            order.shipments = shipments.filter(shipment => {
                                return shipment.orders.find(o => o.id === order.id);
                            }).map(shipment => {
                                shipment.orders = shipment.orders.map(order => order.id);
                                return shipment;
                            });
                            return order;
                        })
                        console.log('MY AGG ORDERS', aggregated_orders);
                        //proxyRes.body = aggregated_orders;
                        res.send(aggregated_orders);
                    }).catch(err => {
                        console.log(err);
                    })
                });

                
                
            }
        },
        callback: (req, res) => {

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
    {
        url: '/shipments',
        proxy: {
            target: `http://${GetUrl('shipments')}/`,
            changeOrigin: true,
            pathRewrite: {
                [`^/shipments`]: '',
            },
        },
        callback: (req, res) => {
            console.log('callback works!');
            console.log('REQUEST HEADERS',req.headers)
            logger.info('requested shipments!')
        }
    },
]

exports.ROUTES = ROUTES;


const fetch_resource = (url) => {
    
}

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