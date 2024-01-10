function onLoad(evt) {
    _setValueBox = new setValueBox(evt);

    function setValueBox(evt) {
        this.myValue = new valueObject;
		this.initialized = false;
		this.colorWhenClicked = "#626469";
        this.valueChange = function(evt) {
            this.comp = evt.getCurrentTarget();
			if (this.initialized === false){
				this.myValue.init(this.comp);
				this.initialized = true;
			}
            this.val = evt.getValue();
            this.fbn = evt.getTarget().getFullBindName();
            this.myValue.changeValue(this.val, this.fbn);
        }
        this.valueClick = function(evt) {
            evt.preventDefault();
            this.xPos = evt.getCurrentTargetX();
            this.btn = parseInt(evt.getButton());
            this.myValue.clicked(this.btn, this.xPos);
        }
        this.valueDown = function(evt) {
            this.xPos = evt.getCurrentTargetX();
            this.btn = parseInt(evt.getButton());
            this.myValue.down(this.btn, this.xPos);
        }
        this.valueUp = function(evt) {
            this.myValue.up();
        }
        this.valueOut = function(evt) {
            this.myValue.up();
        }

        function valueObject() {
            this.node;
            this.valueBind;
            this.valueBind2;
            this.valueBind3;
            this.valueBind4;
            this.valueBind5;
            this.valueBind6;
            this.valueBind7;
            this.valueBind8;
            this.valueDisp;
            this.textDisp;
            this.units;
            this.decs;
            this.inc = false;
            this.dec = false;
            this.increment;
            this.minusBox;
            this.plusBox;
            this.minus;
            this.plus;
            this.btnLight;
            this.btnDark;
            this.init = function(comp) {
                this.node = comp;
                this.MaxValue = parseFloat(this.node.getAttribute("MaxValue"));
                this.MinValue = parseFloat(this.node.getAttribute("MinValue"));
                //get binds
                this.bindGroup = this.node.getChildByName("binds");
                if(this.bindGroup != null) {
                    this.bindList = this.bindGroup.getElementsByTagName("Bind");
                    var i = 0;
                    if(this.bindList.length >= 1) {
                        this.valueBind = this.bindList.item(i).getFullBindName();
                    }
                    if(this.bindList.length >= 2) {
                        this.valueBind2 = this.bindList.item(i + 1).getFullBindName();
                    }
                    if(this.bindList.length >= 3) {
                        this.valueBind3 = this.bindList.item(i + 2).getFullBindName();
                    }
                    if(this.bindList.length >= 4) {
                        this.valueBind4 = this.bindList.item(i + 3).getFullBindName();
                    }
                    if(this.bindList.length >= 5) {
                        this.valueBind5 = this.bindList.item(i + 4).getFullBindName();
                    }
                    if(this.bindList.length >= 6) {
                        this.valueBind6 = this.bindList.item(i + 5).getFullBindName();
                    }
                    if(this.bindList.length >= 7) {
                        this.valueBind7 = this.bindList.item(i + 6).getFullBindName();
                    }
                    if(this.bindList.length >= 8) {
                        this.valueBind8 = this.bindList.item(i + 7).getFullBindName();
                    }
                }
                //get display objects
                this.displayGroup = this.node.getChildByName("display");
                if(this.displayGroup != null) {
                    this.point = this.displayGroup.getChildByName("AnalogPoint");
                    if(this.point != null) {
                        this.units = this.point.getAttribute("Units");
                        this.decs = this.point.getAttribute("Decimals");
                        this.minusBox = this.point.getChildByName("minusBox");
                        this.plusBox = this.point.getChildByName("plusBox");
                        this.minus = this.point.getChildByName("minus");
                        this.plus = this.point.getChildByName("plus");
                        if(this.minusBox != null) {
                            this.btnLight = this.minusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(0).getAttribute("Color");
                            this.btnDark = this.minusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(1).getAttribute("Color");
                        }
                        this.increment = parseFloat(this.point.getAttribute("Increment"));
                        var display = this.point.getChildByName("display");
                        if(display != null) {
                            this.textDisp = display.getChildByName("foreground");
                        }
                    }
                }
				this.initialized = true; 
            }
            this.changeValue = function(val, fbn) {
                if(fbn === this.valueBind) {
                    this.valueDisp = parseFloat(val);
                }
                this.renderPoint();
            }
            this.clicked = function(btn, xPos) {
                if(btn === 0) {
                    if(xPos <= 20) {
                        this.dec = true;
                        this.changeSpt();
                    }
                    else {
                        if(xPos >= 80) {
                            this.inc = true;
                            this.changeSpt();
                        }
                        else {
                            invoke(this.valueBind, "EditProperties");
                        }
                    }
                }
            }
            this.down = function(btn, xPos) {
                if(btn === 0) {
                    if(xPos <= 20) {
                        this.minusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(0).setAttribute("Color", "#626469");
                        this.minusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(1).setAttribute("Color", "#626469");
                        this.minus.setAttribute("Stroke", "#FFFFFF");
                    }
                    if(xPos >= 80) {
                        this.plusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(0).setAttribute("Color", "#626469");
                        this.plusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(1).setAttribute("Color", "#626469");
                        this.plus.setAttribute("Stroke", "#FFFFFF");
                    }
                }
            }
            this.up = function() {
                this.minusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(0).setAttribute("Color", this.btnLight);
                this.minusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(1).setAttribute("Color", this.btnDark);
                this.plusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(0).setAttribute("Color", this.btnLight);
                this.plusBox.getElementsByTagName("LinearGradient").item(0).getElementsByTagName("GradientStop").item(1).setAttribute("Color", this.btnDark);
                this.minus.setAttribute("Stroke", "#626469");
                this.plus.setAttribute("Stroke", "#626469");
            }
            this.changeSpt = function() {
                if(this.inc) {
                    this.valueDisp += this.increment;
                    if(this.valueDisp > this.MaxValue) {
                        this.valueDisp = this.MaxValue;
                    }
                    else if(this.valueDisp < this.MinValue) {
                        this.valueDisp = this.MinValue;
                    }
                    setValue(this.valueBind, this.valueDisp);
                    setValue(this.valueBind2, this.valueDisp);
                    setValue(this.valueBind3, this.valueDisp);
                    setValue(this.valueBind4, this.valueDisp);
                    setValue(this.valueBind5, this.valueDisp);
                    setValue(this.valueBind6, this.valueDisp);
                    setValue(this.valueBind7, this.valueDisp);
                    setValue(this.valueBind8, this.valueDisp);
                    this.inc = false;
                }
                if(this.dec) {
                    this.valueDisp -= this.increment;
                    if(this.valueDisp < this.MinValue) {
                        this.valueDisp = this.MinValue;
                    }
                    else if(this.valueDisp > this.MaxValue) {
                        this.valueDisp = this.MaxValue;
                    }
                    setValue(this.valueBind, this.valueDisp);
                    setValue(this.valueBind2, this.valueDisp);
                    setValue(this.valueBind3, this.valueDisp);
                    setValue(this.valueBind4, this.valueDisp);
                    setValue(this.valueBind5, this.valueDisp);
                    setValue(this.valueBind6, this.valueDisp);
                    setValue(this.valueBind7, this.valueDisp);
                    setValue(this.valueBind8, this.valueDisp);
                    this.dec = false;
                }
                this.renderPoint();
            }
            this.renderPoint = function() {
                if(this.textDisp != null) {
                    this.textDisp.setAttribute("Content", this.getDisplayTextDisp());
                }
            }
            this.getDisplayTextDisp = function() {
                try {
                    var str = "...";
                    if(!isNaN(this.valueDisp) && this.valueDisp != Infinity) {
                        str = new Number(this.valueDisp).toFixed(this.decs);
                        str += " " + this.units;
                    }
                    return str;
                }
                catch (ex) {
                    return "...";
                }
            }
            var getBool = function(val) {
                if(val == "1" || val == "true" || val === 1 || val === true) {
                    return true;
                }
                return false;
            }
        }
    }
}