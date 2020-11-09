module.exports = {
    configureWebpack: {
        devtool: "eval-source-map"
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/scss/variables.scss";
                `
            }
        }
    }
};
