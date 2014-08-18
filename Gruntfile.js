var fs = require('fs');

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            before: ['www/*', '!www/.dont-delete']
        },
        mkdir: {
            all: {
                options: {
                    create: ['www/img', 'src/js/compiled']
                }
            },
            dev: {
                options: {
                    create: ['www/img', 'www/css', 'src/js/compiled']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            lib: {
                files: {
                    'src/js/compiled/lib.js': [
                        'src/js/library/fastclick.js'
                    ]
                }
            }
        },
        closureBuilder: {
            options: {
                builder: 'src/js/library/tartJS/tools/goog/build/closurebuilder.py',
                namespaces: 'sc.Bootstrapper',
                compilerFile: 'src/js/library/tartJS/tools/goog/compiler/compiler.jar',
                output_mode: 'compiled',
                compile: true,
                compilerOpts: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
//                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
//                    compilation_level: 'WHITESPACE_ONLY',
                    warning_level: 'verbose',
//                    formatting: 'PRETTY_PRINT',
                    language_in: 'ECMASCRIPT5',
                    charset: "UTF-8",
                    externs: ['src/js/sc/externs.js'],
                    jscomp_error: ['accessControls', 'checkRegExp', 'checkTypes', 'checkVars', 'invalidCasts',
                        'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'undefinedVars',
                        'unknownDefines', 'visibility'],
                    jscomp_off :['liskov']
                },
                execOpts: {
                    maxBuffer: 999999 * 1024
                }
            },
            main: {
                src: 'src/js',
                dest: 'src/js/compiled/compiled.js'
            }
        },
        closureDepsWriter: {
            options: {
                depswriter: 'src/js/library/tartJS/tools/goog/build/depswriter.py', // filepath to depswriter
                root_with_prefix: '"src/js/ ../../../../../"'
            },
            main: {
                dest: 'src/js/deps.js'
            }
        },
        copy: {
            prod: {
                files: [
                    { expand: true, cwd: 'src/', src: ['img/**'], dest: 'www/' },
                    { expand: true, cwd: 'src/', src: ['fonts/**'], dest: 'www/' },
                    { expand: true, cwd: 'src/', src: ['index.html'], dest: 'www/' },
                    { expand: true, cwd: 'src/', src: ['config.xml'], dest: 'www/' },
                    { expand: true, cwd: 'src/', src: ['js/sc/db.js'], dest: 'www/' },
                ]
            },
            dev: {
                files: [
                    { expand: true, cwd: 'src/', src: ['index.html'], dest: 'www/' },
                    { expand: true, cwd: 'src/', src: ['config.xml'], dest: 'www/' },
                    { expand: true, cwd: 'src/', src: ['js/sc/db.js'], dest: 'www/' },
                ]
            }
        },
        symlink: {
            all: {
                files: [
                    { expand: true, cwd: 'src', src: ['js/*'], dest: 'www' },
                    { expand: true, cwd: 'src', src: ['css/*'], dest: 'www' },
                    { expand: true, cwd: 'src', src: ['img/*'], dest: 'www' },
                    { expand: true, cwd: 'src', src: ['fonts/*'], dest: 'www' }
                ]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['src/js/compiled/lib.js', 'src/js/compiled/compiled.js'],
                dest: 'www/js/compiled.js'
            },
            css: {
                src: [
                    'src/css/reset.css',
                    'src/css/fonts.css',
                    'src/css/layout.css',
                    'src/css/menu.css',
                    'src/css/search.css',
                    'src/css/coursesCard.css',
                    'src/css/navigationBar.css',
                    'src/css/tutorial.css',
                ],
                dest: 'www/css/compiled.css'
            }
        },
        combine:{
            dev:{
                input:"www/index.html",
                output:"www/index.html",
                tokens:[{
                    token:"<scripts/>",
                    string:'<script type="text/javascript" src="js/library/fastclick.js"></script>' +
                        '<script type="text/javascript" src="cordova.js"></script>' +
                        '<script type="text/javascript" src="js/library/tartJS/third_party/goog/goog/base.js"></script>' +
                        '<script type="text/javascript" src="js/deps.js"></script>' +
                        '<script type="text/javascript" src="js/sc/db.js"></script>' +
                        '<script type="text/javascript" src="js/sc/Bootstrapper.js"></script>'

                }, {
                    token:"<stylesheets/>",
                    string:'<link rel="stylesheet" type="text/css" href="css/reset.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/fonts.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/layout.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/navigationBar.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/menu.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/search.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/coursesCard.css" />' +
                        '<link rel="stylesheet" type="text/css" href="css/tutorial.css" />'
                }]
            },
            production: {
                input:"www/index.html",
                output:"www/index.html",
                tokens:[{
                    token:"<scripts/>",
                    string: '<script type="text/javascript" src="cordova.js"></script>' +
                        '<script type="text/javascript" src="js/sc/db.js"></script>' +
                        '<script type="text/javascript" src="js/compiled.js"></script>'
                }, {
                    token:"<stylesheets/>",
                    string:'<link rel="stylesheet" type="text/css" href="css/compiled.css" />'
                }]
            },
            web: {
                input:"www/index.html",
                output:"www/index.html",
                tokens: [{
                    token: "<environment/>",
                    string: fs.readFileSync('src/config/web.js').toString()
                }]
            },
            device: {
                input: "www/index.html",
                output: "www/index.html",
                tokens: [{
                    token: "<environment/>",
                    string: fs.readFileSync('src/config/device.js').toString()
                }]
            },
            local: {
                input: "www/index.html",
                output: "www/index.html",
                tokens: [{
                    token: "<directives/>",
                    string: fs.readFileSync('src/config/local.js').toString()
                }]
            },
            test: {
                input: "www/index.html",
                output: "www/index.html",
                tokens: [{
                    token: "<directives/>",
                    string: fs.readFileSync('src/config/test.js').toString()
                }]
            },
            prod: {
                input: "www/index.html",
                output: "www/index.html",
                tokens: [{
                    token: "<directives/>",
                    string: fs.readFileSync('src/config/prod.js').toString()
                }]
            }
        },
        newer: {
            "uglify": {
                src: ['src/js/library/*.js'],
                dest: 'src/js/compiled/lib.js',
                options: {
                    tasks: ['uglify:lib']
                }
            },
            "closureBuilder": {
                src: ['src/js/**/*.js'],
                dest: 'src/js/compiled/compiled.js',
                options: {
                    tasks: ['closureBuilder']
                }
            },
            "closureDepsWriter": {
                src: ['src/js/**/*.js'],
                dest: 'src/js/deps.js',
                options: {
                    tasks: ['closureDepsWriter']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-closure-tools');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-combine');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-newer-explicit');

    grunt.registerTask('default', ['clean:before', 'mkdir:all', 'newer:uglify', 'newer:closureBuilder', 'copy:prod', 'concat', 'combine:production']);
    grunt.registerTask('production', ['clean:before', 'mkdir:all', 'newer:uglify', 'newer:closureBuilder', 'copy:prod', 'concat', 'combine:production']);
    grunt.registerTask('dev', ['clean:before', 'mkdir:dev', 'newer:closureDepsWriter', 'symlink', 'copy:dev', 'combine:dev']);
    grunt.registerTask('web', ['combine:web']);
    grunt.registerTask('device', ['combine:device']);
    grunt.registerTask('local', ['combine:local']);
    grunt.registerTask('test', ['combine:test']);
    grunt.registerTask('prod', ['combine:prod']);
};
