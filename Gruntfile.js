/*
 * Generated on 2014-05-05
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.app %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.app %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

  
    // load all grunt tasks
    require('load-grunt-tasks')(grunt, {
        pattern : ['grunt-*']
    });
    var serveStatic = require('serve-static');

    var appConfig = {
        app: 'app',
        dist: 'dist',
        tmp: 'tmp',
        test: 'test',
        html: 'html',
        assetPath: 'resources',
        angApp: 'app'
    };

    // Project configuration.
    grunt.initConfig({

        config: appConfig,

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.tmp %>/*.html',
                    '<%= config.tmp %>/<%= config.assetPath %>/sass/*.css',
                    '<%= config.tmp %>/<%= config.assetPath %>/js/*.js'
                ]
            },

            assemble: {
                files: ['<%= config.app %>/{jsondata,layouts}/**/*.{md,hbs,yml,json}'],
                tasks: ['assemble:dev']
            },
            js: {
                files: ['<%= config.app %>/<%= config.assetPath %>/js/*.js'],
                tasks: ['copy:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            copy: {
                files: ['<%= config.app %>/<%= config.assetPath %>/{js}/**/*'],
                tasks: ['copy:dev']
            },
            compass: {
                files: [
                    '<%= config.app %>/<%= config.assetPath %>/sass/**/*.{scss,sass}'
                ],
                tasks: ['recursive-compass:dev']
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                //hostname: '0.0.0.0'
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        return [
                            serveStatic('tmp'),
                            connect().use(
                                '/bower_components',
                                serveStatic('./bower_components')
                            ),
                            connect().use(
                                '/app/<%= config.assetPath %>/sass',
                                serveStatic('./app/<%= config.assetPath %>/sass')
                            ),
                            serveStatic(appConfig.angApp)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                        serveStatic('tmp'),
                        serveStatic('test'),
                        connect().use(
                            '/bower_components',
                            serveStatic('./bower_components')
                        ),
                        serveStatic(appConfig.angApp)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            dev : {
                src: '<%= config.tmp %>'
            },
            prod : {
                src: '<%= config.dist %>'
            }
        },

        assemble: {
            dev: {
                options: {
                    flatten: true,
                    assets: '<%= config.tmp %>',
                    layout: 'body.hbs',
                    layoutdir: '<%= config.app %>/layouts/container',
                    helpers: ['<%= config.app %>/layouts/helpers/*.js'],
                    data: '<%= config.app %>/jsondata/*.{json,yml}',
                    partials: '<%= config.app %>/layouts/partials/**/*.hbs'
                },
                files: {
                    '<%= config.tmp %>/': [
                        '<%= config.app %>/layouts/main/*.hbs',
                    ]
                }
            },
            gold : {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>',
                    layout: 'body.hbs',
                    layoutdir: '<%= config.app %>/layouts/container',
                    helpers: ['<%= config.app %>/layouts/helpers/*.js'],
                    data: '<%= config.app %>/jsondata/*.{json,yml}',
                    partials: '<%= config.app %>/layouts/partials/**/*.hbs'
                },
                files: {
                    '<%= config.dist %>/': [
                        '<%= config.app %>/layouts/main/*.hbs',
                    ]
                }
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= config.app %>/html/index.html'],
                ignorePath:  /\.\.\//
            },
            sass: {
                src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        'recursive-compass': {
            dev: {
                src: [
                    '<%= config.app %>/<%= config.assetPath %>/sass/**/*.{scss,sass}'
                ],
                options: {
                    sassDir: ['<%= config.app %>/<%= config.assetPath %>/sass'],
                    cssDir: ['<%= config.tmp %>/<%= config.assetPath %>/css'],
                    environment: 'development',
                    javascriptsDir: '<%= config.assetPath %>/js',
                    importPath: 'bower_components',
                    noDebugInfo: true
                }
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: ['<%= config.app %>/<%= config.assetPath %>/sass'],
                    cssDir: ['<%= config.tmp %>/<%= config.assetPath %>/styles'],
                    environment: 'development',
                    javascriptsDir: '<%= config.app %>/<%= config.assetPath %>/js',
                    importPath: 'bower_components',
                    relativeAssets: false,
                    assetCacheBuster: false,
                    sourcemap: true
                }
            },
            prod: {
                options: {
                    sassDir: ['<%= config.app %>/<%= config.assetPath %>/sass'],
                    cssDir: ['<%= config.dist %>/<%= config.assetPath %>/styles'],
                    environment: 'production',
                    javascriptsDir: '<%= config.app %>/<%= config.assetPath %>/js',
                    importPath: 'bower_components',
                    relativeAssets: false,
                    assetCacheBuster: false,
                    noLineComments: true,
                    outputStyle: 'compressed'
                }
            }
        },

        concat: {
            options: {
            },
            prod: {
                files: {
                    '<%= config.tmp %>/<%= config.assetPath %>/js/poc.scripts.js': [
                        '<%= config.app %>/<%= config.assetPath %>/js/plugin/*.js',
                        '<%= config.app %>/<%= config.assetPath %>/js/poc.main.js',
                    ]

                }
            }
        },

        copy: {
            dev: {
                files: [
                    
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.tmp %>',
                        src: [
                            '<%= config.assetPath %>/js/**/*.js'
                        ]
                    },
                    
                ]
            },
            
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.tmp %>',
                        src: ['<%= config.assetPath %>/images/sprites/*.png'],
                        dest: '<%= config.dist %>'
                    }
                ]
            },
            
        },

        uglify: {
            options: { },
            prod: {
                files: {
                    '<%= config.dist %>/<%= config.assetPath %>/js/poc.scripts.js': ['<%= config.tmp %>/<%= config.assetPath %>/js/poc.scripts.js']
                }
            },
        },

        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.dist %>/index.html'
        },

        usemin: {
            options: {
                dirs: ['<%= config.dist %>']
            },
             html: ['<%= config.dist %>/{,*/}*.html']
        },

        cssmin: {
            prod: {
                files: {
                    '<%= config.dist %>/<%= config.assetPath %>/styles/poc.styles.css': ['<%= config.tmp %>/<%= config.assetPath %>/styles/poc.styles.css']
                }
            }
        },


        concurrent: {
            server: [
                'recursive-compass:dev'
            ],
            gold: [
                'compass:prod'
            ],
        },

        compress: {
            main: {
                options: {},
                files: [
                    
                    {   // Un-Minified JS
                        expand: true,
                        cwd: '<%= config.app %>/js',
                        dest: '_DEV_Scripts',
                        src: [
                            'poc.main.js',
                            'plugin/**'
                        ]
                    },
                    {   // Vendor JS Libraries
                        expand: true,
                        dest: '_DEV_Libraries',
                        cwd: 'bower_components/',
                        src: [
                            'bootstrap-sass/assets/javascripts/bootstrap.js',
                        ]
                    }
                ]
            }
        },

        
    });

    // All tasks
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if(target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:dev',
            'copy:dev',
            //'copy:appsDev',
            'recursive-compass:dev',
            'concat:prod',
            'assemble:dev',
            //'modernizr',
            'connect:livereload',
            'watch'
        ]);
    });

   
    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build-poc', [
        'clean:dev',
        'clean:prod',
        'assemble:gold',
        'useminPrepare',
        'copy:prod',
        'concurrent:gold',
        'concat:prod',
        'uglify:prod',
        'usemin',
        //'modernizr'
    ]);

    grunt.registerTask('default', []);

    
};
