var evt_onInstalled = function( event ){
  console.log('SUP, I have been '+event.reason+'ed!');

  chrome.tabs.onUpdated.addListener( evt_tabOnUpdated );
};

var evt_tabOnUpdated = function(tabId, info, tab )
{
  if( tab.url.match(/http(s)?:\/\/(www\.)?bbc\.co\.uk\/iplayer.*/gi) !== null &&
      info.status == "complete" ) 
  {
    chrome.tabs.executeScript(tabId, {
      allFrames : false,
      file      : "page.js"
      //runAt     : ""
    }, evt_tabOnInjected)

    // TODO: Bind event for net failure
    chrome.webRequest.onErrorOccurred.addListener( evt_netOnError, {
      types : ["object", "xmlhttprequest", "other"],
      urls : [ "*://*.bbc.co.uk/iplayer*" ]
    });
  }
};

var evt_netOnError = function( event )
{
  console.log("webRequest.onErrorOccurred", event);
  alert("AMAGAAAAHHD!\nIt happened! Check the log!");
};

var evt_tabOnInjected = function( result )
{
  console.log("tabs.onInjected", result);
};

chrome.runtime.onInstalled.addListener(evt_onInstalled);
