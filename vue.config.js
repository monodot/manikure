module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Kubernetes JSON/YAML Builder";
                return args;
            })
    }
}
