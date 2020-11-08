module.exports = {
    configureWebpack: {
        devtool: "eval-source-map"
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/scss/variables.scss";
                `
            }
        }
    }
};
