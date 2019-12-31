---
layout:     post
title:      Web Extension API Study ☈
subtitle:   ☈
date:       2019-12-31
author:     lanbery
header-img: docs/images/2019/network_bg.png
catalog: true
tags:
    - Browser
    - Web Extension 
---

# webRequest 

## details 

``` text
Additional objects
details
documentUrl
string. URL of the document in which the resource will be loaded. For example, if the web page at "https://example.com" contains an image or an iframe, then the documentUrl for the image or iframe will be "https://example.com". For a top-level document, documentUrl is undefined.
frameId
integer. Zero if the request happens in the main frame; a positive value is the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (type is main_frame or sub_frame), frameId indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab.
method
string. Standard HTTP method: for example, "GET" or "POST".
originUrl
string. URL of the resource which triggered the request. For example, if "https://example.com" contains a link, and the user clicks the link, then the originUrl for the resulting request is "https://example.com".

The originUrl is often but not always the same as the documentUrl. For example, if a page contains an iframe, and the iframe contains a link that loads a new document into the iframe, then the documentUrl for the resulting request will be the iframe's parent document, but the originUrl will be the URL of the document in the iframe that contained the link.

parentFrameId
integer. ID of the frame that contains the frame which sent the request. Set to -1 if no parent frame exists.
proxyInfo
object. This property is present only if the request is being proxied. It contains the following properties:

host
string. The hostname of the proxy server.
port
integer. The port number of the proxy server.
type
string. The type of proxy server. One of:

"http": HTTP proxy (or SSL CONNECT for HTTPS)
"https": HTTP proxying over TLS connection to proxy
"socks": SOCKS v5 proxy
"socks4": SOCKS v4 proxy
"direct": no proxy
"unknown": unknown proxy
username
string. Username for the proxy service.
proxyDNS
boolean. True if the proxy will perform domain name resolution based on the hostname supplied, meaning that the client should not do its own DNS lookup.
failoverTimeout
integer. Failover timeout in seconds. If the proxy connection fails, the proxy will not be used again for this period.
requestHeadersOptional
webRequest.HttpHeaders. The HTTP request headers that will be sent with this request.
requestId
string. The ID of the request. Request IDs are unique within a browser session, so you can use them to relate different events associated with the same request.
tabId
integer. ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab.
timeStamp
number. The time when this event fired, in milliseconds since the epoch.
type
webRequest.ResourceType. The type of resource being requested: for example, "image", "script", "stylesheet".
url
string. Target of the request.
```