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
          console.log('request.pre.activeWindowTitle:', request.pre.activeWindowTitle);

          reply({ title: request.pre.activeWindowTitle });
        }
      }
    },
    {
      method: 'GET',
      path: '/toggle-video',
      config: {
        pre: [
          { method: AppleScript.getActiveWindowTitle, assign: 'activeWindowTitle' },
          [
            { method: AppleScript.toggleYoutubeVideo, assign: 'resultYoutube' },
            { method: AppleScript.toggleVLCVideo, assign: 'resultVlc' }
          ]
        ],
        handler: function(request, reply) {
          if (request.pre.resultYoutube.success) {

            reply({
              result: request.pre.resultYoutube,
              title: request.pre.activeWindowTitle
            });
          } else if (request.pre.resultVlc.success) {

            reply({
              result: request.pre.resultVlc,
              title: request.pre.activeWindowTitle
            });
          } else {

            reply({ result: false });
          }
        }
      }
    },
    {
      path: '/decrease-volume', method: 'GET',
      config: {
        pre: [
          { method: AppleScript.decreaseVolume, assign: 'volume' }
        ],
        handler: function(request, reply) {

          reply({ volume: request.pre.volume });
        }
      }
    },
    {
      path: '/increase-volume', method: 'GET',
      config: {
        pre: [
          { method: AppleScript.increaseVolume, assign: 'volume' }
        ],
        handler: function(request, reply) {

          reply({ volume: request.pre.volume });
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