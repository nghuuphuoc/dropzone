var Config = {};

/**
 * The default settings
 */
Config.DEFAULT = {
    speed:      100,        // m/s
    height:     1000,       // m
    distance:   500,        // m (1cm --> 1px)
    mass:       0.1,        // kg
    numBoxes:   8,
    vx0:        30,         // X-Velocity (m/s)
    vy0:        0,          // Y-Velocity (m/s)
    vz0:        35,         // Z-Velocity (m/s)
    cd:         1.05,       // Drag coefficients (1.05 - 1.07 for cube)
    density:    1.225,      // kg/m3
    area:       0.001432    // m2
};

// The setting key for local storage
Config.SETTING_KEY = 'settings';

/**
 * Load the settings
 */
Config.load = function() {
    var settings = localStorage.getItem(Config.SETTING_KEY);
    if (settings) {
        settings = JSON.parse(settings);
    }
    settings = $.extend({}, Config.DEFAULT, settings);
    return settings;
};

/**
 * Save the settings
 */
Config.save = function(settings) {
    // Save the settings
    localStorage.setItem(Config.SETTING_KEY, JSON.stringify(settings));
};
