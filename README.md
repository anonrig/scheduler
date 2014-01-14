SU-Scheduler
============
Parses Sabanci University's BannerWeb course website and transforms it into JSON.


Dependencies
------------

Nokogiri >=1.6.0

JSON >=1.8.1

Ruby >= 2.0

Compiling
---------
Run
    grunt production device prod && phonegap build ios

This will make a proper `www` folder out of the `src` folder and then prepare the iOS project.
