'use strict';

var ChildProcess = require('child_process');

module.exports = {
  getActiveWindowTitle: function(request, reply) {
    ChildProcess.exec('AppleScript/ActiveWindowTitle.AppleScript', function (error, stdout, stderr) {
      reply(stdout);
    });
  },

  toggleVLCVideo: function(request, reply) {
    console.log(request.pre.activeWindowTitle);
    if (request.pre.activeWindowTitle.indexOf('VLC') === 0) {
      ChildProcess.exec('osascript -e \'tell application "VLC" to play\'', function(error, stdout, stderr) {

        reply({ success: true });
      });
    }
  },

  toggleYoutubeVideo: function(request, reply) {

    if (request.pre.activeWindowTitle.indexOf('Google Chrome') === 0) {
      ChildProcess.exec('AppleScript/PauseYoutube.AppleScript', function(error, stdout, stderr) {
        if (stdout) {
          const retVal = stdout.split(',');
          reply({
            success: retVal[0].trim() === 'true',
            paused:  retVal[1].trim() === 'true'
          });
        } else {
          console.log('stdout:', stdout);
          console.log('stderr:', stderr);

          reply({ success: false });
        }
      });
    }
  },

  decreaseVolume: function(request, reply) {
    ChildProcess.exec('osascript -e "set volume output volume (output volume of (get volume settings) - 5) --100%"', function(error, stdout, stderr) {
      ChildProcess.exec('osascript -e "output volume of (get volume settings)"', function(err, out, e) {
        reply(out);
      });
    });
  },

  increaseVolume: function(request, reply) {
    ChildProcess.exec('osascript -e "set volume output volume (output volume of (get volume settings) + 5) --100%"', function(error, stdout, stderr) {
      ChildProcess.exec('osascript -e "output volume of (get volume settings)"', function(err, out, e) {
        reply(out);
      });
    });
  }
};