# musikcube-webplayer-proxy

This proxy is part of the [musikcube-webplayer](https://github.com/typedcode/musikcube-webplayer) project.

## Prerequisites

You need to have node installed to run this project.

## Installation

- Download the latest Version from [github](https://github.com/typedcode/musikcube-webplayer-proxy) and unzip it to a folder of your choosing.
- Rename `.env.template` to `.env` and open it in an editor and set at least `MUSIKCUBE_SERVER_ADDRESS` and `MUSIKCUBE_STREAMING_PORT`

## Parameters

|Parameter| Description|
|---------|------------|
|MUSIKCUBE_SERVER_ADDRESS| The adress where your `musikcube` is running.|
|MUSIKCUBE_STREAMING_PORT| The port where `musikcube` is open to stream. You can find (and change) this value in musikcube. Start musikcube, go to `settings` and then to `server setup`|
|MUSIKCUBE_PASSWORD      | If you have set a password to musikcube, you need to set it here|
|PROXY_PORT              | The port on which the proxy is listening for requests. The default Port is 5000|

