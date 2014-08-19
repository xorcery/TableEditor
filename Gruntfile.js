module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dest: grunt.option('target') || 'dist',
    basePath: 'App_Plugins/<%= pkg.name %>',

    concat: {
      dist: {
        src: [
          'app/js/controllers/table.editor.js'
        ],
        dest: '<%= dest %>/<%= basePath %>/js/table.editor.js',
        nonull: true
      }
    },

    less: {
      dist: {
        options: {
          paths: ["app/less"],
        },
        files: {
          '<%= dest %>/<%= basePath %>/css/table.editor.css': 'app/less/table.editor.less',
        }
      }
    },

    watch: {
      less: {
        files: ['app/less/**/*.less'],
        tasks: ['less:dist'],
        options: {
          spawn: false
        }
      },

      js: {
        files: ['app/js/**/*.js'],
        tasks: ['concat:dist'],
        options: {
          spawn: false
        }
      },

      html: {
        files: ['app/views/**/*.html'],
        tasks: ['copy:views'],
        options: {
          spawn: false
        }
      }
    },

    msbuild: {
      options: {
        stdout: true,
        verbosity: 'quiet',
        version: 4
      },
      dist: {
        src: ['app/Umbraco/TableEditor/TableEditor.csproj'],
        options: {
          projectConfiguration: 'Debug',
          targets: ['Clean', 'Rebuild']
        }
      }
    },

    copy: {
      config: {
        src: 'app/package.manifest',
        dest: '<%= dest %>/<%= basePath %>/package.manifest',
      },      

      views: {
        expand: true,
        cwd: 'app/views/',
        src: '**',
        dest: '<%= dest %>/<%= basePath %>/views/'
      },

      dll: {
        expand: true,
        flatten: true,
        cwd: 'app/Umbraco/TableEditor/bin/Debug/',
        src: '**',
        dest: '<%= dest %>/bin/'
      },

      nugetContent: {
        expand: true,
        cwd: '<%= dest %>',
        src: ['**/*','!bin/**'],
        dest: 'tmp/nuget/content/'
      },

      nugetLib: {
        expand: true,
        cwd: '<%= dest %>',
        src: 'bin/*.*',
        dest: 'tmp/nuget/lib/net40/',
        flatten: true
      },

      umbraco: {
        expand: true,
        cwd: '<%= dest %>/',
        src: '**',
        dest: 'tmp/umbraco/'
      }
    },

    template: {
      nuspec: {
        options: {
          data: {
            name:        '<%= pkg.name %>',
            version:     '<%= pkg.version %>',
            author:      '<%= pkg.author.name %>',
            description: '<%= pkg.description %>'
          }
        },
        files: {
          'tmp/nuget/<%= pkg.name %>.nuspec': 'config/package.nuspec'
        }
      }
    },

    mkdir: {
      pkg: {
        options: {
          create: ['pkg/nuget', 'pkg/umbraco']
        },
      },
    },

    nugetpack: {
      dist: {
        src: 'tmp/nuget/<%= pkg.name %>.nuspec',
        dest: 'pkg/nuget/'
      }
    },

    umbracoPackage: {
      options: {
        name:        '<%= pkg.name %>',
        version:     '<%= pkg.version %>',
        url:         '<%= pkg.url %>',
        license:     '<%= pkg.license %>',
        licenseUrl:  '<%= pkg.licenseUrl %>',
        author:      '<%= pkg.author.name %><% if (pkg.contributors) { %>, <%= pkg.contributors.map(function(p) { return p.name; }).join(", ") %><% } %>',
        authorUrl:   '<%= pkg.author.url %>',
        manifest:    'config/package.xml',
        readme:      'config/readme.txt',
        sourceDir:   'tmp/umbraco',
        outputDir:   'pkg/umbraco',
      }
    },

    clean: {
      dist: '<%= dest %>'
    }
  });
  grunt.registerTask('forceOn', 'turns the --force option ON',
    function() {
      if ( !grunt.option( 'force' ) ) {
        grunt.config.set('forceStatus', true);
        grunt.option( 'force', true );
      }
    });

  grunt.registerTask('forceOff', 'turns the --force option Off',
    function() {
      if ( grunt.config.get('forceStatus') ) {
        grunt.option( 'force', false );
      }
    });
  grunt.registerTask('default', ['concat', 'less', 'copy:config', 'copy:views', 'copy:dll', 'msbuild:dist']);
  grunt.registerTask('nuget', ['clean', 'default', 'copy:nugetContent', 'copy:nugetLib', 'template:nuspec', 'mkdir:pkg', 'nugetpack']);
  grunt.registerTask('package', ['forceOn', 'clean', 'forceOff', 'default', 'copy:umbraco', 'mkdir:pkg', 'umbracoPackage']);

};

