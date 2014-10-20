var Config = {};

/**
 * The default settings
 */
Config.DEFAULT = {
    // Init velocity (m/s)
    vx0: 100,
    vy0: 0,
    vz0: 0,

    // Box size (m)
    long: 5,
    width: 5,

    // Box mass (kg)
    mass: 10,

    // Drag coefficients (1.05 - 1.07 for cube)
    cd: 1.05,

    // Air density (kg/m^3)
    density: 0, //1.225,

    // Wind velocity (m/s)
    windVx: 0,
    windVy: 0
};

// The setting key for local storage
Config.SETTING_KEY = 'settings';

/**
 * Save the settings
 *
 * @param {Object} settings
 */
Config.set = function(settings) {
    // Save the settings
    localStorage.setItem(Config.SETTING_KEY, JSON.stringify(settings));
};

/**
 * Get the settings
 *
 * @returns {Object}
 */
Config.get = function() {
    var settings = localStorage.getItem(Config.SETTING_KEY);
    if (settings) {
        settings = JSON.parse(settings);
    }
    settings = $.extend({}, Config.DEFAULT, settings);
    return settings;
};
