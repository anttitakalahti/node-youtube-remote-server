'use strict';

const AppleScript = require('../applescript-runner');

exports.register = function(server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/active-window-title',
      config: {
        pre: [
          { method: AppleScript.getActiveWindowTitle, assign: 'activeWindowTitle' }
        ],
        handler: function(request, reply) {
          reply({ title: request.pre.activeWindowTitle });
        }
      }
    },
    {
      method: 'GET',
      path: '/toggle-video',
      config: {
        pre: [
          { method: AppleScript.toggleYoutubeVideo, assign: 'result' }
        ],
        handler: function(request, reply) {
          reply({ result: request.pre.result });
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'active-window-title',
  version: '1.0.0'
};