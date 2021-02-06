let appConfig = {};
appConfig.port = process.env.PORT || 4444,
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db=
 {
        //uri:'mongodb+srv://databse:database@cluster0.r3dbh.mongodb.net/Glory-website?retryWrites=true&w=majority'
        uri:'mongodb+srv://databse:database@cluster0.u1a2b.mongodb.net/Glory-website?retryWrites=true&w=majority'
        //uri:'mongodb+srv://databse:database@cluster0.u1a2b.mongodb.net/Glory-website?retryWrites=true&w=majority'
 }
 appConfig.apiVersion = '/api/gloryweb';

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}
