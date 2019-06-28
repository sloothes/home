//  menu-list.js

    var list = {

        "Menu": {

            "Sex": [
                ["Male", "/gender/male"],
                ["Female", "/gender/female"],
            ],

            "Actions": [
                ["Idle", "/action/idle"],
                ["Walk", "/action/walk"],
                ["Run",  "/action/run"],
                ["Jump", "/action/jump"],
            ],

            "Controls": [
                ["Left",  "/turn/left"],
                ["Back",  "/turn/back"],
                ["Right", "/turn/right"],
                ["Front", "/turn/front"],
            ],

            "Outfit": [
                ["Hairs", "/outfit/hairs"],
                ["Stockings", "/outfit/hairs"],
                ["Underwears", "/outfit/underwears"],
                ["Costume", "/outfit/costume"],
                ["Tshirt", "/outfit/tshirt"],
                ["Trousers", "/outfit/trousers"],
                ["Dress", "/outfit/dress"],
                ["Shoes", "/outfit/shoes"],
            ],

        /*
            "Users": [
                ["Login", "/user/login"],
                ["Signup", "/user/signup"],
                ["Logout", "/user/logout"],
            ],
        */

        },
    };

    var pages = {};
    for ( var section in list ) {
        pages[ section ] = {};
        for ( var category in list[ section ] ) {
            pages[ section ][ category ] = {};
            for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {
                var page = list[ section ][ category ][ i ];
                pages[ section ][ category ][ page[ 0 ] ] = page[ 1 ];
            }
        }
    }
