'use strict';

var ChildProcess = require('child_process');

module.exports = {
  getActiveWindowTitle: function(request, reply) {
    ChildProcess.exec('AppleScript/ActiveWindowTitle.AppleScript', function (error, stdout, stderr) {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      reply(stdout);
    });
  },
  toggleYoutubeVideo: function(request, reply) {
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
        reply({
          success: false
        });
      }
    });
  }
};