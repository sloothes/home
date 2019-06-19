//  menu-panel.js

var panel = document.getElementById( "panel" );
var viewer = document.getElementById( "viewer" );
var expandButton = document.getElementById( "expandButton" );

expandButton.addEventListener( "click", function ( event ) {
    panel.classList.toggle( "collapsed" );
    event.preventDefault();
});

var filterInput = document.getElementById( "filterInput" );
var clearFilterButton = document.getElementById( "clearFilterButton" );
var DELIMITER = "/";
var MEMBER_DELIMITER = ".";
var nameCategoryMap = {};
var sections = [];

(function(){

    var content = document.getElementById( "content" );

    function layoutList() {
        sections.forEach( function( el ) {
            var collapsed = true;
            Array.prototype.slice.apply( el.children ).forEach( function( item ) {
                if ( !item.classList.contains( "filtered" ) ) {
                    collapsed = false;
                    return;
                }
            });
            if ( collapsed ) {
                el.parentElement.classList.add( "filtered" );
            } else {
                el.parentElement.classList.remove( "filtered" );
            }
        } );
    }

    filterInput.addEventListener( "input", function( e ) {
        updateFilter();
    });

    clearFilterButton.addEventListener( "click", function( e ) {
        filterInput.value = "";
        updateFilter();
        e.preventDefault();
    });

    function updateFilter() {
        var exp = new RegExp( filterInput.value, "gi" );
        for( var j in nameCategoryMap ) {
            var res = nameCategoryMap[ j ].name.match( exp );
            if( res && res.length > 0 ) {
                nameCategoryMap[ j ].element.parentElement.classList.remove( "filtered" );
                var str = nameCategoryMap[ j ].name;
                for( var i = 0; i < res.length; i++ ) {
                    str = str.replace( res[ i ], "<b>" + res[ i ] + "</b>" );
                }
                nameCategoryMap[ j ].element.innerHTML = str;
            } else {
                nameCategoryMap[ j ].element.parentElement.classList.add( "filtered" );
                nameCategoryMap[ j ].element.textContent = nameCategoryMap[ j ].name;
            }
        }
        layoutList();
    }

    function encodeUrl( path ) {
        return path.replace(/\ \/\ /g, ".").replace(/\ /g, "_");
    }

    function decodeUrl( path ) {
        return path.replace(/_/g, " ").replace(/\./g, " / ");
    }

    function goTo( section, category, name, member ) {

        var parts, location;

    //  Fully resolve links that only provide a name.
        if (arguments.length == 1) {
            //  Resolve links of the form "Class.member".
            if (section.indexOf(MEMBER_DELIMITER) !== -1) {
                parts = section.split(MEMBER_DELIMITER)
                section = parts[0];
                member = parts[1];
            }
            location = nameCategoryMap[section];
            if (!location) return;
            section = location.section;
            category = location.category;
            name = location.name;
        }

        var title = `sloothes - ${name}`;
        var url = encodeUrl(section) + DELIMITER + encodeUrl( category ) + DELIMITER + encodeUrl(name) + (!!member ? MEMBER_DELIMITER + encodeUrl(member) : "");

        window.location.hash = url;
        window.document.title = title;
        panel.classList.add( "collapsed" );
    }

    function goToHash() {
        var hash = window.location.hash.substring( 1 ).split(DELIMITER);
        var member = hash[2].split(MEMBER_DELIMITER)
        goTo( decodeUrl(hash[0]), decodeUrl(hash[1]), decodeUrl(member[0]), decodeUrl(member.length > 1 ? member[1] : '') );
    }

    function storeTo( section, category, name, value, member ) {

        var parts, location;

    //  Fully resolve links that only provide a name.
        if (arguments.length == 1) {
            //  Resolve links of the form "Class.member".
            if (section.indexOf(MEMBER_DELIMITER) !== -1) {
                parts = section.split(MEMBER_DELIMITER)
                section = parts[0];
                member = parts[1];
            }

            location = nameCategoryMap[section];
            if (!location) return;
            section = location.section;
            category = location.category;
            name = location.name;
            value = location.value;
        }

    //  var url = encodeUrl(section) + DELIMITER + encodeUrl( category ) + DELIMITER + encodeUrl(name) + (!!member ? MEMBER_DELIMITER + encodeUrl(member) : "");

        store( category, value );
        panel.classList.add( "collapsed" );
    }

    for ( var section in list ) {

        var h2 = document.createElement( "h2" );
        h2.textContent = section;
        content.appendChild( h2 );

        for ( var category in list[ section ] ) {
            var div = document.createElement( "div" );
            var h3 = document.createElement( "h3" );
            h3.textContent = category;
            div.appendChild( h3 );
            var ul = document.createElement( "ul" );
            ul.id = category.toLocaleLowerCase();
            div.appendChild( ul );

            for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {
                var page = list[ section ][ category ][ i ];
                var li = document.createElement( "li" );
                li.id = "menu-item-" + page[0].toLocaleLowerCase();
                var a = document.createElement( "a" );
            //  a.setAttribute( "href", "#" );

                ( function( s, c, p, v ) {
                    a.addEventListener( "click", function( e ) {
                        storeTo( s, c, p, v );
                        e.preventDefault();
                    });
                })( section, category, page[ 0 ], page[ 1 ] );

                a.textContent = page[ 0 ];
                li.appendChild( a );
                ul.appendChild( li );

                nameCategoryMap[page[0]] = {
                    section: section,
                    category: category,
                    name: page[0],
                    value: page[1],
                    element: a,
                };

            }

            content.appendChild( div );
            sections.push( ul );
        }

    }

    panel.appendChild( content );

//  window.addEventListener( "hashchange", goToHash, false );
//  if ( window.location.hash.length > 0 ) goToHash();

})();
