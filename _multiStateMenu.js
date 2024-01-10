//var comp;


function onLoad(evt){
    _multiState = new _multiStateMenu;
    function _multiStateMenu()
    {
        var myValue = new valueObject;
    
    this.multiStateMenuChange = function(evt){
        var comp = evt.getCurrentTarget();
        var val = evt.getValue();
        var	fbn = evt.getTarget().getFullBindName();
        var pnts2show = +comp.getAttribute("pnts2show");
        myValue.init(comp, pnts2show);	
        myValue.changeValue(val,fbn);
    }
    
    this.multiStateMenuClick = function(evt)
    {
        //Place on top
        var comp = evt.getCurrentTarget();
        currentObject = evt.getCurrentTarget();
        currentObject.getParentNode().appendChild(currentObject);
    
        var btn = parseInt(evt.getButton());
        console.log("bitton" + btn)
        if(btn === 0){
            var xPos = evt.getCurrentTargetX();
            var yPos = evt.getCurrentTargetY();
            console.log("ypos" + yPos)
            myValue.clicked(btn,xPos,yPos);
        }
    }
    
    this.multiStateMenuDown =function(evt){
        var comp = evt.getCurrentTarget();
        var btn = parseInt(evt.getButton());
        if(btn === 0){
            var xPos = evt.getCurrentTargetX();
            var yPos = evt.getCurrentTargetY();	
            myValue.down(btn,xPos,yPos);
        }
    }
    
    
    function valueObject() {
        var node;
        var valueBind;
        var value;
        var text;
        var valueList = [];
        var menuButton;
        var arrow;
        var menuGroup;
        var myMenu = new menuObject;
        this.init = function(comp, pnts2show) {
            node = comp;
            //get binds
            var bindGroup = node.getChildByName("binds");
            if(bindGroup != null) {
                var bindList = bindGroup.getElementsByTagName("Bind").item(0);
                if(bindList != null) {
                    valueBind = bindList.getFullBindName();
                }
            }
            //get display objects
            var displayGroup = node.getChildByName("display");
            if(displayGroup != null) {
                var point = displayGroup.getChildByName("MultiPoint");
                if(point != null) {
                    var i = 0;
                    while(point.hasAttribute("State" + i)) {
                        valueList[i] = point.getAttribute("State" + i);
                        i++;
                    }
                    var display = point.getChildByName("display");
                    if(display != null) {
                        menuButton = display.getChildByName("menuButton");
                        arrow = display.getChildByName("arrow");
                        text = display.getChildByName("foreground");
                    }
                }
                //get menu items
                menuGroup = displayGroup.getChildByName("menu");
                if(menuGroup != null) {
                    myMenu.init(menuGroup, pnts2show);
                }
            }
            setSize();
        }
        this.changeValue = function(val, fbn) {
            if(fbn === valueBind) {
                //value = getBool(val);
                value = parseInt(val);
            }
            renderPoint();
        }
        this.clicked = function(btn, xPos, yPos) {
            console.log("myvaluecliclked")
            if(btn === 0) {
                if(xPos < 80 && (yPos >= 20 && yPos < 40)) {
                    if(valueBind != null) {
                        invoke(valueBind, "EditProperties");
                    }
                }
                if(yPos > 40) {
                    var val = myMenu.click(yPos);
                    if(val != -99) {
                        value = val
                    }
                    closeMenu();
                    if(valueBind != null) {
                        setValue(valueBind, value);
                    }
                    renderPoint();
                }
            }
        }
        this.down = function(btn, xPos, yPos) {
            if(btn === 0) {
                if(xPos >= 80 && (yPos >= 20 && yPos < 40)) {
                    if(menuGroup != null) {
                        if(menuGroup.getAttribute("Visibility") == "Visible") {
                            closeMenu();
                        }
                        else {
                            openMenu();
                        }
                    }
                }
            }
        }
        var openMenu = function() {
            myMenu.open();
            if(menuButton != null) {
                var lg = menuButton.getElementsByTagName("LinearGradient").item(0);
                if(lg != null) {
                    var gs0 = lg.getElementsByTagName("GradientStop").item(0);
                    var gs1 = lg.getElementsByTagName("GradientStop").item(1);
                    if(gs0 != null) {
                        gs0.setAttribute("Color", "#626469");
                    }
                    if(gs1 != null) {
                        gs1.setAttribute("Color", "#626469");
                    }
                }
            }
            if(arrow != null) {
                arrow.setAttribute("Fill", "#FFFFFF");
            }
        }
        var setSize = function() {
            node.setAttribute("Height", myMenu.height);
            node.setAttribute("ContentHeight", myMenu.height);
        }
        var closeMenu = function() {
            console.log("kurwa");
            myMenu.close();
            if(menuButton != null) {
                var lg = menuButton.getElementsByTagName("LinearGradient").item(0);
                if(lg != null) {
                    var gs0 = lg.getElementsByTagName("GradientStop").item(0);
                    var gs1 = lg.getElementsByTagName("GradientStop").item(1);
                    if(gs0 != null) {
                        gs0.setAttribute("Color", "#FCFCFC");
                    }
                    if(gs1 != null) {
                        gs1.setAttribute("Color", "#DEDFE0");
                    }
                }
            }
            if(arrow != null) {
                arrow.setAttribute("Fill", "#626469");
            }
        }
        var renderPoint = function() {
            if(text != null) {
                text.setAttribute("Content", getDisplayText());
            }
        }
        var getDisplayText = function() {
            try {
                var str = "...";
                if(!isNaN(value) && value != Infinity) {
                    for(var i = 0; i < valueList.length; i++) {
                        if(value === i) {
                            str = valueList[i];
                        }
                    }
                }
                return str;
            }
            catch (ex) {
                return "...";
            }
        }
        var getBool = function(val) {
            var trueEnum = ["1", "true", "True", "Active", "active", 1, true];
            for(var i = 0; i < trueEnum.length; i++) {
                if(val == trueEnum[i]) {
                    return 1;
                }
            }
            return 0;
        }
    }
    
    function menuObject() {
        //public properties
        this.height;
        //private properties
        var node;
        var menuItems = [];
        var bgd;
        this.init = function(comp, pnts2show) {
            node = comp;
            console.log("menuobjectchuj")
            console.log("items " + menuItems)
            var menuDisplay = node.getChildByName("display");
            if(menuDisplay != null) {
                bgd = menuDisplay.getChildByName("bgd");
            }
            var menuList = node.getElementsByTagName("Component");
            if(menuList != null) {
                for(var i = 0; i < pnts2show; i++) { //menuList.length;i++){ :: 2014-07-28 Benji
                    menuItems[i] = new menuItemObject;
                    menuItems[i].init(menuList.item(i), i);
                }
            }
            //set size of menu
            this.height = (pnts2show + 1) * 20; //(menuList.length+1)*20; :: 2014-07-28 Benji
            if(bgd != null) {
                bgd.setAttribute("Height", this.height);
            }
        }
        this.open = function() {
            console.log("thisopen" + node)
            node.setAttribute("Visibility", "Visible");
        }
        this.close = function() {
            node.setAttribute("Visibility", "Hidden");
        }
        this.click = function(yPos) {
            console.log("thiclick" +menuItems)
            for(var i = 0; i < menuItems.length; i++) {
                if(yPos >= (i + 2) * 20 && yPos < (i + 3) * 20) {
                    return i;
                }
            }
            return -99;
        }
    }
    
    function menuItemObject() {
        var node;
        var index;
        this.init = function(comp, i) {
            node = comp;
            index = i;
            node.setAttribute("Top", (index + 2) * 20);
            node.setAttribute("Left", 0);
        }
    }
    }
    }