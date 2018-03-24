module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default : {
        tsconfig: './tsconfig.json',
        sourceMap: false,
        src: ["**/*.ts", "!node_modules/**/*.ts"]
      }
    },
    watch:{
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks:["ts"]
      },
      dist:{
        files: ["dist/\*\*/\*.js"],
        tasks: ["shell:deploy"]
      }
    },
    shell: {
        deploy: {
          command: "rsync -a -e \"ssh\" --rsync-path=\"sudo rsync\" dist/ pi@192.168.8.101:/home/pi/Development/gardenjs/dist && rsync -a -e \"ssh\" --rsync-path=\"sudo rsync\" package.json pi@192.168.8.101:/home/pi/Development/gardenjs/"
        }
      },
    rsync: {
      options: {
          
      
      },
      stage: {
          options: {
              src: "/dist",
              dest: "/home/pi/Development/gardenjs/dist",
              host: "pi@192.168.8.108",
              
          }
      },
      prod: {
          options: {
              src: "../dist/",
              dest: "/var/www/site",
              host: "user@live-host",
              delete: true // Careful this option could cause data loss, read the docs!
          }
      }
  }
  });
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks("grunt-rsync");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default", ["watch"]);

  grunt.registerTask("deploy", "deploying to rpi", function(){
    grunt.log.writeln('hello world');
    var shell = require('child_process').exec,
      command = "echo 'helloworld'";

      shell(command, function(err, stdout, stderr){
        grunt.log.writeln('hello world');
        if (!err){
          grunt.log.writeln('hello world');
        } else grunt.log.error(err);
      })

  })
};