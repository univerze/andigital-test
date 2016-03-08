/**
 * Created by rolandbecsi on 08/03/16.
 */
define(['json!/config/config.json'], function(config) {
    'use strict';

    return Backbone.Collection.extend({
        url: config.foursquare.url,

        /**
         * Override collection fetch to set the default payload
         * @param options
         * @returns {*}
         */
        fetch: function(options) {
            options.data = _.extend((options.data || {}), {
                client_id: config.foursquare.client_id,
                client_secret: config.foursquare.client_secret,
                v: config.foursquare.v,
                redius: config.foursquare.radius,
                limit: 10,
                lat: config.maps.lat,
                lng: config.maps.lng,
                venuePhotos: 1
            });

            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        /**
         * We have to parse the response because it's not conventional
         * @param r
         * @returns {*}
         */
        parse: function(r) {
            if (r.meta.code === 200) {
                this.center = r.response.geocode.center;
                this.bounds = r.response.suggestedBounds;
                return r.response.groups[0].items;
            }
        }
    });
});