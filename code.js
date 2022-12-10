var defaultFeedUrl = "http://scripting.com/rss.xml";

var config = {
	flDisplayBodytext: true,
	maxTitleTextLength: 120,
	maxBodyTextLength: 240,
	maxItemTextLength: 50,
	maxItemsInList: 25
	};

function getUrlParam (name) { 
	var val = getURLParameter (name);
	if (val == "null") {
		return (undefined);
		}
	else {
		return (decodeURIComponent (val));
		}
	}
function goToNewUrl () {
	var newUrl = $("#idFeedUrlInput").val ();
	window.location.href = "?url=" + encodeURIComponent (newUrl);
	}
function firstCharsFrom (theString, ctCharsApprox) {
	var ixLastWhitespace = 0;
	for (var i = 0; i < theString.length; i++) {
		if (isWhitespace (theString [i])) {
			ixLastWhitespace = i;
			}
		if (i == ctCharsApprox) {
			return (stringMid (theString, 1, ixLastWhitespace));
			}
		}
	return (theString);
	}
function httpRequest (url, timeout, headers, callback) {
	timeout = (timeout === undefined) ? 30000 : timeout;
	var jxhr = $.ajax ({ 
		url: url,
		dataType: "text", 
		headers,
		timeout
		}) 
	.success (function (data, status) { 
		callback (undefined, data);
		}) 
	.error (function (status) { 
		var message;
		try { //9/18/21 by DW
			message = JSON.parse (status.responseText).message;
			}
		catch (err) {
			message = status.responseText;
			}
		var err = {
			code: status.status,
			message
			};
		callback (err);
		});
	}
function readFeed (feedUrl, callback) {
	var url = "http://feeder.scripting.com/returnjson?url=" + feedUrl;
	httpRequest (url, undefined, undefined, function (err, jsontext) {
		if (err) {
			callback (err);
			}
		else {
			try {
				var jstruct = JSON.parse (jsontext);
				callback (undefined, jstruct); 
				}
			catch (err) {
				callback (err);
				}
			}
		});
	}
function viewFeedItems (feedUrl) {
	const elipses = "...";
	readFeed (feedUrl, function (err, theFeed) {
		if (err) {
			alertDialog (err.message);
			}
		else {
			$("#idFeedTitle").text (theFeed.title);
			const itemViewer = $("#idItemViewer");
			const itemList = $("<ul></ul>");
			var ctItems = 0;
			theFeed.items.forEach (function (feedItem) {
				if (ctItems < config.maxItemsInList) {
					const viewedItem = $("<li></li>");
					var titleText = "", bodyText = "";
					if (feedItem.title !== undefined) {
						titleText = stripMarkup (feedItem.title) + " ";
						bodyText = stripMarkup (feedItem.description);
						}
					else {
						let s = stripMarkup (feedItem.description);
						titleText = firstCharsFrom (s, config.maxTitleTextLength);
						bodyText = stringDelete (s, 1, titleText.length);
						
						bodyText = maxStringLength (bodyText, config.maxBodyTextLength, true, true); //whole words, if truncated add elipses
						}
					const theTitle = $("<span class=\"spTitleText\">" + titleText + "</span>");
					const theBody = $("<span class=\"spBodyText\">" + bodyText + "</span>");
					
					viewedItem.append (theTitle);
					if (config.flDisplayBodytext) {
						viewedItem.append (theBody);
						}
					ctItems++;
					
					itemList.append (viewedItem);
					
					viewedItem.mouseenter (function () {
						viewedItem.addClass ("hovering");
						});
					viewedItem.mouseleave (function () {
						viewedItem.removeClass ("hovering");
						});
					viewedItem.click (function () {
						if (feedItem.permalink === undefined) {
							speakerBeep ();
							}
						else {
							window.location.href = feedItem.permalink;
							}
						});
					}
				});
			itemViewer.append (itemList);
			}
		});
	}

function startup () {
	console.log ("startup");
	var urlParam = getUrlParam ("url");
	var feedUrl = (urlParam === undefined) ? defaultFeedUrl : urlParam;
	$("#idFeedUrlInput").val (feedUrl);
	viewFeedItems (feedUrl);
	hitCounter (); 
	}
