//Pobierz jednostkę i wartość z EBO

function onLoad(evt)
{
	//zmienne do liczb
	var dec;
	var units;
	//zmienne wspólne
	var comp;
	var compParent;
	var offColor;
	var onColor;
	var f;
	var d;
	var a;
	var status;
	var outline;
	var value;
	//zmienne do stringa
	var onText;
	var offText;
	var onValue;
	var rtnArray = new Array();

	_getValueUnit = function(evt, trueText)
	{
		comp = evt.getCurrentTarget();
		compParent=comp.getParentNode();
		offColor=compParent.getChildByName("background").getAttribute("Stroke");
		onColor=evt.getCurrentTarget().getAttribute("Color");
		f=compParent.getAttribute("Fill");
		d=compParent.getAttribute("Stroke");
		a=compParent.getAttribute("Color");
		dec = compParent.getAttribute("Decimals");
		value = evt.getValue();
        status = parseInt(evt.getStatus());
		outline = compParent.getChildByName("background");

        //sprawdzenie czy to component wyswietlajacy liczbe, czy wartośc typu on/off
        if(compParent.getAttribute(trueText) != "")
        {
            displayString(); 
        }
        else
        {
            displayNumber(evt);
        }
        
        //zmiana kolory ramki dla zaforsowania/błedu itd
		if (status == 2){
			outline.setAttribute("Stroke", offColor);
			outline.setAttribute("StrokeWidth", "1");
		}
		else{
			outline.setAttribute("Stroke", borderCol(status));
			outline.setAttribute("StrokeWidth", "2");
		}
	}

    //funkcja wyswietlania wartosci liczbowych
	function displayNumber(evt)
	{
		units = evt.getUnit();
		compParent.getChildByName("Text").setAttribute("Content", getDisplayText(value, units, dec));
	}
	
    //funkcaj wyswietlania tekstu
	function displayString()
	{
        onText = compParent.getAttribute("OnText");
	    offText = compParent.getAttribute("OffText");
		onValue = buildArray(compParent.getAttribute("OnValue").split(','));
		var tempCol = "";
		if (isNumber(value)) value = Math.round(value);
		if (Bool(value)){
			compParent.getChildByName("Text").setAttribute("Content", onText);
			tempCol = onColor;
		}
		else{
			compParent.getChildByName("Text").setAttribute("Content", offText);
			tempCol = offColor;
		}
	}	

	function borderCol(status){
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
	function Bool(val){
		for (var i=0;i<onValue.length;i++){
			if(String(val).toLowerCase() == String(onValue[i]).toLowerCase())
			{
				return true;
			}
		}
		return false;
	}

    //tworzenie tablicy wartości deklarujących jako ON/TRUE
	function buildArray(Array){
		for (var i=0;i<Array.length;i++){
			if (Array[i].substring(0,1) == " "){
				Array[i] = Array[i].substring(1, Array[i].length);
			}
			if (isNumber(Array[i]) || Array[i]=="true" || Array[i]=="false" ){
				rtnArray[i] = Array[i]
			}
			else{
				rtnArray[i] =Array[i];
			}
		}
		return rtnArray;
	}

	function isNumber (o) {
		return ! isNaN (o-0) && o != null;
	}
}