import('open').then((open) => {

  module.exports = function override(config, env) {
    if (env === 'development') {
      // Disable automatic browser reloading
      config.devServer.hot = false;
      config.devServer.liveReload = false;
  
      // Open the browser after the dev server starts
      config.devServer.onAfterSetupMiddleware = () => {
        open('http://localhost:3000');
      };
    }
    
    return config;
  };
}).catch((error) => {
  console.log(error);
});

