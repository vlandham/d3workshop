D3 Workshop
============

This is an AngularJS workshop application with built-in live coding editor suitable
for exploring and learning D3 over a series of lessons. You can see the live version here:

https://d3workshop.firebaseapp.com/

The purpose of this README is to introduce the preferred technical stack, and programming conventions used throughout. Please read the entire document.

Dependencies
-----------
* Ruby - For running Compass
* Node - Various dependencies
* Grunt - Development workflow, and local server.
* Compass - For CSS and Asset compression

Developers
----------

To develop on this application first install ruby 2.x
Then install bundler `gem install bundler`
Then install node and npm visit `http://nodejs.org/` for details.
Then install yeoman, grunt and bower `npm install -g yo grunt-cli bower`
Then run `npm install && bower install`
Then run `bundle install`

Run `grunt serve` from another console window. This will compile the Jade (HTML),
and SASS (CSS) and automatically refresh the browser whenever files change.

Development workflow
--------------------
From the root of the application type:

* `grunt serve` which starts the local development server.

*Rules for development:*

* Work in a feature branch in Git.  Do not work in master keep it as our golden copy.
* Do not modify .html files directly. They are all auto-generated from .jade files.
* Do not modify .css files directly. They are all auto-generated from .sass files.

Name spacing CSS
----------------
This application automatically injects the controller name and action for the
current route into a body class. This allows us to logically organize our CSS around
controller action pairs. This will keep the underlying classes generic which helps
prevent CSS bloat. Please do not forget to use these name spaces they are helpful!

Use the name spacing like this:

```sass
.MainCtrl {
  h2 {
    color:#333;
  }
}
```

The present environment is also injected into the body tag. This is very helpful
during development. For example you can style links missing hrefs with a bright
red color. This will remind you to fill in the content. However, since the styles
are scoped to the development keyword even if the code is deployed the red text
will not appear to the end user. If you'd like to tune the CSS for a
particular environment you can do so like this:

```sass
.development.MainCtrl {
  h2 {
    color:#333;
  }
}
```

File System Layout
------------------
The basic file system layout is as follows:

```
  ├-- App
      └-- scripts
          ├-- controllers
          ├-- directives
          ├-- modules
          ├-- interceptors
          ├-- providers
          ├-- services
          ├-- app.js (loads all the modules needed for playback)
          ├-- boot.js (code that runs after the app has been bootstrapped)
          ├-- constants.js (application config but dynamically generated do not touch)
          └-- namespace.js (module namespaces needed by the app)
      ├-- styles (SCSS files used in visual design)
      └-- views
  ├-- bower_components (external dependencies needed by the app)
```

Releasing A Build
-----------------
Before releasing a build increment the package.json file's version number. This
new number will be picked up as part of the build process, and can be tracked from
the browser's developer console. This is _very_ helpful when trying to determine
if a deployed build is the version you think it is. If you open the console with
the application running you should see something like this:

```bash
App Initialized
Version: 0.0.0
Environment: development
```
To Release a build run `grunt build`
this will export the code to the `www` folder. Do not release a build
unless you have reason to. Only run the build command inside the master branch.
Do not check in changes to the `www` unless you are in master.

Deploying to production
-----------------------

To deploy to production simply commit code to the production branch and push it to Github. Once received the
Travis service will be notified and begin the building process. As part of the process images will be assets
to Amazon's S3 service and references to those assets will be changed in the index file. You will notice when
comparing the staging deploy with the production deploy that assets are served differently. This is because
travis does not run `grunt build` but rather `grunt deploy`.

Bugs
----

If you receive the warning in the console:  `EMFILE then Error: EMFILE, too many open files`
this is because your system's file watch limit is too low for the number of files
that needs to be open during development. To fix this error type the following into the console:

`ulimit -n 10000`

Improve this app
----------------

Please feel free to add lessons, fix bugs, correct errata and in general improve this app for everyone.
