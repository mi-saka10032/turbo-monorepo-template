// 开发环境地址
const config: Record<string, string> = {
  vue: 'http://localhost:3001',
  react: 'http://localhost:3002',
};

// 线上环境地址
if (import.meta.env.MODE === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key] = window.location.origin;
  });
}

export default config;
