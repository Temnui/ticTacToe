let playButton;
let adDisplayContainer;
let adsInitialized;
let adsLoader;

function initDesktopAutoplayExample() {
    playButton = document.getElementById('playButton');
    playButton.addEventListener('click', () => {
        // Initialize the container. Must be done via a user action where autoplay
        // is not allowed.
        adDisplayContainer.initialize();
        adsInitialized = true;
        playAds();
    });
    setUpIMA();
}

function setUpIMA() {
    // Create the ad display container.
    createAdDisplayContainer();
    // Create ads loader.
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded, false);
    adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);
}

function createAdDisplayContainer() {
    // We assume the adContainer is the DOM id of the element that will house
    // the ads.
    adDisplayContainer = new google.ima.AdDisplayContainer(
        document.getElementById('adContainer'), videoContent);
}

function playAds() {
    try {
        if (!adsInitialized) {
            adDisplayContainer.initialize();
            adsInitialized = true;
        }
        // Initialize the ads manager. Ad rules playlist will start at this time.
        adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        adsManager.start();
    } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        videoContent.play();
    }
}