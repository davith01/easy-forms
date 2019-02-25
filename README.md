# Easy Forms

This uses the [Ionic](https://ionicframework.com/docs/intro) Framework components for apps Android .

## Quick start

**Install Framework**

Install or rebuild last component to Node, IONIC and Cordova
```
$ npm install -g npm
$ npm install g ionic cordova
```
 
You can verify your installation with the command.
```
$ ionic --version 
```

**GitHub Versioning Tools**

Clone the repository

```
git clone https://github.com/davith01/easy-forms.git
```
```
cd easy-forms/
```
```
$ npm install
```
 
To test server use. In this mode the Cordova plugins doesn't work

```
ionic serve
```

**Android Platform**

Read this steps for Android Platform Setup [https://ionicframework.com/docs/installation/android](https://ionicframework.com/docs/installation/android) .

Add platform android to the IONIC proyect.

```
$ ionic cordova platform add android
```

Build platform android.

```
$ ionic cordova build android
```

** Test app in simulator devices **

Downdolad Genymotion [https://www.genymotion.com] (https://www.genymotion.com). User account is required for test!.
Add new AVD Android Virtual Device > version 22
Run AVD


For testing the app with the devices AVD running in Genymotion.

```
$ ionic run android --device
```



## Script included
 
 - cordova-sqlite-storage
 - cordova-plugin-fingerprint-aio
 - angular2-signaturepad
 