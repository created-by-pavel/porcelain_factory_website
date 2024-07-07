supertokens.init({
    enableDebugLogs: true,
    appInfo: {
        apiDomain: "https://porcelain-factory-website.onrender.com",
        apiBasePath: '/',
        appName: "porcelain_factory",
    },
    recipeList: [
        supertokensSession.init(),
        supertokensPasswordless.init(),
    ],
});