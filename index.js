//  home/index.js

var viewer = document.getElementById( "viewer" );
var SceneWindow = viewer.contentWindow;
var SceneDocument = viewer.contentDocument;

$(viewer.contentWindow).on("load", function(){

    MW = this.MW;
    THREE = this.THREE;
    scene = this.scene;
    camera = this.camera;
    renderer = this.renderer;
    localPlayer = this.localPlayer;
    cameraControls = this.cameraControls;
    keyInputControls = this.keyInputControls;

});

(function(){

    var interval;
    var msec = 250;

    const Run   = nameCategoryMap["Run"];
    const Idle  = nameCategoryMap["Idle"];
    const Walk  = nameCategoryMap["Walk"];
    const Jump  = nameCategoryMap["Jump"];
    const Left  = nameCategoryMap["Left"];
    const Back  = nameCategoryMap["Back"];
    const Right = nameCategoryMap["Right"];
    const Front = nameCategoryMap["Front"];

    const Male = nameCategoryMap["Male"];
    const Female = nameCategoryMap["Female"];
    const Hairs = nameCategoryMap["Hairs"];
    const Stockings = nameCategoryMap["Stockings"];
    const Underwears = nameCategoryMap["Underwears"];
    const Costume = nameCategoryMap["Costume"];
    const Tshirt = nameCategoryMap["Tshirt"];
    const Trousers = nameCategoryMap["Trousers"];
    const Dress = nameCategoryMap["Dress"];
    const Shoes = nameCategoryMap["Shoes"];

    var Signal = signals.Signal;
    var actionClicked = new Signal();
    var menuItemClicked = new Signal();

    function isWalking(){
        return viewer.contentWindow.localPlayer.controller.isRunning && viewer.contentWindow.localPlayer.controller.isWalking; // danger!
    }

    function isRunning(){
        return viewer.contentWindow.localPlayer.controller.isRunning && !viewer.contentWindow.localPlayer.controller.isWalking; // danger!
    }

    function dispatchIdleAction(){
        actionClicked.dispatch("/action/idle");
    }

    function dispatchWalkAction(){
        if ( isWalking() ) 
            actionClicked.dispatch("/action/idle");
        else 
            actionClicked.dispatch("/action/walk");
    }

    function dispatchRunAction(){
        if ( isRunning() ) 
            actionClicked.dispatch("/action/idle");
        else 
            actionClicked.dispatch("/action/run");
    }

    function dispatchJumpAction(){
        $(Jump.element).off("click");
        actionClicked.dispatch("/action/jump");
    }

    $(viewer.contentWindow).on("load", function(){
        this.localPlayer.controller.addEventListener("endJumping", function(){
            $(Jump.element).on("click", dispatchJumpAction);
        });
    });

    actionClicked.add(function(data){

        if (window.socket){

            $(Run.element).off("click", dispatchRunAction);  
            $(Walk.element).off("click", dispatchWalkAction);  
            $(Idle.element).off("click", dispatchIdleAction);

            socket.publish(localPlayerChannel, data, function(err){
                if (err) console.error(err);
                $(Run.element).on("click", dispatchRunAction);
                $(Walk.element).on("click", dispatchWalkAction);
                $(Idle.element).on("click", dispatchIdleAction);
            });

        } else {

            viewer.contentWindow.localPlayerHandler(data);

        }

    });

    $(Run.element).on("click", dispatchRunAction);
    $(Walk.element).on("click", dispatchWalkAction);
    $(Idle.element).on("click", dispatchIdleAction);
    $(Jump.element).on("click", dispatchJumpAction);

    menuItemClicked.add(function(data){
        if ( window.socket ) 
            socket.publish(localPlayerChannel, data);
        else 
            viewer.contentWindow.localPlayerHandler(data);
    });

    $(Male.element).on("click", function(){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/gender/male");
        }, msec);
    });

    $(Female.element).on("click", function(){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/gender/female");
        }, msec);
    });

    $(Left.element).on("click", function (){
        menuItemClicked.dispatch("/turn/left");
    });

    $(Back.element).on("click", function (){
        menuItemClicked.dispatch("/turn/back");
    });

    $(Right.element).on("click", function (){
        menuItemClicked.dispatch("/turn/right");
    });

    $(Front.element).on("click", function (){
        menuItemClicked.dispatch("/turn/front");
    });

    $(Hairs.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/hairs");
        }, msec);
    });

    $(Stockings.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/stockings");
        }, msec);
    });

    $(Underwears.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/underwears");
        }, msec);
    });

    $(Costume.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/costume");
        }, msec);
    });

    $(Tshirt.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/tshirt");
        }, msec);
    });

    $(Trousers.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/trousers");
        }, msec);
    });

    $(Dress.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/dress");
        }, msec);
    });

    $(Shoes.element).on("click", function (){
        clearTimeout(interval);
        interval = setTimeout(function(){
            menuItemClicked.dispatch("/outfit/shoes");
        }, msec);
    });

})();
