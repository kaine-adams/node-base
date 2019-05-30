function onKongregateLoggedIn() {
    kongregate = kongregateAPI.getAPI();
    var params = "userid=" + kongregate.services.getUserId() + 
            "&username=" + kongregate.services.getUsername() +
            "&password=" + kongregate.services.getGameAuthToken();
    kongregateAPI.embedFrame("kongregate/authenticate?" + params, "contentdiv");
}

function onLoadCompleted(){
    kongregate = kongregateAPI.getAPI();
    if(kongregate.services.isGuest()) {
        kongregate.services.addEventListener("login", onKongregateLoggedIn);
        kongregateAPI.embedFrame("kongregate/guest", "contentdiv");
    }
    else {
        onKongregateLoggedIn();
    }
}

kongregateAPI.loadAPI(onLoadCompleted);