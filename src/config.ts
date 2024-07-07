import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';

export const appInfo = {
    appName: 'porcelain_factory',
    apiDomain: 'http://localhost:81',
    websiteDomain: 'http://localhost:81',
    apiBasePath: '/',
    websiteBasePath: '/',
};

export const connectionUri = 'https://st-dev-da90f640-371c-11ef-97bb-339e84dc45d0.aws.supertokens.io';
export const apiKey = 'mz-WJXRCNwH5bf4Q2XzR1tNBG=';

export const recipeList = [
    Passwordless.init({
        contactMethod: 'EMAIL',
        flowType: 'USER_INPUT_CODE',
    }),
    Session.init(),
    Dashboard.init(),
];