/**
 * Created by rolandbecsi on 08/03/16.
 */
define([], function() {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            reasons: {},
            referralId: '',
            tips: [],
            venue: {}
        }
    });
});