//Pobierz jednostkę i wartość z EBO

function onLoad(evt)
{
	_getValueUnit = function(evt, trueText)
	{
		//zmienne wspólne
		var comp;
		var compParent;
		var offColor;
		var onColor;
		var status;
		var outline;

		comp = evt.getCurrentTarget();
		compParent=comp.getParentNode();
		offColor=compParent.getChildByName("background").getAttribute("Stroke");
		onColor=evt.getCurrentTarget().getAttribute("Color");
		value = evt.getValue();
        status = parseInt(evt.getStatus());
		outline = compParent.getChildByName("background");

        //sprawdzenie czy to component wyswietlajacy liczbe, czy wartośc typu on/off
        if(compParent.getAttribute(trueText) != "")
        {
            displayString(evt, compParent, offColor, onColor); 
        }
        else
        {
            displayNumber(evt, compParent);
        }
        
        //zmiana kolory ramki dla zaforsowania/błedu itd
		if (status == 2){
			outline.setAttribute("Stroke", offColor);
			outline.setAttribute("StrokeWidth", "1");
		}
		else{
			outline.setAttribute("Stroke", borderCol(status, compParent));
			outline.setAttribute("StrokeWidth", "2");
		}
	}

    //funkcja wyswietlania wartosci liczbowych
	function displayNumber(evt, compParent)
	{
        var value = evt.getValue();
        var dec = compParent.getAttribute("Decimals");
		var units = evt.getUnit();
		compParent.getChildByName("Text").setAttribute("Content", getDisplayText(value, units, dec));
	}
	
    //funkcaj wyswietlania tekstu
	function displayString(evt, compParent, offColor, onColor)
	{
		//zmienne do stringa
		var onText;
		var offText;
		var onValue;
        var tempCol = "";
        var value = evt.getValue();

        onText = compParent.getAttribute("OnText");
	    offText = compParent.getAttribute("OffText");
		onValue = buildArray(compParent.getAttribute("OnValue").split(','));
		
		if (isNumber(value)) value = Math.round(value);
		if (Bool(value, onValue)){
			compParent.getChildByName("Text").setAttribute("Content", onText);
			tempCol = onColor;
		}
		else{
			compParent.getChildByName("Text").setAttribute("Content", offText);
			tempCol = offColor;
		}
	}	

	function borderCol(status, compParent){
        var f=compParent.getAttribute("Fill");
		var d=compParent.getAttribute("Stroke");
		var a=compParent.getAttribute("Color");
		
        if(status==3){
			return f
		}
		else{
			if(status==1){
				return d
			}
			else{
				return a
			}
		}
	}

    //co ma być wyświetlone w przypadku wartości liczbowej
	function getDisplayText(value, units, dec){
		try{		
			var str = "...";
			if(!isNaN(value) && value != Infinity){
				str = new Number(value).toFixed(dec);
				str += " " + units;
			}
			return str;
		}
		catch(ex){
			return "..." + units;
		}
	}

    //czy wartość to Bool
	function Bool(val, onValue){
		for (var i=0;i<onValue.length;i++){
			if(String(val).toLowerCase() == String(onValue[i]).toLowerCase())
			{
				return true;
			}
		}
		return false;
	}

    //tworzenie tablicy wartości deklarujących jako ON/TRUE
	function buildArray(ArrayOnValue){
		var rtnArray = new Array();

		for (var i=0;i<ArrayOnValue.length;i++){
			if (ArrayOnValue[i].substring(0,1) == " "){
				ArrayOnValue[i] = ArrayOnValue[i].substring(1, ArrayOnValue[i].length);
			}
			if (isNumber(ArrayOnValue[i]) || ArrayOnValue[i]=="true" || ArrayOnValue[i]=="false" ){
				rtnArray[i] = ArrayOnValue[i]
			}
			else{
				rtnArray[i] =ArrayOnValue[i];
			}
		}
		return rtnArray;
	}

	function isNumber (o) {
		return ! isNaN (o-0) && o != null;
	}
}