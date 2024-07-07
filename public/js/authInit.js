supertokens.init({
    enableDebugLogs: true,
    appInfo: {
        apiDomain: "http://localhost:81",
        apiBasePath: '/',
        appName: "porcelain_factory",
    },
    recipeList: [
        supertokensSession.init(),
        supertokensPasswordless.init(),
    ],
});