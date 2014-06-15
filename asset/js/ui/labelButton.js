var LabelButton = function(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    this.label = new Phaser.Text(game, 0, 0, 'Label');
    this.addChild(this.label);
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function(label) {
    this.label.setText(label);
    this.label.anchor.setTo(0.5, 0.5);
};

LabelButton.prototype.setStyles = function(styles) {
    for (var s in styles) {
        this.label.style[s] = styles[s];
    }
};