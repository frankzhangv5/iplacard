npm run cordova-build-android
du -h src-cordova/platforms/android/app/build/outputs/apk/release/app-release.apk
adb install -r src-cordova/platforms/android/app/build/outputs/apk/release/app-release.apk
