import { IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export interface Beacon {
    /**
     * The physical device's identifier.
     */
    uuid: string;
    /**
     * The beacon's major identifier number.
     */
    major: number;
    /**
     * The beacon's minor identifier number.
     */
    minor: number;
    /**
     * The proximity of the beacon relative to the phone.
     *
     * Possible options are:
     * ProximityImmediate
     * ProximityNear
     * ProximityFar
     * ProximityUnknown
     */
    proximity: 'ProximityImmediate' | 'ProximityNear' | 'ProximityFar' | 'ProximityUnknown';
    /**
     * Transmission Power of the beacon. A constant emitted by the beacon which indicates what's the expected RSSI at a distance of 1 meter to the beacon.
     */
    tx: number;
    /**
     * Received Signal Strength Indicator. The strength of the beacon's signal when it reaches the device.
     *  RSSI ranges from aprox -26 (a few inches) to -100 (40-50 m distance).
     */
    rssi: number;
    /**
     * The accuracy of the ranging.
     */
    accuracy: number;
}
export interface BeaconRegion {
    /**
     * A unique identifier for this region.
     */
    identifier: string;
    /**
     * The the beacon identifier the device will "watch" for. Many beacons can share the same uuid.
     */
    uuid: string;
    /**
     * The beacon's major identifier number. Optional, of nothing is supplied
     * the plugin will treat it as a wildcard.
     */
    major?: number;
    /**
     * The beacon's minor identifier number. Optional, of nothing is supplied
     * the plugin will treat it as a wildcard.
     */
    minor?: number;
    /**
     * If set to true the device will scan for beacons and determine region state anytime
     * the device's screen is turned on or off. Useful for debugging.
     */
    notifyEntryStateOnDisplay?: boolean;
}
export interface CircularRegion {
    /**
     * A unique identifier for this region.
     */
    identifier: string;
    /**
     * The latitude of this region.
     */
    latitude: number;
    /**
     * The longitude of this region.
     */
    longitude: number;
    /**
     * The radius of the geofence for this region.
     */
    radius: number;
}
export declare type Region = BeaconRegion | CircularRegion;
export interface IBeaconPluginResult {
    /**
     * The name of the delegate function that produced the PluginResult object.
     */
    eventType: string;
    /**
     * The region that triggered the event.
     */
    region: Region;
    /**
     * An array of beacon objects
     */
    beacons: Beacon[];
    /**
     * The status of the location permission for iOS.
     */
    authorizationStatus: string;
    /**
     * The state of the phone in relation to the region. Inside/outside for example.
     */
    state: 'CLRegionStateInside' | 'CLRegionStateOutside';
    /**
     * Error message, used only with monitoringDidFailForRegionWithError delegate.
     */
    error: string;
}
export interface IBeaconDelegate {
    /**
     * An observable that publishes information about the location permission authorization status.
     *
     * @returns {Observable<string>} Returns a string.
     */
    didChangeAuthorizationStatus(): Observable<string>;
    /**
     * An Observable that publishes event data to it's subscribers
     * when the native layer is able to determine the device's state.
     *
     * This event is called when the phone begins starts monitoring,
     * when requestStateForRegion is called, etc.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    didDetermineStateForRegion(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     * when the phone enters a region that it was asked to monitor.
     *
     * If the user has given the app Always-Location permission, this function
     *  will be called even when the app is not running on iOS.
     * The app will run silently in the background for a small amount of time.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    didEnterRegion(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     * when the phone exits a region that it was asked to monitor.
     *
     * If the user has given the app Always-Location permission, this function
     *  will be called even when the app is not running on iOS.
     * The app will run silently in the background for a small amount of time.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    didExitRegion(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     *  each time that the device ranges beacons. Modern Android and iOS devices range
     * aproximately once per second.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    didRangeBeaconsInRegion(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     *  when the device begins monitoring a region.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    didStartMonitoringForRegion(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     *  when the device fails to monitor a region.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    monitoringDidFailForRegionWithError(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     *  when the device begins advertising as an iBeacon.
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    peripheralManagerDidStartAdvertising(): Observable<IBeaconPluginResult>;
    /**
     * An Observable that publishes event data to it's subscribers
     * when the state of the peripheral manager's state updates.
     *
     *
     * @returns {Observable<IBeaconPluginResult>} Returns a IBeaconPluginResult object with information about the event, region, and beacon(s).
     */
    peripheralManagerDidUpdateState(): Observable<IBeaconPluginResult>;
}
/**
 * @name IBeacon
 * @description
 * This plugin provides functions for working with iBeacons.
 *
 *  The plugin's API closely mimics the one exposed through the [CLLocationManager](https://developer.apple.com/library/ios/documentation/CoreLocation/Reference/CLLocationManager_Class/index.html) introduced in iOS 7.
 *
 * @usage
 *
 * ```typescript
 * import { IBeacon } from '@ionic-native/ibeacon/ngx';
 *
 * constructor(private ibeacon: IBeacon) { }
 *
 * ...
 *
 *
 * // Request permission to use location on iOS
 * this.ibeacon.requestAlwaysAuthorization();
 * // create a new delegate and register it with the native layer
 * let delegate = this.ibeacon.Delegate();
 *
 * // Subscribe to some of the delegate's event handlers
 * delegate.didRangeBeaconsInRegion()
 *   .subscribe(
 *     data => console.log('didRangeBeaconsInRegion: ', data),
 *     error => console.error()
 *   );
 * delegate.didStartMonitoringForRegion()
 *   .subscribe(
 *     data => console.log('didStartMonitoringForRegion: ', data),
 *     error => console.error()
 *   );
 * delegate.didEnterRegion()
 *   .subscribe(
 *     data => {
 *       console.log('didEnterRegion: ', data);
 *     }
 *   );
 *
 * let beaconRegion = this.ibeacon.BeaconRegion('deskBeacon','F7826DA6-ASDF-ASDF-8024-BC5B71E0893E');
 *
 * this.ibeacon.startMonitoringForRegion(beaconRegion)
 *   .then(
 *     () => console.log('Native layer received the request to monitoring'),
 *     error => console.error('Native layer failed to begin monitoring: ', error)
 *   );
 * ```
 * @interfaces
 * Beacon
 * BeaconRegion
 * CircularRegion
 * IBeaconPluginResult
 * IBeaconDelegate
 *
 */
export declare class IBeacon extends IonicNativePlugin {
    /**
     * Instances of this class are delegates between the {@link LocationManager} and
     * the code that consumes the messages generated on in the native layer.
     *
     * @returns {IBeaconDelegate} An instance of the type {@type Delegate}.
     */
    Delegate(): IBeaconDelegate;
    /**
     * Creates a new BeaconRegion
     *
     * @param {String} identifier @see {CLRegion}
     * @param {String} uuid The proximity ID of the beacon being targeted.
     * This value must not be blank nor invalid as a UUID.
     * @param {Number} major The major value that you use to identify one or more beacons.
     * @param {Number} minor The minor value that you use to identify a specific beacon.
     * @param {BOOL} notifyEntryStateOnDisplay
     *
     * @returns {BeaconRegion} Returns the BeaconRegion that was created
     */
    BeaconRegion(identifer: string, uuid: string, major?: number, minor?: number, notifyEntryStateOnDisplay?: boolean): BeaconRegion;
    /**
     * @returns {IBeaconDelegate} Returns the IBeaconDelegate
     */
    getDelegate(): IBeaconDelegate;
    /**
     * @param {IBeaconDelegate} delegate An instance of a delegate to register with the native layer.
     *
     * @returns {IBeaconDelegate} Returns the IBeaconDelegate
     */
    setDelegate(delegate: IBeaconDelegate): IBeaconDelegate;
    /**
     * Signals the native layer that the client side is ready to consume messages.
     * Readiness here means that it has a {IBeaconDelegate} set by the consumer javascript
     * code.
     *
     * The {LocationManager.setDelegate()} will implicitly call this method as well,
     * therefore the only case when you have to call this manually is if you don't
     * wish to specify a {IBeaconDelegate} of yours.
     *
     * The purpose of this signaling mechanism is to make the events work when the
     * app is being woken up by the Operating System to give it a chance to handle
     * region monitoring events for example.
     *
     * If you don't set a {IBeaconDelegate} and don't call this method manually, an error
     * message get emitted in the native runtime and the DOM as well after a certain
     * period of time.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the request and started to send events.
     */
    onDomDelegateReady(): Promise<void>;
    /**
     * Determines if bluetooth is switched on, according to the native layer.
     * @returns {Promise<boolean>} Returns a promise which is resolved with a {Boolean}
     * indicating whether bluetooth is active.
     */
    isBluetoothEnabled(): Promise<boolean>;
    /**
     * Enables Bluetooth using the native Layer. (ANDROID ONLY)
     *
     * @returns {Promise<void>} Returns a promise which is resolved when Bluetooth
     * could be enabled. If not, the promise will be rejected with an error.
     */
    enableBluetooth(): Promise<void>;
    /**
     * Disables Bluetooth using the native Layer. (ANDROID ONLY)
     *
     * @returns {Promise<void>} Returns a promise which is resolved when Bluetooth
     * could be enabled. If not, the promise will be rejected with an error.
     */
    disableBluetooth(): Promise<void>;
    /**
     * Start monitoring the specified region.
     *
     * If a region of the same type with the same identifier is already being
     * monitored for this application,
     * it will be removed from monitoring. For circular regions, the region
     * monitoring service will prioritize
     * regions by their size, favoring smaller regions over larger regions.
     *
     * This is done asynchronously and may not be immediately reflected in monitoredRegions.
     *
     * @param {Region} region An instance of {Region} which will be monitored
     * by the operating system.
     *
     * @returns {Promise<string>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the monitoring request.
     */
    startMonitoringForRegion(region: Region): Promise<string>;
    /**
     * Stop monitoring the specified region.  It is valid to call
     * stopMonitoringForRegion: for a region that was registered for monitoring
     * with a different location manager object, during this or previous
     * launches of your application.
     *
     * This is done asynchronously and may not be immediately reflected in monitoredRegions.
     *
     * @param {Region} region An instance of {Region} which will be monitored
     * by the operating system.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop monitoring.
     */
    stopMonitoringForRegion(region: Region): Promise<void>;
    /**
     * Request state the for specified region. When result is ready
     * didDetermineStateForRegion is triggered. This can be any region,
     * also those which is not currently monitored.
     *
     * This is done asynchronously and may not be immediately reflected in monitoredRegions.
     *
     * @param {Region} region An instance of {Region} which will be monitored
     * by the operating system.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop monitoring.
     */
    requestStateForRegion(region: Region): Promise<void>;
    /**
     * Start ranging the specified beacon region.
     *
     * If a region of the same type with the same identifier is already being
     * monitored for this application, it will be removed from monitoring.
     *
     * This is done asynchronously and may not be immediately reflected in rangedRegions.
     *
     * @param {Region} region An instance of {BeaconRegion} which will be monitored
     * by the operating system.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the monitoring request.
     */
    startRangingBeaconsInRegion(region: Region): Promise<void>;
    /**
     * Stop ranging the specified region.  It is valid to call
     * stopMonitoringForRegion: for a region that was registered for ranging
     * with a different location manager object, during this or previous
     * launches of your application.
     *
     * This is done asynchronously and may not be immediately reflected in rangedRegions.
     *
     * @param {Region} region An instance of {BeaconRegion} which will be monitored
     * by the operating system.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop monitoring.
     */
    stopRangingBeaconsInRegion(region: Region): Promise<void>;
    /**
     * Queries the native layer to determine the current authorization in effect.
     *
     * @returns {Promise<IBeaconPluginResult>} Returns a promise which is resolved with the
     * requested authorization status.
     */
    getAuthorizationStatus(): Promise<IBeaconPluginResult>;
    /**
     * For iOS 8 and above only. The permission model has changed by Apple in iOS 8, making it necessary for apps to
     * explicitly request permissions via methods like these:
     * <a href="https://developer.apple.com/library/prerelease/iOS/documentation/CoreLocation/Reference/CLLocationManager_Class/index.html#//apple_ref/occ/instm/CLLocationManager/requestWhenInUseAuthorization">requestWhenInUseAuthorization</a>
     * <a href="https://developer.apple.com/library/prerelease/iOS/documentation/CoreLocation/Reference/CLLocationManager_Class/index.html#//apple_ref/occ/instm/CLLocationManager/requestAlwaysAuthorization">requestAlwaysAuthorization</a>
     *
     * If you are using this plugin on Android devices only, you will never have to use this, nor {@code requestAlwaysAuthorization}
     * @returns {Promise<void>} Returns a promise that is resolved when the request dialog is shown.
     */
    requestWhenInUseAuthorization(): Promise<void>;
    /**
     * See the documentation of {@code requestWhenInUseAuthorization} for further details.
     *
     * @returns {Promise<void>} Returns a promise which is resolved when the native layer
     * shows the request dialog.
     */
    requestAlwaysAuthorization(): Promise<void>;
    /**
     *
     * @returns {Promise<Region[]>} Returns a promise which is resolved with an {Array}
     * of {Region} instances that are being monitored by the native layer.
     */
    getMonitoredRegions(): Promise<Region[]>;
    /**
     *
     * @returns {Promise<Region[]>} Returns a promise which is resolved with an {Array}
     * of {Region} instances that are being ranged by the native layer.
     */
    getRangedRegions(): Promise<Region[]>;
    /**
     * Determines if ranging is available or not, according to the native layer.
     * @returns {Promise<boolean>} Returns a promise which is resolved with a {Boolean}
     * indicating whether ranging is available or not.
     */
    isRangingAvailable(): Promise<boolean>;
    /**
     * Determines if region type is supported or not, according to the native layer.
     *
     * @param {Region} region An instance of {Region} which will be checked
     * by the operating system.
     *
     * @returns {Promise<boolean>} Returns a promise which is resolved with a {Boolean}
     * indicating whether the region type is supported or not.
     */
    isMonitoringAvailableForClass(region: Region): Promise<boolean>;
    /**
     * Start advertising the specified region.
     *
     * If a region a different identifier is already being advertised for
     * this application, it will be replaced with the new identifier.
     *
     * This call will accept a valid beacon even when no BlueTooth is available,
     * and will start when BlueTooth is powered on. See {IBeaconDelegate.}
     *
     * @param {Region} region An instance of {Region} which will be advertised
     * by the operating system.
     * @param {Integer} measuredPower: Optional parameter, if left empty, the device will
     * use it's own default value.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the advertising request.
     */
    startAdvertising(region: Region, measuredPower?: number): Promise<void>;
    /**
     * Stop advertising as a beacon.
     *
     * This is done asynchronously and may not be immediately reflected in isAdvertising.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop advertising.
     */
    stopAdvertising(region: Region): Promise<void>;
    /**
     * Determines if advertising is available or not, according to the native layer.
     * @returns {Promise<void>} Returns a promise which is resolved with a {Boolean}
     * indicating whether advertising is available or not.
     */
    isAdvertisingAvailable(): Promise<boolean>;
    /**
     * Determines if advertising is currently active, according to the native layer.
     * @returns {Promise<void>} Returns a promise which is resolved with a {Boolean}
     * indicating whether advertising is active.
     */
    isAdvertising(): Promise<boolean>;
    /**
     * Disables debug logging in the native layer. Use this method if you want
     * to prevent this plugin from writing to the device logs.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer has set the logging level accordingly.
     */
    disableDebugLogs(): Promise<void>;
    /**
     * Enables the posting of debug notifications in the native layer. Use this method if you want
     * to allow the plugin the posting local notifications.
     * This can be very helpful when debugging how to apps behave when launched into the background.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer has set the flag to enabled.
     */
    enableDebugNotifications(): Promise<void>;
    /**
     * Disables the posting of debug notifications in the native layer. Use this method if you want
     * to prevent the plugin from posting local notifications.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer has set the flag to disabled.
     */
    disableDebugNotifications(): Promise<void>;
    /**
     * Enables debug logging in the native layer. Use this method if you want
     * a debug the inner workings of this plugin.
     *
     * @returns {Promise<void>} Returns a promise which is resolved as soon as the
     * native layer has set the logging level accordingly.
     */
    enableDebugLogs(): Promise<void>;
    /**
     * Appends the provided [message] to the device logs.
     * Note: If debug logging is turned off, this won't do anything.
     *
     * @param {String} message The message to append to the device logs.
     *
     * @returns {Promise<void>} Returns a promise which is resolved with the log
     * message received by the native layer for appending. The returned message
     * is expected to be equivalent to the one provided in the original call.
     */
    appendToDeviceLog(message: string): Promise<void>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<IBeacon, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<IBeacon>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZC50cyIsInNvdXJjZXMiOlsiaW5kZXguZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW9uaWNOYXRpdmVQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuZXhwb3J0IGludGVyZmFjZSBCZWFjb24ge1xuICAgIC8qKlxuICAgICAqIFRoZSBwaHlzaWNhbCBkZXZpY2UncyBpZGVudGlmaWVyLlxuICAgICAqL1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgYmVhY29uJ3MgbWFqb3IgaWRlbnRpZmllciBudW1iZXIuXG4gICAgICovXG4gICAgbWFqb3I6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgYmVhY29uJ3MgbWlub3IgaWRlbnRpZmllciBudW1iZXIuXG4gICAgICovXG4gICAgbWlub3I6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgcHJveGltaXR5IG9mIHRoZSBiZWFjb24gcmVsYXRpdmUgdG8gdGhlIHBob25lLlxuICAgICAqXG4gICAgICogUG9zc2libGUgb3B0aW9ucyBhcmU6XG4gICAgICogUHJveGltaXR5SW1tZWRpYXRlXG4gICAgICogUHJveGltaXR5TmVhclxuICAgICAqIFByb3hpbWl0eUZhclxuICAgICAqIFByb3hpbWl0eVVua25vd25cbiAgICAgKi9cbiAgICBwcm94aW1pdHk6ICdQcm94aW1pdHlJbW1lZGlhdGUnIHwgJ1Byb3hpbWl0eU5lYXInIHwgJ1Byb3hpbWl0eUZhcicgfCAnUHJveGltaXR5VW5rbm93bic7XG4gICAgLyoqXG4gICAgICogVHJhbnNtaXNzaW9uIFBvd2VyIG9mIHRoZSBiZWFjb24uIEEgY29uc3RhbnQgZW1pdHRlZCBieSB0aGUgYmVhY29uIHdoaWNoIGluZGljYXRlcyB3aGF0J3MgdGhlIGV4cGVjdGVkIFJTU0kgYXQgYSBkaXN0YW5jZSBvZiAxIG1ldGVyIHRvIHRoZSBiZWFjb24uXG4gICAgICovXG4gICAgdHg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBSZWNlaXZlZCBTaWduYWwgU3RyZW5ndGggSW5kaWNhdG9yLiBUaGUgc3RyZW5ndGggb2YgdGhlIGJlYWNvbidzIHNpZ25hbCB3aGVuIGl0IHJlYWNoZXMgdGhlIGRldmljZS5cbiAgICAgKiAgUlNTSSByYW5nZXMgZnJvbSBhcHJveCAtMjYgKGEgZmV3IGluY2hlcykgdG8gLTEwMCAoNDAtNTAgbSBkaXN0YW5jZSkuXG4gICAgICovXG4gICAgcnNzaTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBhY2N1cmFjeSBvZiB0aGUgcmFuZ2luZy5cbiAgICAgKi9cbiAgICBhY2N1cmFjeTogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBCZWFjb25SZWdpb24ge1xuICAgIC8qKlxuICAgICAqIEEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoaXMgcmVnaW9uLlxuICAgICAqL1xuICAgIGlkZW50aWZpZXI6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgdGhlIGJlYWNvbiBpZGVudGlmaWVyIHRoZSBkZXZpY2Ugd2lsbCBcIndhdGNoXCIgZm9yLiBNYW55IGJlYWNvbnMgY2FuIHNoYXJlIHRoZSBzYW1lIHV1aWQuXG4gICAgICovXG4gICAgdXVpZDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBiZWFjb24ncyBtYWpvciBpZGVudGlmaWVyIG51bWJlci4gT3B0aW9uYWwsIG9mIG5vdGhpbmcgaXMgc3VwcGxpZWRcbiAgICAgKiB0aGUgcGx1Z2luIHdpbGwgdHJlYXQgaXQgYXMgYSB3aWxkY2FyZC5cbiAgICAgKi9cbiAgICBtYWpvcj86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgYmVhY29uJ3MgbWlub3IgaWRlbnRpZmllciBudW1iZXIuIE9wdGlvbmFsLCBvZiBub3RoaW5nIGlzIHN1cHBsaWVkXG4gICAgICogdGhlIHBsdWdpbiB3aWxsIHRyZWF0IGl0IGFzIGEgd2lsZGNhcmQuXG4gICAgICovXG4gICAgbWlub3I/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogSWYgc2V0IHRvIHRydWUgdGhlIGRldmljZSB3aWxsIHNjYW4gZm9yIGJlYWNvbnMgYW5kIGRldGVybWluZSByZWdpb24gc3RhdGUgYW55dGltZVxuICAgICAqIHRoZSBkZXZpY2UncyBzY3JlZW4gaXMgdHVybmVkIG9uIG9yIG9mZi4gVXNlZnVsIGZvciBkZWJ1Z2dpbmcuXG4gICAgICovXG4gICAgbm90aWZ5RW50cnlTdGF0ZU9uRGlzcGxheT86IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIENpcmN1bGFyUmVnaW9uIHtcbiAgICAvKipcbiAgICAgKiBBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIHJlZ2lvbi5cbiAgICAgKi9cbiAgICBpZGVudGlmaWVyOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGxhdGl0dWRlIG9mIHRoaXMgcmVnaW9uLlxuICAgICAqL1xuICAgIGxhdGl0dWRlOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIGxvbmdpdHVkZSBvZiB0aGlzIHJlZ2lvbi5cbiAgICAgKi9cbiAgICBsb25naXR1ZGU6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBnZW9mZW5jZSBmb3IgdGhpcyByZWdpb24uXG4gICAgICovXG4gICAgcmFkaXVzOiBudW1iZXI7XG59XG5leHBvcnQgZGVjbGFyZSB0eXBlIFJlZ2lvbiA9IEJlYWNvblJlZ2lvbiB8IENpcmN1bGFyUmVnaW9uO1xuZXhwb3J0IGludGVyZmFjZSBJQmVhY29uUGx1Z2luUmVzdWx0IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZGVsZWdhdGUgZnVuY3Rpb24gdGhhdCBwcm9kdWNlZCB0aGUgUGx1Z2luUmVzdWx0IG9iamVjdC5cbiAgICAgKi9cbiAgICBldmVudFR5cGU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgcmVnaW9uIHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICByZWdpb246IFJlZ2lvbjtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBiZWFjb24gb2JqZWN0c1xuICAgICAqL1xuICAgIGJlYWNvbnM6IEJlYWNvbltdO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdGF0dXMgb2YgdGhlIGxvY2F0aW9uIHBlcm1pc3Npb24gZm9yIGlPUy5cbiAgICAgKi9cbiAgICBhdXRob3JpemF0aW9uU3RhdHVzOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHN0YXRlIG9mIHRoZSBwaG9uZSBpbiByZWxhdGlvbiB0byB0aGUgcmVnaW9uLiBJbnNpZGUvb3V0c2lkZSBmb3IgZXhhbXBsZS5cbiAgICAgKi9cbiAgICBzdGF0ZTogJ0NMUmVnaW9uU3RhdGVJbnNpZGUnIHwgJ0NMUmVnaW9uU3RhdGVPdXRzaWRlJztcbiAgICAvKipcbiAgICAgKiBFcnJvciBtZXNzYWdlLCB1c2VkIG9ubHkgd2l0aCBtb25pdG9yaW5nRGlkRmFpbEZvclJlZ2lvbldpdGhFcnJvciBkZWxlZ2F0ZS5cbiAgICAgKi9cbiAgICBlcnJvcjogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBJQmVhY29uRGVsZWdhdGUge1xuICAgIC8qKlxuICAgICAqIEFuIG9ic2VydmFibGUgdGhhdCBwdWJsaXNoZXMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxvY2F0aW9uIHBlcm1pc3Npb24gYXV0aG9yaXphdGlvbiBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxzdHJpbmc+fSBSZXR1cm5zIGEgc3RyaW5nLlxuICAgICAqL1xuICAgIGRpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXMoKTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIC8qKlxuICAgICAqIEFuIE9ic2VydmFibGUgdGhhdCBwdWJsaXNoZXMgZXZlbnQgZGF0YSB0byBpdCdzIHN1YnNjcmliZXJzXG4gICAgICogd2hlbiB0aGUgbmF0aXZlIGxheWVyIGlzIGFibGUgdG8gZGV0ZXJtaW5lIHRoZSBkZXZpY2UncyBzdGF0ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgY2FsbGVkIHdoZW4gdGhlIHBob25lIGJlZ2lucyBzdGFydHMgbW9uaXRvcmluZyxcbiAgICAgKiB3aGVuIHJlcXVlc3RTdGF0ZUZvclJlZ2lvbiBpcyBjYWxsZWQsIGV0Yy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+fSBSZXR1cm5zIGEgSUJlYWNvblBsdWdpblJlc3VsdCBvYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZXZlbnQsIHJlZ2lvbiwgYW5kIGJlYWNvbihzKS5cbiAgICAgKi9cbiAgICBkaWREZXRlcm1pbmVTdGF0ZUZvclJlZ2lvbigpOiBPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+O1xuICAgIC8qKlxuICAgICAqIEFuIE9ic2VydmFibGUgdGhhdCBwdWJsaXNoZXMgZXZlbnQgZGF0YSB0byBpdCdzIHN1YnNjcmliZXJzXG4gICAgICogd2hlbiB0aGUgcGhvbmUgZW50ZXJzIGEgcmVnaW9uIHRoYXQgaXQgd2FzIGFza2VkIHRvIG1vbml0b3IuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgdXNlciBoYXMgZ2l2ZW4gdGhlIGFwcCBBbHdheXMtTG9jYXRpb24gcGVybWlzc2lvbiwgdGhpcyBmdW5jdGlvblxuICAgICAqICB3aWxsIGJlIGNhbGxlZCBldmVuIHdoZW4gdGhlIGFwcCBpcyBub3QgcnVubmluZyBvbiBpT1MuXG4gICAgICogVGhlIGFwcCB3aWxsIHJ1biBzaWxlbnRseSBpbiB0aGUgYmFja2dyb3VuZCBmb3IgYSBzbWFsbCBhbW91bnQgb2YgdGltZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+fSBSZXR1cm5zIGEgSUJlYWNvblBsdWdpblJlc3VsdCBvYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZXZlbnQsIHJlZ2lvbiwgYW5kIGJlYWNvbihzKS5cbiAgICAgKi9cbiAgICBkaWRFbnRlclJlZ2lvbigpOiBPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+O1xuICAgIC8qKlxuICAgICAqIEFuIE9ic2VydmFibGUgdGhhdCBwdWJsaXNoZXMgZXZlbnQgZGF0YSB0byBpdCdzIHN1YnNjcmliZXJzXG4gICAgICogd2hlbiB0aGUgcGhvbmUgZXhpdHMgYSByZWdpb24gdGhhdCBpdCB3YXMgYXNrZWQgdG8gbW9uaXRvci5cbiAgICAgKlxuICAgICAqIElmIHRoZSB1c2VyIGhhcyBnaXZlbiB0aGUgYXBwIEFsd2F5cy1Mb2NhdGlvbiBwZXJtaXNzaW9uLCB0aGlzIGZ1bmN0aW9uXG4gICAgICogIHdpbGwgYmUgY2FsbGVkIGV2ZW4gd2hlbiB0aGUgYXBwIGlzIG5vdCBydW5uaW5nIG9uIGlPUy5cbiAgICAgKiBUaGUgYXBwIHdpbGwgcnVuIHNpbGVudGx5IGluIHRoZSBiYWNrZ3JvdW5kIGZvciBhIHNtYWxsIGFtb3VudCBvZiB0aW1lLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD59IFJldHVybnMgYSBJQmVhY29uUGx1Z2luUmVzdWx0IG9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBldmVudCwgcmVnaW9uLCBhbmQgYmVhY29uKHMpLlxuICAgICAqL1xuICAgIGRpZEV4aXRSZWdpb24oKTogT2JzZXJ2YWJsZTxJQmVhY29uUGx1Z2luUmVzdWx0PjtcbiAgICAvKipcbiAgICAgKiBBbiBPYnNlcnZhYmxlIHRoYXQgcHVibGlzaGVzIGV2ZW50IGRhdGEgdG8gaXQncyBzdWJzY3JpYmVyc1xuICAgICAqICBlYWNoIHRpbWUgdGhhdCB0aGUgZGV2aWNlIHJhbmdlcyBiZWFjb25zLiBNb2Rlcm4gQW5kcm9pZCBhbmQgaU9TIGRldmljZXMgcmFuZ2VcbiAgICAgKiBhcHJveGltYXRlbHkgb25jZSBwZXIgc2Vjb25kLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD59IFJldHVybnMgYSBJQmVhY29uUGx1Z2luUmVzdWx0IG9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBldmVudCwgcmVnaW9uLCBhbmQgYmVhY29uKHMpLlxuICAgICAqL1xuICAgIGRpZFJhbmdlQmVhY29uc0luUmVnaW9uKCk6IE9ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD47XG4gICAgLyoqXG4gICAgICogQW4gT2JzZXJ2YWJsZSB0aGF0IHB1Ymxpc2hlcyBldmVudCBkYXRhIHRvIGl0J3Mgc3Vic2NyaWJlcnNcbiAgICAgKiAgd2hlbiB0aGUgZGV2aWNlIGJlZ2lucyBtb25pdG9yaW5nIGEgcmVnaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD59IFJldHVybnMgYSBJQmVhY29uUGx1Z2luUmVzdWx0IG9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBldmVudCwgcmVnaW9uLCBhbmQgYmVhY29uKHMpLlxuICAgICAqL1xuICAgIGRpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbigpOiBPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+O1xuICAgIC8qKlxuICAgICAqIEFuIE9ic2VydmFibGUgdGhhdCBwdWJsaXNoZXMgZXZlbnQgZGF0YSB0byBpdCdzIHN1YnNjcmliZXJzXG4gICAgICogIHdoZW4gdGhlIGRldmljZSBmYWlscyB0byBtb25pdG9yIGEgcmVnaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD59IFJldHVybnMgYSBJQmVhY29uUGx1Z2luUmVzdWx0IG9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBldmVudCwgcmVnaW9uLCBhbmQgYmVhY29uKHMpLlxuICAgICAqL1xuICAgIG1vbml0b3JpbmdEaWRGYWlsRm9yUmVnaW9uV2l0aEVycm9yKCk6IE9ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD47XG4gICAgLyoqXG4gICAgICogQW4gT2JzZXJ2YWJsZSB0aGF0IHB1Ymxpc2hlcyBldmVudCBkYXRhIHRvIGl0J3Mgc3Vic2NyaWJlcnNcbiAgICAgKiAgd2hlbiB0aGUgZGV2aWNlIGJlZ2lucyBhZHZlcnRpc2luZyBhcyBhbiBpQmVhY29uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD59IFJldHVybnMgYSBJQmVhY29uUGx1Z2luUmVzdWx0IG9iamVjdCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBldmVudCwgcmVnaW9uLCBhbmQgYmVhY29uKHMpLlxuICAgICAqL1xuICAgIHBlcmlwaGVyYWxNYW5hZ2VyRGlkU3RhcnRBZHZlcnRpc2luZygpOiBPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+O1xuICAgIC8qKlxuICAgICAqIEFuIE9ic2VydmFibGUgdGhhdCBwdWJsaXNoZXMgZXZlbnQgZGF0YSB0byBpdCdzIHN1YnNjcmliZXJzXG4gICAgICogd2hlbiB0aGUgc3RhdGUgb2YgdGhlIHBlcmlwaGVyYWwgbWFuYWdlcidzIHN0YXRlIHVwZGF0ZXMuXG4gICAgICpcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPElCZWFjb25QbHVnaW5SZXN1bHQ+fSBSZXR1cm5zIGEgSUJlYWNvblBsdWdpblJlc3VsdCBvYmplY3Qgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZXZlbnQsIHJlZ2lvbiwgYW5kIGJlYWNvbihzKS5cbiAgICAgKi9cbiAgICBwZXJpcGhlcmFsTWFuYWdlckRpZFVwZGF0ZVN0YXRlKCk6IE9ic2VydmFibGU8SUJlYWNvblBsdWdpblJlc3VsdD47XG59XG4vKipcbiAqIEBuYW1lIElCZWFjb25cbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBwbHVnaW4gcHJvdmlkZXMgZnVuY3Rpb25zIGZvciB3b3JraW5nIHdpdGggaUJlYWNvbnMuXG4gKlxuICogIFRoZSBwbHVnaW4ncyBBUEkgY2xvc2VseSBtaW1pY3MgdGhlIG9uZSBleHBvc2VkIHRocm91Z2ggdGhlIFtDTExvY2F0aW9uTWFuYWdlcl0oaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvaW9zL2RvY3VtZW50YXRpb24vQ29yZUxvY2F0aW9uL1JlZmVyZW5jZS9DTExvY2F0aW9uTWFuYWdlcl9DbGFzcy9pbmRleC5odG1sKSBpbnRyb2R1Y2VkIGluIGlPUyA3LlxuICpcbiAqIEB1c2FnZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IElCZWFjb24gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2liZWFjb24vbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGliZWFjb246IElCZWFjb24pIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqXG4gKiAvLyBSZXF1ZXN0IHBlcm1pc3Npb24gdG8gdXNlIGxvY2F0aW9uIG9uIGlPU1xuICogdGhpcy5pYmVhY29uLnJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uKCk7XG4gKiAvLyBjcmVhdGUgYSBuZXcgZGVsZWdhdGUgYW5kIHJlZ2lzdGVyIGl0IHdpdGggdGhlIG5hdGl2ZSBsYXllclxuICogbGV0IGRlbGVnYXRlID0gdGhpcy5pYmVhY29uLkRlbGVnYXRlKCk7XG4gKlxuICogLy8gU3Vic2NyaWJlIHRvIHNvbWUgb2YgdGhlIGRlbGVnYXRlJ3MgZXZlbnQgaGFuZGxlcnNcbiAqIGRlbGVnYXRlLmRpZFJhbmdlQmVhY29uc0luUmVnaW9uKClcbiAqICAgLnN1YnNjcmliZShcbiAqICAgICBkYXRhID0+IGNvbnNvbGUubG9nKCdkaWRSYW5nZUJlYWNvbnNJblJlZ2lvbjogJywgZGF0YSksXG4gKiAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcigpXG4gKiAgICk7XG4gKiBkZWxlZ2F0ZS5kaWRTdGFydE1vbml0b3JpbmdGb3JSZWdpb24oKVxuICogICAuc3Vic2NyaWJlKFxuICogICAgIGRhdGEgPT4gY29uc29sZS5sb2coJ2RpZFN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjogJywgZGF0YSksXG4gKiAgICAgZXJyb3IgPT4gY29uc29sZS5lcnJvcigpXG4gKiAgICk7XG4gKiBkZWxlZ2F0ZS5kaWRFbnRlclJlZ2lvbigpXG4gKiAgIC5zdWJzY3JpYmUoXG4gKiAgICAgZGF0YSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnZGlkRW50ZXJSZWdpb246ICcsIGRhdGEpO1xuICogICAgIH1cbiAqICAgKTtcbiAqXG4gKiBsZXQgYmVhY29uUmVnaW9uID0gdGhpcy5pYmVhY29uLkJlYWNvblJlZ2lvbignZGVza0JlYWNvbicsJ0Y3ODI2REE2LUFTREYtQVNERi04MDI0LUJDNUI3MUUwODkzRScpO1xuICpcbiAqIHRoaXMuaWJlYWNvbi5zdGFydE1vbml0b3JpbmdGb3JSZWdpb24oYmVhY29uUmVnaW9uKVxuICogICAudGhlbihcbiAqICAgICAoKSA9PiBjb25zb2xlLmxvZygnTmF0aXZlIGxheWVyIHJlY2VpdmVkIHRoZSByZXF1ZXN0IHRvIG1vbml0b3JpbmcnKSxcbiAqICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKCdOYXRpdmUgbGF5ZXIgZmFpbGVkIHRvIGJlZ2luIG1vbml0b3Jpbmc6ICcsIGVycm9yKVxuICogICApO1xuICogYGBgXG4gKiBAaW50ZXJmYWNlc1xuICogQmVhY29uXG4gKiBCZWFjb25SZWdpb25cbiAqIENpcmN1bGFyUmVnaW9uXG4gKiBJQmVhY29uUGx1Z2luUmVzdWx0XG4gKiBJQmVhY29uRGVsZWdhdGVcbiAqXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIElCZWFjb24gZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gICAgLyoqXG4gICAgICogSW5zdGFuY2VzIG9mIHRoaXMgY2xhc3MgYXJlIGRlbGVnYXRlcyBiZXR3ZWVuIHRoZSB7QGxpbmsgTG9jYXRpb25NYW5hZ2VyfSBhbmRcbiAgICAgKiB0aGUgY29kZSB0aGF0IGNvbnN1bWVzIHRoZSBtZXNzYWdlcyBnZW5lcmF0ZWQgb24gaW4gdGhlIG5hdGl2ZSBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtJQmVhY29uRGVsZWdhdGV9IEFuIGluc3RhbmNlIG9mIHRoZSB0eXBlIHtAdHlwZSBEZWxlZ2F0ZX0uXG4gICAgICovXG4gICAgRGVsZWdhdGUoKTogSUJlYWNvbkRlbGVnYXRlO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQmVhY29uUmVnaW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRlbnRpZmllciBAc2VlIHtDTFJlZ2lvbn1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXVpZCBUaGUgcHJveGltaXR5IElEIG9mIHRoZSBiZWFjb24gYmVpbmcgdGFyZ2V0ZWQuXG4gICAgICogVGhpcyB2YWx1ZSBtdXN0IG5vdCBiZSBibGFuayBub3IgaW52YWxpZCBhcyBhIFVVSUQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1ham9yIFRoZSBtYWpvciB2YWx1ZSB0aGF0IHlvdSB1c2UgdG8gaWRlbnRpZnkgb25lIG9yIG1vcmUgYmVhY29ucy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWlub3IgVGhlIG1pbm9yIHZhbHVlIHRoYXQgeW91IHVzZSB0byBpZGVudGlmeSBhIHNwZWNpZmljIGJlYWNvbi5cbiAgICAgKiBAcGFyYW0ge0JPT0x9IG5vdGlmeUVudHJ5U3RhdGVPbkRpc3BsYXlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtCZWFjb25SZWdpb259IFJldHVybnMgdGhlIEJlYWNvblJlZ2lvbiB0aGF0IHdhcyBjcmVhdGVkXG4gICAgICovXG4gICAgQmVhY29uUmVnaW9uKGlkZW50aWZlcjogc3RyaW5nLCB1dWlkOiBzdHJpbmcsIG1ham9yPzogbnVtYmVyLCBtaW5vcj86IG51bWJlciwgbm90aWZ5RW50cnlTdGF0ZU9uRGlzcGxheT86IGJvb2xlYW4pOiBCZWFjb25SZWdpb247XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0lCZWFjb25EZWxlZ2F0ZX0gUmV0dXJucyB0aGUgSUJlYWNvbkRlbGVnYXRlXG4gICAgICovXG4gICAgZ2V0RGVsZWdhdGUoKTogSUJlYWNvbkRlbGVnYXRlO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SUJlYWNvbkRlbGVnYXRlfSBkZWxlZ2F0ZSBBbiBpbnN0YW5jZSBvZiBhIGRlbGVnYXRlIHRvIHJlZ2lzdGVyIHdpdGggdGhlIG5hdGl2ZSBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtJQmVhY29uRGVsZWdhdGV9IFJldHVybnMgdGhlIElCZWFjb25EZWxlZ2F0ZVxuICAgICAqL1xuICAgIHNldERlbGVnYXRlKGRlbGVnYXRlOiBJQmVhY29uRGVsZWdhdGUpOiBJQmVhY29uRGVsZWdhdGU7XG4gICAgLyoqXG4gICAgICogU2lnbmFscyB0aGUgbmF0aXZlIGxheWVyIHRoYXQgdGhlIGNsaWVudCBzaWRlIGlzIHJlYWR5IHRvIGNvbnN1bWUgbWVzc2FnZXMuXG4gICAgICogUmVhZGluZXNzIGhlcmUgbWVhbnMgdGhhdCBpdCBoYXMgYSB7SUJlYWNvbkRlbGVnYXRlfSBzZXQgYnkgdGhlIGNvbnN1bWVyIGphdmFzY3JpcHRcbiAgICAgKiBjb2RlLlxuICAgICAqXG4gICAgICogVGhlIHtMb2NhdGlvbk1hbmFnZXIuc2V0RGVsZWdhdGUoKX0gd2lsbCBpbXBsaWNpdGx5IGNhbGwgdGhpcyBtZXRob2QgYXMgd2VsbCxcbiAgICAgKiB0aGVyZWZvcmUgdGhlIG9ubHkgY2FzZSB3aGVuIHlvdSBoYXZlIHRvIGNhbGwgdGhpcyBtYW51YWxseSBpcyBpZiB5b3UgZG9uJ3RcbiAgICAgKiB3aXNoIHRvIHNwZWNpZnkgYSB7SUJlYWNvbkRlbGVnYXRlfSBvZiB5b3Vycy5cbiAgICAgKlxuICAgICAqIFRoZSBwdXJwb3NlIG9mIHRoaXMgc2lnbmFsaW5nIG1lY2hhbmlzbSBpcyB0byBtYWtlIHRoZSBldmVudHMgd29yayB3aGVuIHRoZVxuICAgICAqIGFwcCBpcyBiZWluZyB3b2tlbiB1cCBieSB0aGUgT3BlcmF0aW5nIFN5c3RlbSB0byBnaXZlIGl0IGEgY2hhbmNlIHRvIGhhbmRsZVxuICAgICAqIHJlZ2lvbiBtb25pdG9yaW5nIGV2ZW50cyBmb3IgZXhhbXBsZS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBkb24ndCBzZXQgYSB7SUJlYWNvbkRlbGVnYXRlfSBhbmQgZG9uJ3QgY2FsbCB0aGlzIG1ldGhvZCBtYW51YWxseSwgYW4gZXJyb3JcbiAgICAgKiBtZXNzYWdlIGdldCBlbWl0dGVkIGluIHRoZSBuYXRpdmUgcnVudGltZSBhbmQgdGhlIERPTSBhcyB3ZWxsIGFmdGVyIGEgY2VydGFpblxuICAgICAqIHBlcmlvZCBvZiB0aW1lLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIGFzIHNvb24gYXMgdGhlXG4gICAgICogbmF0aXZlIGxheWVyIGFja25vd2xlZGdlZCB0aGUgcmVxdWVzdCBhbmQgc3RhcnRlZCB0byBzZW5kIGV2ZW50cy5cbiAgICAgKi9cbiAgICBvbkRvbURlbGVnYXRlUmVhZHkoKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGJsdWV0b290aCBpcyBzd2l0Y2hlZCBvbiwgYWNjb3JkaW5nIHRvIHRoZSBuYXRpdmUgbGF5ZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdpdGggYSB7Qm9vbGVhbn1cbiAgICAgKiBpbmRpY2F0aW5nIHdoZXRoZXIgYmx1ZXRvb3RoIGlzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBpc0JsdWV0b290aEVuYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIEJsdWV0b290aCB1c2luZyB0aGUgbmF0aXZlIExheWVyLiAoQU5EUk9JRCBPTkxZKVxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdoZW4gQmx1ZXRvb3RoXG4gICAgICogY291bGQgYmUgZW5hYmxlZC4gSWYgbm90LCB0aGUgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGggYW4gZXJyb3IuXG4gICAgICovXG4gICAgZW5hYmxlQmx1ZXRvb3RoKCk6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgQmx1ZXRvb3RoIHVzaW5nIHRoZSBuYXRpdmUgTGF5ZXIuIChBTkRST0lEIE9OTFkpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgd2hlbiBCbHVldG9vdGhcbiAgICAgKiBjb3VsZCBiZSBlbmFibGVkLiBJZiBub3QsIHRoZSBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBkaXNhYmxlQmx1ZXRvb3RoKCk6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogU3RhcnQgbW9uaXRvcmluZyB0aGUgc3BlY2lmaWVkIHJlZ2lvbi5cbiAgICAgKlxuICAgICAqIElmIGEgcmVnaW9uIG9mIHRoZSBzYW1lIHR5cGUgd2l0aCB0aGUgc2FtZSBpZGVudGlmaWVyIGlzIGFscmVhZHkgYmVpbmdcbiAgICAgKiBtb25pdG9yZWQgZm9yIHRoaXMgYXBwbGljYXRpb24sXG4gICAgICogaXQgd2lsbCBiZSByZW1vdmVkIGZyb20gbW9uaXRvcmluZy4gRm9yIGNpcmN1bGFyIHJlZ2lvbnMsIHRoZSByZWdpb25cbiAgICAgKiBtb25pdG9yaW5nIHNlcnZpY2Ugd2lsbCBwcmlvcml0aXplXG4gICAgICogcmVnaW9ucyBieSB0aGVpciBzaXplLCBmYXZvcmluZyBzbWFsbGVyIHJlZ2lvbnMgb3ZlciBsYXJnZXIgcmVnaW9ucy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgZG9uZSBhc3luY2hyb25vdXNseSBhbmQgbWF5IG5vdCBiZSBpbW1lZGlhdGVseSByZWZsZWN0ZWQgaW4gbW9uaXRvcmVkUmVnaW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnaW9ufSByZWdpb24gQW4gaW5zdGFuY2Ugb2Yge1JlZ2lvbn0gd2hpY2ggd2lsbCBiZSBtb25pdG9yZWRcbiAgICAgKiBieSB0aGUgb3BlcmF0aW5nIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIGFzIHNvb24gYXMgdGhlXG4gICAgICogbmF0aXZlIGxheWVyIGFja25vd2xlZGdlZCB0aGUgZGlzcGF0Y2ggb2YgdGhlIG1vbml0b3JpbmcgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBzdGFydE1vbml0b3JpbmdGb3JSZWdpb24ocmVnaW9uOiBSZWdpb24pOiBQcm9taXNlPHN0cmluZz47XG4gICAgLyoqXG4gICAgICogU3RvcCBtb25pdG9yaW5nIHRoZSBzcGVjaWZpZWQgcmVnaW9uLiAgSXQgaXMgdmFsaWQgdG8gY2FsbFxuICAgICAqIHN0b3BNb25pdG9yaW5nRm9yUmVnaW9uOiBmb3IgYSByZWdpb24gdGhhdCB3YXMgcmVnaXN0ZXJlZCBmb3IgbW9uaXRvcmluZ1xuICAgICAqIHdpdGggYSBkaWZmZXJlbnQgbG9jYXRpb24gbWFuYWdlciBvYmplY3QsIGR1cmluZyB0aGlzIG9yIHByZXZpb3VzXG4gICAgICogbGF1bmNoZXMgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgZG9uZSBhc3luY2hyb25vdXNseSBhbmQgbWF5IG5vdCBiZSBpbW1lZGlhdGVseSByZWZsZWN0ZWQgaW4gbW9uaXRvcmVkUmVnaW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnaW9ufSByZWdpb24gQW4gaW5zdGFuY2Ugb2Yge1JlZ2lvbn0gd2hpY2ggd2lsbCBiZSBtb25pdG9yZWRcbiAgICAgKiBieSB0aGUgb3BlcmF0aW5nIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCBhcyBzb29uIGFzIHRoZVxuICAgICAqIG5hdGl2ZSBsYXllciBhY2tub3dsZWRnZWQgdGhlIGRpc3BhdGNoIG9mIHRoZSByZXF1ZXN0IHRvIHN0b3AgbW9uaXRvcmluZy5cbiAgICAgKi9cbiAgICBzdG9wTW9uaXRvcmluZ0ZvclJlZ2lvbihyZWdpb246IFJlZ2lvbik6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBzdGF0ZSB0aGUgZm9yIHNwZWNpZmllZCByZWdpb24uIFdoZW4gcmVzdWx0IGlzIHJlYWR5XG4gICAgICogZGlkRGV0ZXJtaW5lU3RhdGVGb3JSZWdpb24gaXMgdHJpZ2dlcmVkLiBUaGlzIGNhbiBiZSBhbnkgcmVnaW9uLFxuICAgICAqIGFsc28gdGhvc2Ugd2hpY2ggaXMgbm90IGN1cnJlbnRseSBtb25pdG9yZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGRvbmUgYXN5bmNocm9ub3VzbHkgYW5kIG1heSBub3QgYmUgaW1tZWRpYXRlbHkgcmVmbGVjdGVkIGluIG1vbml0b3JlZFJlZ2lvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlZ2lvbn0gcmVnaW9uIEFuIGluc3RhbmNlIG9mIHtSZWdpb259IHdoaWNoIHdpbGwgYmUgbW9uaXRvcmVkXG4gICAgICogYnkgdGhlIG9wZXJhdGluZyBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgYXMgc29vbiBhcyB0aGVcbiAgICAgKiBuYXRpdmUgbGF5ZXIgYWNrbm93bGVkZ2VkIHRoZSBkaXNwYXRjaCBvZiB0aGUgcmVxdWVzdCB0byBzdG9wIG1vbml0b3JpbmcuXG4gICAgICovXG4gICAgcmVxdWVzdFN0YXRlRm9yUmVnaW9uKHJlZ2lvbjogUmVnaW9uKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBTdGFydCByYW5naW5nIHRoZSBzcGVjaWZpZWQgYmVhY29uIHJlZ2lvbi5cbiAgICAgKlxuICAgICAqIElmIGEgcmVnaW9uIG9mIHRoZSBzYW1lIHR5cGUgd2l0aCB0aGUgc2FtZSBpZGVudGlmaWVyIGlzIGFscmVhZHkgYmVpbmdcbiAgICAgKiBtb25pdG9yZWQgZm9yIHRoaXMgYXBwbGljYXRpb24sIGl0IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIG1vbml0b3JpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGRvbmUgYXN5bmNocm9ub3VzbHkgYW5kIG1heSBub3QgYmUgaW1tZWRpYXRlbHkgcmVmbGVjdGVkIGluIHJhbmdlZFJlZ2lvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlZ2lvbn0gcmVnaW9uIEFuIGluc3RhbmNlIG9mIHtCZWFjb25SZWdpb259IHdoaWNoIHdpbGwgYmUgbW9uaXRvcmVkXG4gICAgICogYnkgdGhlIG9wZXJhdGluZyBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgYXMgc29vbiBhcyB0aGVcbiAgICAgKiBuYXRpdmUgbGF5ZXIgYWNrbm93bGVkZ2VkIHRoZSBkaXNwYXRjaCBvZiB0aGUgbW9uaXRvcmluZyByZXF1ZXN0LlxuICAgICAqL1xuICAgIHN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihyZWdpb246IFJlZ2lvbik6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogU3RvcCByYW5naW5nIHRoZSBzcGVjaWZpZWQgcmVnaW9uLiAgSXQgaXMgdmFsaWQgdG8gY2FsbFxuICAgICAqIHN0b3BNb25pdG9yaW5nRm9yUmVnaW9uOiBmb3IgYSByZWdpb24gdGhhdCB3YXMgcmVnaXN0ZXJlZCBmb3IgcmFuZ2luZ1xuICAgICAqIHdpdGggYSBkaWZmZXJlbnQgbG9jYXRpb24gbWFuYWdlciBvYmplY3QsIGR1cmluZyB0aGlzIG9yIHByZXZpb3VzXG4gICAgICogbGF1bmNoZXMgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgZG9uZSBhc3luY2hyb25vdXNseSBhbmQgbWF5IG5vdCBiZSBpbW1lZGlhdGVseSByZWZsZWN0ZWQgaW4gcmFuZ2VkUmVnaW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnaW9ufSByZWdpb24gQW4gaW5zdGFuY2Ugb2Yge0JlYWNvblJlZ2lvbn0gd2hpY2ggd2lsbCBiZSBtb25pdG9yZWRcbiAgICAgKiBieSB0aGUgb3BlcmF0aW5nIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCBhcyBzb29uIGFzIHRoZVxuICAgICAqIG5hdGl2ZSBsYXllciBhY2tub3dsZWRnZWQgdGhlIGRpc3BhdGNoIG9mIHRoZSByZXF1ZXN0IHRvIHN0b3AgbW9uaXRvcmluZy5cbiAgICAgKi9cbiAgICBzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbihyZWdpb246IFJlZ2lvbik6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogUXVlcmllcyB0aGUgbmF0aXZlIGxheWVyIHRvIGRldGVybWluZSB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIGluIGVmZmVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPElCZWFjb25QbHVnaW5SZXN1bHQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCB3aXRoIHRoZVxuICAgICAqIHJlcXVlc3RlZCBhdXRob3JpemF0aW9uIHN0YXR1cy5cbiAgICAgKi9cbiAgICBnZXRBdXRob3JpemF0aW9uU3RhdHVzKCk6IFByb21pc2U8SUJlYWNvblBsdWdpblJlc3VsdD47XG4gICAgLyoqXG4gICAgICogRm9yIGlPUyA4IGFuZCBhYm92ZSBvbmx5LiBUaGUgcGVybWlzc2lvbiBtb2RlbCBoYXMgY2hhbmdlZCBieSBBcHBsZSBpbiBpT1MgOCwgbWFraW5nIGl0IG5lY2Vzc2FyeSBmb3IgYXBwcyB0b1xuICAgICAqIGV4cGxpY2l0bHkgcmVxdWVzdCBwZXJtaXNzaW9ucyB2aWEgbWV0aG9kcyBsaWtlIHRoZXNlOlxuICAgICAqIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vbGlicmFyeS9wcmVyZWxlYXNlL2lPUy9kb2N1bWVudGF0aW9uL0NvcmVMb2NhdGlvbi9SZWZlcmVuY2UvQ0xMb2NhdGlvbk1hbmFnZXJfQ2xhc3MvaW5kZXguaHRtbCMvL2FwcGxlX3JlZi9vY2MvaW5zdG0vQ0xMb2NhdGlvbk1hbmFnZXIvcmVxdWVzdFdoZW5JblVzZUF1dGhvcml6YXRpb25cIj5yZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbjwvYT5cbiAgICAgKiA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvcHJlcmVsZWFzZS9pT1MvZG9jdW1lbnRhdGlvbi9Db3JlTG9jYXRpb24vUmVmZXJlbmNlL0NMTG9jYXRpb25NYW5hZ2VyX0NsYXNzL2luZGV4Lmh0bWwjLy9hcHBsZV9yZWYvb2NjL2luc3RtL0NMTG9jYXRpb25NYW5hZ2VyL3JlcXVlc3RBbHdheXNBdXRob3JpemF0aW9uXCI+cmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb248L2E+XG4gICAgICpcbiAgICAgKiBJZiB5b3UgYXJlIHVzaW5nIHRoaXMgcGx1Z2luIG9uIEFuZHJvaWQgZGV2aWNlcyBvbmx5LCB5b3Ugd2lsbCBuZXZlciBoYXZlIHRvIHVzZSB0aGlzLCBub3Ige0Bjb2RlIHJlcXVlc3RBbHdheXNBdXRob3JpemF0aW9ufVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIHJlcXVlc3QgZGlhbG9nIGlzIHNob3duLlxuICAgICAqL1xuICAgIHJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uKCk6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogU2VlIHRoZSBkb2N1bWVudGF0aW9uIG9mIHtAY29kZSByZXF1ZXN0V2hlbkluVXNlQXV0aG9yaXphdGlvbn0gZm9yIGZ1cnRoZXIgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCB3aGVuIHRoZSBuYXRpdmUgbGF5ZXJcbiAgICAgKiBzaG93cyB0aGUgcmVxdWVzdCBkaWFsb2cuXG4gICAgICovXG4gICAgcmVxdWVzdEFsd2F5c0F1dGhvcml6YXRpb24oKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlZ2lvbltdPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgd2l0aCBhbiB7QXJyYXl9XG4gICAgICogb2Yge1JlZ2lvbn0gaW5zdGFuY2VzIHRoYXQgYXJlIGJlaW5nIG1vbml0b3JlZCBieSB0aGUgbmF0aXZlIGxheWVyLlxuICAgICAqL1xuICAgIGdldE1vbml0b3JlZFJlZ2lvbnMoKTogUHJvbWlzZTxSZWdpb25bXT47XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZWdpb25bXT59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdpdGggYW4ge0FycmF5fVxuICAgICAqIG9mIHtSZWdpb259IGluc3RhbmNlcyB0aGF0IGFyZSBiZWluZyByYW5nZWQgYnkgdGhlIG5hdGl2ZSBsYXllci5cbiAgICAgKi9cbiAgICBnZXRSYW5nZWRSZWdpb25zKCk6IFByb21pc2U8UmVnaW9uW10+O1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgcmFuZ2luZyBpcyBhdmFpbGFibGUgb3Igbm90LCBhY2NvcmRpbmcgdG8gdGhlIG5hdGl2ZSBsYXllci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgd2l0aCBhIHtCb29sZWFufVxuICAgICAqIGluZGljYXRpbmcgd2hldGhlciByYW5naW5nIGlzIGF2YWlsYWJsZSBvciBub3QuXG4gICAgICovXG4gICAgaXNSYW5naW5nQXZhaWxhYmxlKCk6IFByb21pc2U8Ym9vbGVhbj47XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiByZWdpb24gdHlwZSBpcyBzdXBwb3J0ZWQgb3Igbm90LCBhY2NvcmRpbmcgdG8gdGhlIG5hdGl2ZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnaW9ufSByZWdpb24gQW4gaW5zdGFuY2Ugb2Yge1JlZ2lvbn0gd2hpY2ggd2lsbCBiZSBjaGVja2VkXG4gICAgICogYnkgdGhlIG9wZXJhdGluZyBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgd2l0aCBhIHtCb29sZWFufVxuICAgICAqIGluZGljYXRpbmcgd2hldGhlciB0aGUgcmVnaW9uIHR5cGUgaXMgc3VwcG9ydGVkIG9yIG5vdC5cbiAgICAgKi9cbiAgICBpc01vbml0b3JpbmdBdmFpbGFibGVGb3JDbGFzcyhyZWdpb246IFJlZ2lvbik6IFByb21pc2U8Ym9vbGVhbj47XG4gICAgLyoqXG4gICAgICogU3RhcnQgYWR2ZXJ0aXNpbmcgdGhlIHNwZWNpZmllZCByZWdpb24uXG4gICAgICpcbiAgICAgKiBJZiBhIHJlZ2lvbiBhIGRpZmZlcmVudCBpZGVudGlmaWVyIGlzIGFscmVhZHkgYmVpbmcgYWR2ZXJ0aXNlZCBmb3JcbiAgICAgKiB0aGlzIGFwcGxpY2F0aW9uLCBpdCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqXG4gICAgICogVGhpcyBjYWxsIHdpbGwgYWNjZXB0IGEgdmFsaWQgYmVhY29uIGV2ZW4gd2hlbiBubyBCbHVlVG9vdGggaXMgYXZhaWxhYmxlLFxuICAgICAqIGFuZCB3aWxsIHN0YXJ0IHdoZW4gQmx1ZVRvb3RoIGlzIHBvd2VyZWQgb24uIFNlZSB7SUJlYWNvbkRlbGVnYXRlLn1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnaW9ufSByZWdpb24gQW4gaW5zdGFuY2Ugb2Yge1JlZ2lvbn0gd2hpY2ggd2lsbCBiZSBhZHZlcnRpc2VkXG4gICAgICogYnkgdGhlIG9wZXJhdGluZyBzeXN0ZW0uXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBtZWFzdXJlZFBvd2VyOiBPcHRpb25hbCBwYXJhbWV0ZXIsIGlmIGxlZnQgZW1wdHksIHRoZSBkZXZpY2Ugd2lsbFxuICAgICAqIHVzZSBpdCdzIG93biBkZWZhdWx0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIGFzIHNvb24gYXMgdGhlXG4gICAgICogbmF0aXZlIGxheWVyIGFja25vd2xlZGdlZCB0aGUgZGlzcGF0Y2ggb2YgdGhlIGFkdmVydGlzaW5nIHJlcXVlc3QuXG4gICAgICovXG4gICAgc3RhcnRBZHZlcnRpc2luZyhyZWdpb246IFJlZ2lvbiwgbWVhc3VyZWRQb3dlcj86IG51bWJlcik6IFByb21pc2U8dm9pZD47XG4gICAgLyoqXG4gICAgICogU3RvcCBhZHZlcnRpc2luZyBhcyBhIGJlYWNvbi5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgZG9uZSBhc3luY2hyb25vdXNseSBhbmQgbWF5IG5vdCBiZSBpbW1lZGlhdGVseSByZWZsZWN0ZWQgaW4gaXNBZHZlcnRpc2luZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCBhcyBzb29uIGFzIHRoZVxuICAgICAqIG5hdGl2ZSBsYXllciBhY2tub3dsZWRnZWQgdGhlIGRpc3BhdGNoIG9mIHRoZSByZXF1ZXN0IHRvIHN0b3AgYWR2ZXJ0aXNpbmcuXG4gICAgICovXG4gICAgc3RvcEFkdmVydGlzaW5nKHJlZ2lvbjogUmVnaW9uKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGFkdmVydGlzaW5nIGlzIGF2YWlsYWJsZSBvciBub3QsIGFjY29yZGluZyB0byB0aGUgbmF0aXZlIGxheWVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCB3aXRoIGEge0Jvb2xlYW59XG4gICAgICogaW5kaWNhdGluZyB3aGV0aGVyIGFkdmVydGlzaW5nIGlzIGF2YWlsYWJsZSBvciBub3QuXG4gICAgICovXG4gICAgaXNBZHZlcnRpc2luZ0F2YWlsYWJsZSgpOiBQcm9taXNlPGJvb2xlYW4+O1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYWR2ZXJ0aXNpbmcgaXMgY3VycmVudGx5IGFjdGl2ZSwgYWNjb3JkaW5nIHRvIHRoZSBuYXRpdmUgbGF5ZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdpdGggYSB7Qm9vbGVhbn1cbiAgICAgKiBpbmRpY2F0aW5nIHdoZXRoZXIgYWR2ZXJ0aXNpbmcgaXMgYWN0aXZlLlxuICAgICAqL1xuICAgIGlzQWR2ZXJ0aXNpbmcoKTogUHJvbWlzZTxib29sZWFuPjtcbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBkZWJ1ZyBsb2dnaW5nIGluIHRoZSBuYXRpdmUgbGF5ZXIuIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Ugd2FudFxuICAgICAqIHRvIHByZXZlbnQgdGhpcyBwbHVnaW4gZnJvbSB3cml0aW5nIHRvIHRoZSBkZXZpY2UgbG9ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCBhcyBzb29uIGFzIHRoZVxuICAgICAqIG5hdGl2ZSBsYXllciBoYXMgc2V0IHRoZSBsb2dnaW5nIGxldmVsIGFjY29yZGluZ2x5LlxuICAgICAqL1xuICAgIGRpc2FibGVEZWJ1Z0xvZ3MoKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHRoZSBwb3N0aW5nIG9mIGRlYnVnIG5vdGlmaWNhdGlvbnMgaW4gdGhlIG5hdGl2ZSBsYXllci4gVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50XG4gICAgICogdG8gYWxsb3cgdGhlIHBsdWdpbiB0aGUgcG9zdGluZyBsb2NhbCBub3RpZmljYXRpb25zLlxuICAgICAqIFRoaXMgY2FuIGJlIHZlcnkgaGVscGZ1bCB3aGVuIGRlYnVnZ2luZyBob3cgdG8gYXBwcyBiZWhhdmUgd2hlbiBsYXVuY2hlZCBpbnRvIHRoZSBiYWNrZ3JvdW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIGFzIHNvb24gYXMgdGhlXG4gICAgICogbmF0aXZlIGxheWVyIGhhcyBzZXQgdGhlIGZsYWcgdG8gZW5hYmxlZC5cbiAgICAgKi9cbiAgICBlbmFibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgcG9zdGluZyBvZiBkZWJ1ZyBub3RpZmljYXRpb25zIGluIHRoZSBuYXRpdmUgbGF5ZXIuIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Ugd2FudFxuICAgICAqIHRvIHByZXZlbnQgdGhlIHBsdWdpbiBmcm9tIHBvc3RpbmcgbG9jYWwgbm90aWZpY2F0aW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCBhcyBzb29uIGFzIHRoZVxuICAgICAqIG5hdGl2ZSBsYXllciBoYXMgc2V0IHRoZSBmbGFnIHRvIGRpc2FibGVkLlxuICAgICAqL1xuICAgIGRpc2FibGVEZWJ1Z05vdGlmaWNhdGlvbnMoKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIGRlYnVnIGxvZ2dpbmcgaW4gdGhlIG5hdGl2ZSBsYXllci4gVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50XG4gICAgICogYSBkZWJ1ZyB0aGUgaW5uZXIgd29ya2luZ3Mgb2YgdGhpcyBwbHVnaW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgYXMgc29vbiBhcyB0aGVcbiAgICAgKiBuYXRpdmUgbGF5ZXIgaGFzIHNldCB0aGUgbG9nZ2luZyBsZXZlbCBhY2NvcmRpbmdseS5cbiAgICAgKi9cbiAgICBlbmFibGVEZWJ1Z0xvZ3MoKTogUHJvbWlzZTx2b2lkPjtcbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHRoZSBwcm92aWRlZCBbbWVzc2FnZV0gdG8gdGhlIGRldmljZSBsb2dzLlxuICAgICAqIE5vdGU6IElmIGRlYnVnIGxvZ2dpbmcgaXMgdHVybmVkIG9mZiwgdGhpcyB3b24ndCBkbyBhbnl0aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZCB0byB0aGUgZGV2aWNlIGxvZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgd2l0aCB0aGUgbG9nXG4gICAgICogbWVzc2FnZSByZWNlaXZlZCBieSB0aGUgbmF0aXZlIGxheWVyIGZvciBhcHBlbmRpbmcuIFRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgICogaXMgZXhwZWN0ZWQgdG8gYmUgZXF1aXZhbGVudCB0byB0aGUgb25lIHByb3ZpZGVkIGluIHRoZSBvcmlnaW5hbCBjYWxsLlxuICAgICAqL1xuICAgIGFwcGVuZFRvRGV2aWNlTG9nKG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG59XG4iXX0=