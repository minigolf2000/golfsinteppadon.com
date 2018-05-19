/**
 * jquery-paintable jQuery plugin
 * Make an HTML <canvas> paintable
 *
 * By Golf Sinteppadon
 * https://github.com/MiniGolf2000/jquery-paintable
 */
(function($) {
    $.fn.paintable = function(method) {

        methods = {
            /**
             * Undo the last stroke
             */
            undo: function() {
                return this.each(function() {
                    var undoStack = $(this).data('undoStack');
                    if (undoStack.length > 1) {
                        undoStack.shift();
                        this.getContext("2d").putImageData(undoStack[0], 0, 0);
                    }
                });
            },

            /**
             * Save the canvas image
             */
            save: function() {
                return this.each(function() {
                    window.open(this.toDataURL());
                });
            },

            /**
             * Set an option
             * 
             * @param key string the key of the option to set
             * @param value string the value of the option to set
             */
            option: function(key, value) {
                if (!value) {
                    return this.data('options')[key];
                }
                return this.each(function() {
                    var options = {};
                    options[key] = value; // Set options[key], not options.key which actually names it 'key'
                    $(this).paintable('options', options);
                });
            },
            
            /**
             * @param options map map of options to set
             */
            options: function(options) {
                return this.each(function() {
                    $(this).data('options', $.extend($(this).data('options'), options));
                    
                    var ctx = this.getContext("2d");
                    ctx.strokeStyle = ctx.fillStyle = $(this).data('options').color;
                    ctx.lineWidth = $(this).data('options').width;
                    $(this).css('cursor', $(this).data('options').cursor);
                });
            },

            /**
             * Initialize the jquery-paintable canvas
             * 
             * @param options map optional map of options to set
             */
            init: function(options) {
                var _ = {
                    self: null,
                    ctx: null,
                    dragging: false,
                    oldCoords: {x: 0, y: 0},

                    mousedown: function(e) {
                        _.dragging = true;

                        _.ctx.arc(e.pageX - $(_.self).offset().left, // x
                                  e.pageY - $(_.self).offset().top, // y
                                  $(this).data('options').width / 2, // radius
                                  0, // startAngle
                                  Math.PI * 2, // endAngle
                                  false // anticlockwise
                        );
                        _.ctx.fill();
                    },

                    mouseup: function() {
                        if (_.dragging) {
                            _.dragging = false;
                            $(_.self).data('undoStack').unshift(_.ctx.getImageData(0, 0, _.self.width, _.self.height));
                        }
                    },

                    mousemove: function(e) {
                        var coords = {x: e.pageX - $(_.self).offset().left, y: e.pageY - $(_.self).offset().top};
                        _.ctx.beginPath();
                        _.ctx.moveTo(_.oldCoords.x, _.oldCoords.y);
                        if (_.dragging) {
                            _.ctx.lineTo(coords.x, coords.y);
                            _.ctx.stroke();
                        }
                        _.oldCoords = coords;
                    },
                };

                return this.each(function() {
                    if (!this.getContext) {
                        console.error('$(this).getContent not found - element is not a canvas or browser does not support <canvas>');
                        return;
                    }

                    _.self = this;
                    
                    // Setup canvas
                    _.ctx = this.getContext("2d");
                    _.ctx.lineCap = "round";

                    // Setup listeners
                    $(this).on('mousedown', _.mousedown);
                    $(document).on('mouseup', _.mouseup);
                    $(document).on('mousemove', _.mousemove);
                    $(document).mousemove(); // initialize _.oldCoords

                    // Setup undoStack
                    var emptyImageData = _.ctx.getImageData(0, 0, _.self.width, _.self.height);
                    $(this).data('undoStack', [emptyImageData]);
                    
                    var defaultOptions = {
                        color: 'black',
                        width: '1.5',
                        cursor: 'crosshair'
                    }
                    $(this).paintable('options', $.extend(defaultOptions, options));
                });
            }
        };

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.paintable');
        }

    };
})(jQuery);