//  menu-list.js

    var list = {
        "Menu": {
            "Sex": [
                ["Male", "/gender/male"],
                ["Female", "/gender/female"],
            ],
            "Move": [
                ["Idle", "/action/idle"],
                ["Walk", "/action/walk"],
                ["Run",  "/action/run"],
                ["Jump", "/action/jump"],
            ],
            "Turn": [
                ["Back",  "/turn/back"],
                ["Left",  "/turn/left"],
                ["Right", "/turn/right"],
                ["Front", "/turn/front"],
            ],
            "Slot": [
                ["Body", "/outfit/body"],
                ["Hairs", "/outfit/hairs"],
                ["Stockings", "/outfit/hairs"],
                ["Underwears", "/outfit/underwears"],
                ["Dress", "/outfit/dress"],
                ["Costume", "/outfit/costume"],
                ["Tshirt", "/outfit/tshirt"],
                ["Trousers", "/outfit/trousers"],
                ["Shoes", "/outfit/shoes"],
            ],
            "User": [
                ["Login", "/user/login"],
                ["Signup", "/user/signup"],
                ["Logout", "/user/logout"],
            ],
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