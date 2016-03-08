/**
 * Created by rolandbecsi on 08/03/16.
 */
requirejs.config({
    baseUrl: '/assets',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone-min',
        text: '../bower_components/requirejs-plugins/lib/text',
        json: '../bower_components/requirejs-plugins/src/json',
        async: '../bower_components/requirejs-plugins/src/async'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});
/**
 * Load the required libs for the app and then boot up
 */
define(['jquery','bootstrap', 'underscore', 'backbone', 'async!http://maps.google.com/maps/api/js?sensor=false'], function($, _, Backbone){
    requirejs(['views/mainView.js']);
});
