import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://rushimodel-adbe490bb85c.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // remove /api/proxy prefix
  },
});
