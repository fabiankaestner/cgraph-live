module.exports = {
    configureWebpack: {
        devtool: "eval-source-map"
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/scss/variables.scss";
                `
            }
        }
    }
};
