
const development = {
    name: 'development',
    asset_path: './assets',
    port_number = 8000,
    db: 'hospital_api_development',

};
const production = {
    name: 'production',

};

module.exports = development;
// module.exports = production;

// module.exports =
//     eval(process.env.HOSPITALAPI_ENVIRONMENT) == undefined
//         ? development
//         : eval(process.env.HOSPITALAPI_ENVIRONMENT);
