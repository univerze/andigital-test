/**
 * Created by rolandbecsi on 08/03/16.
 */
define(['json!/config/config.json', '/models/venue.js', '/collections/venues.js', 'text!/templates/itemTemplate.html'], function(config, venueModel, venueCollection, itemTemplate) {
    'use strict';

    var mainView = Backbone.View.extend({
        events: {
            'click .btn-search': 'search',
            'click .carousel-control': 'highlightMarker'
        },

        template: _.template(itemTemplate),

        initialize: function() {
            _.bindAll(this, 'render', 'search', 'addMarker');

            // create an array for the markers
            this.markers = [];

            // init model and collection
            this.model = new venueModel();
            this.collection = new venueCollection({
                model: this.model
            });

            this.collection.on('add', this.addMarker);

            this.render();
        },

        render: function() {
            // init the google map on page load
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: config.maps.lat,
                    lng: config.maps.lng
                },
                zoom: 11,
                scrollwheel: false
            });
        },

        search: function() {
            var _this = this;
            var query = this.$el.find('input.location').val();
            if ($.trim(query) !== '') {
                this.reset();
                this.collection.fetch({
                    data: {
                        near: query
                    }
                }).then(function() {
                    _this.controls(true);
                    // redefine the boundaries of the map on search
                    var sw = new google.maps.LatLng(_this.collection.bounds.sw.lat, _this.collection.bounds.sw.lng);
                    var ne = new google.maps.LatLng(_this.collection.bounds.ne.lat, _this.collection.bounds.ne.lng);
                    var bounds = new google.maps.LatLngBounds(sw, ne);
                    _this.map.fitBounds(bounds);
                });
            }
        },

        addMarker: function(model) {
            var data = model.toJSON();
            // get the first photo of the venue
            var firstPhoto = data.venue.photos.groups[0] && data.venue.photos.groups[0].items[0];
            if (firstPhoto) {
                data.image = firstPhoto.prefix + '700x700' + firstPhoto.suffix;
            }

            // create marker
            var marker = new google.maps.Marker({
                position: {
                    lat: data.venue.location.lat,
                    lng: data.venue.location.lng
                },
                map: this.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });

            this.markers.push(marker);

            // mark the first item active
            data.active = false;
            data.index = this.collection.indexOf(model);
            if (data.index === 0) {
                data.active = true;
            }

            // add the carousel item
            this.$el.find('#content .carousel-inner').append(this.template({data: data}));
        },

        highlightMarker: function() {
            _.each(this.markers, function(m) {
                m.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            });
            var index = this.$el.find('.carousel .active').attr('data-marker');
            this.markers[index].setIcon({url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'});
        },

        reset: function() {
            this.collection.reset();
            this.markers = [];
            this.$el.find('#content .carousel-inner').html('');
            _.each(this.markers, function(m) {
                m.setMap(null);
            });
        },

        controls: function(show){
            this.$el.find('.carousel-control').toggleClass('hidden', !show);
        }
    });

    new mainView({
        el: '#container'
    });
});