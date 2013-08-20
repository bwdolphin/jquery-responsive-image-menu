(function( $ ) {

    //********************************************************************************
    //  Methods to be used internally
    //********************************************************************************
    var methods = {
        //********************************************************************************
        //  Method to calculate current percent width value of object to parent container
        //********************************************************************************
        get_percent_width: function (element, options) {
                //allow user to pass an option "parent object" to use here.
                // CAUTION: haven't tested anything other than the direct parent.
                var settings = $.extend({
                    //put defaults here
                    "parent_object": element.parent(),
                }, options );

                //calculate percentage value
                var width = parseFloat(element.css('width'))/parseFloat(settings.parent_object.css('width'));

                //return value as an integer - use floor to avoid rounding issues.
                return Math.floor(100.00*width);
        },
        //********************************************************************************
        //  Method to check how many columns are currently being displayed.
        //  Follows method described here - http://stackoverflow.com/questions/11539113/jquery-find-number-of-items-per-row-in-floated-lis
        //********************************************************************************
        check_columns: function(list_items, num_cols){
            var cols_in_row = 0;

            $(list_items).each(function() {
                if($(this).prev().length > 0) {
                    if($(this).position().top != $(this).prev().position().top) return false;
                    cols_in_row++;
                }
                else {
                    cols_in_row++;
                }
            });
            return num_cols == cols_in_row ? true : false;
        },
        //********************************************************************************
        //  Method to check whether or not items need to be resized.
        //********************************************************************************
        check_resize_needed: function(container, list_items, first_item, settings){
            if(
                //check to make sure we're not trying to set width < 0 to avoid an infinite loop
                methods.get_percent_width(first_item, {parent_object:container}) - 1 > 0 &&
                (
                    //check whether or not the panel height is greater than the parent container still
                    container.parent().height() < container.height() ||

                    //check if the container is the right number of columns yet if the height is already correct
                    (settings.num_cols > 1 && methods.check_columns($(list_items), settings.num_cols) == false)
                )
            ){
                return true;
            }else{
                return false;
            }
        }
    };

    //********************************************************************************
    //  jQuery Responsive Image Menu
    //********************************************************************************
    $.fn.responsiveImageMenu = function(options) {
        return this.each(function(){
            var settings = $.extend({
                //put defaults here
                'num_cols': 1,
                'aspect_ratio': 1,
                'list_tag': 'span'

            }, options );

            //get elements into a local var
            var container = $(this);
            var list_items = $(container).find(settings.list_tag);
            var first_item = $(list_items).first();

            //reset width to 100% when reinitializing
            $(list_items).css("width", "100%");

            //set height to current width using aspect ratio - this is just in case some browsers take time to load an image
            $(list_items).css("height", first_item.width() * settings.aspect_ratio);

            //loop while resize is needed.
            while( methods.check_resize_needed(container, list_items, first_item, settings) ){

                //increment width down by 1%
                $(list_items).css("width", (methods.get_percent_width(first_item, {parent_object:container}) - 1) + "%");

                //set height from width
                $(list_items).css("height", first_item.width() * settings.aspect_ratio);
            }
        });
    };
}( jQuery ));
