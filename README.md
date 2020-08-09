This is a quick fix for the issue that arises when trying to integrate iBeacon plugin into Ionic 5 project.

## Issue message
```
TypeError: Cannot read property 'locationManager' of undefined
```

## Solution
- Install the plugins

```
$ ionic cordova plugin add cordova-plugin-ibeacon
$ npm install @ionic-native/ibeacon
```
- Modify the folowing three files in path `node_modules/@ionic-native/ibeacon` with the ones in this repo,
  - index.js 
  - ngx/index.js
  - __ivy_ngcc__/ngx/index.js 


<b>The solution has been tested using both iOS and Android devices. [see](https://github.com/YouQam/Bluetooth-Beacons-Scanner)</b>
  


