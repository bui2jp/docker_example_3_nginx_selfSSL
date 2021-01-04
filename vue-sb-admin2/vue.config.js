const webpack = require('webpack');
// vue.config.js
module.exports = {
    // options...
    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            //bootstrapで利用されているjqueryとpoper.jsを追加
            new webpack.ProvidePlugin({
                //$: 'jquery',
                //jQuery: 'jquery',
                //'window.jQuery': 'jquery',                
                // jquery: 'jquery',
                // 'window.$': 'jquery',
                // Popper: ['popper.js', 'default'],
              })
        ]
    }    
  }