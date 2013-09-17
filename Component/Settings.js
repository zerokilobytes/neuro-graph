var Settings = function() {
    this.dragForce = 0.12;
    this.linkRestLength = 100;
    this.gravity = 0.0;
    this.repultionForce = 100000;
    this.linkMaximalThickness = 8;
    this.linkMinimalThickness = 0.5;
    this.nodeSizeRatio = 0.25;
    this.initialZoomRatio = 4;
    this.initialVisibilityGraphDepth = 1;
    this.opacityChangeStep = 0.1;
    this.maximumNodes = 9999999;
    this.cleanUpAdditionalDepth = 1;
    this.downloadTimeout = 100000;
    this.maximumDownloadPerMinute = 100;
    this.maximumSimultaneousDownload = 30;
    this.multipleSelectionNodeMode = false;
    this.debugMode = false;
    this.navigationBarMode = false;
};

Settings.prototype = {
};