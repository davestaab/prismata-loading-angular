'use strict';

/**
 * @ngdoc directive
 * @name prismataLoadingApp.directive:loading
 * @description
 * # loading
 */
angular.module('prismataLoadingApp')
  .directive('prismataLoading', function ($interval, $log) {

    //by davestaab
    //ActionScript -> Javascript by CelestialWalrus ( https://np.reddit.com/r/gifs/comments/2on8si/connecting_to_server_so_mesmerizing/cmow0sz )
    //Original code by /u/Elyot ( http://reddit.com/user/Elyot )
    //


    var SCALE = 2;
    var BALL_RADIUS = 2 * SCALE;
    var BALL_SPACING = 3 * SCALE;
    var NUM_BALL = 24; //canvas.width/(BALL_RADIUS+BALL_SPACING);
    var BALL_HEIGHT = 40 * SCALE; //canvas.height;
    var MAX_FPS = 80;

    var BACKGROUND = '#FFFFFF';
    var FOREGROUND = '#0B5F95';

    //document.body.style.background = BACKGROUND;

    //setInterval(animateBalls, 1000/MAX_FPS);

    return {
      //template: '<canvas id="prismata-loading" width="250" height="100" />',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var canvas = element[0];
        $log.debug('element', element, attrs);
        var background = attrs.background || BACKGROUND;
        var foreground = attrs.foreground || FOREGROUND;
        var gfx = canvas.getContext('2d');
        gfx.imageSmoothingEnabled = false;
        gfx.mozImageSmoothingEnabled = false;
        var timeStep = 0;


        function getY(i, t) {
          return BALL_RADIUS + BALL_HEIGHT/2 * (1 + Math.sin((t * (i/500 + 0.02)) % 2*Math.PI));
        }

        function animateBalls() {
          gfx.fillStyle = background;
          gfx.fillRect(0,0,canvas.width, canvas.height);
          gfx.fillStyle = foreground;
          for (var i = 0; i < NUM_BALL; i++ )
          {
            gfx.beginPath();
            gfx.arc(BALL_RADIUS + (BALL_RADIUS+BALL_SPACING)*i, getY(i,timeStep), BALL_RADIUS, 0, 2 * Math.PI, false);
            gfx.fill();
          }
          timeStep++;
        }

        var promise = $interval(animateBalls, 1000/MAX_FPS);
      }
    };
  });
