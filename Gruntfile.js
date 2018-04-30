/* Gruntfile for GeoCdnTecnicos

 */

module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {

                files: [

                    'webapp/**/*'

                ],

                tasks: [ 'clean', 'copy', 'concat', 'uglify'],

                options: {

                    spawn: true,
                    event:['all']
                }
            }
        },


        clean: [ "WebContent/**/*"],
        
        

        copy: {
            main: {
                files: [

                    {expand: true, cwd: 'webapp', src: ['*.html'],        dest: 'WebContent/'},
                    {expand: true, cwd: 'webapp', src: ['favicon.ico'],   dest: 'WebContent/'},

                    {expand: true, cwd: 'webapp/css',  src: ['**'],  dest: 'WebContent/css/'},
                    {expand: true, cwd: 'webapp/img',  src: ['**'],  dest: 'WebContent/img/'},
                    {expand: true, cwd: 'webapp/font', src: ['masago_chosen/masago_chosen-webfont.woff*'],  dest: 'WebContent/font/'},


                    /* ACV OJO 201602261355 TODO Remove when not in debug development, this deployment of the non-minified avascript files */
                    {expand: true, cwd: 'webapp/', src: ['js/**'],  dest: 'WebContent/'},

                ]
            }
        },

        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },

            dist: {
                src: [
                    'bower_components/iscroll/build/iscroll.js'
                ],
                dest: 'WebContent/js/masagobymanchax.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>  - v<%= pkg.version %> - */\n',
                sourceMap: true,
                sourceMapIncludeSources: true,
                sourceMapIn: 'WebContent/js/masagobymanchax.js.map'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: 'WebContent/js/masagobymanchax.min.js'
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', [ 'clean', 'copy', 'concat', 'uglify']);

};
