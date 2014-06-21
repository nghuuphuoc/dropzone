var Config = function() {
    Phaser.State.call(this);
};

Config.prototype = Object.create(Phaser.State.prototype);
Config.prototype.constructor = Config;

/**
 * The default settings
 */
Config.DEFAULT = {
    speed:      100,        // m/s
    height:     1000,       // m
    mass:       0.1,        // kg
    diameter:   5,
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

Config.prototype.create = function() {
    var w = this.game.width,
        h = this.game.height;

    // Add background
    this.game.add.sprite(0, 0, 'background');

    // Add wave
    this.game.add.sprite(0, h - 90, 'sea');
    this.wave = this.game.add.tileSprite(0, h - 90, w, 90, 'wave');
    this.wave.autoScroll(-200, 0);

    // Create a title group
    this.titleGroup = this.game.add.group();

    this.title = this.game.add.sprite(w/2 - 500, 150, 'title');
    this.titleGroup.add(this.title);

    this.plane = this.game.add.sprite(w/2 + 80, 142, 'plane');
    this.titleGroup.add(this.plane);

    this.plane.animations.add('fly');
    this.plane.animations.play('fly', 10, true);

    // Animate the title group
    this.game.add.tween(this.titleGroup).to({ y: 10 }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //$(this.game.canvas).parent().hide();
    var that = this, settings = Config.load();

    // Init the value for form
    for (var k in settings) {
        $('#config').find('input[name="' + k + '"]').val(settings[k]);
    }

    // Show the form
    $('#config')
        .css('left', (w - $('#config').width()) / 2)
        .show()
        // Save button handler
        .find('button.save')
            .off('click')
            .on('click', function() {
                var settings = {};
                $('#config').find('input').each(function() {
                    settings[$(this).attr('name')] = $(this).val();
                });

                that.save(settings);
            })
            .end()
        // Cancel button handler
        .find('button.cancel')
            .off('click')
            .on('click', function() {
                that.cancel();
            })
            .end();
};

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
Config.prototype.save = function(settings) {
    // Save the settings
    localStorage.setItem(Config.SETTING_KEY, JSON.stringify(settings));
    this.cancel();
};

/**
 * Cancel the setting modifications
 */
Config.prototype.cancel = function() {
    $('#config').hide();
    this.game.playPrevState();
};
