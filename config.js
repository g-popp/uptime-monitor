/*
 * Create and export configuration variables
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
    PORT: 3000,
    envName: 'staging',
};

// Production environment
environments.production = {
    PORT: 8080,
    envName: 'prod',
};

// Determine which environment was passed a command-line arg
var currentEnvironment =
    typeof process.env.NODE_ENV == 'string'
        ? process.env.NODE_ENV.toLowerCase()
        : 'staging';

// Check that the current environment is one of the envoronmnets above, default = 'staging'
var environmentToExport =
    typeof environments[currentEnvironment] == 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export the module
module.exports = environmentToExport;
