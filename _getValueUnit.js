//Pobierz jednostkę i wartość z EBO



function onLoad(evt)
{
	var comp;
		var compParent;
		var dec;
		var value;
		var units;
		var offColor;
		var onColor;
		var f;
		var d;
		var a;
		var status;
		var outline;

	_getValueUnit = function(evt)
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
		units = evt.getUnit();
		status = parseInt(evt.getStatus());
		outline = compParent.getChildByName("background");
		
		compParent.getChildByName("Text").setAttribute("Content", getDisplayText(value, units, dec));
			
		if (status == 2){
			outline.setAttribute("Stroke", offColor);
			outline.setAttribute("StrokeWidth", "1");
		}
		else{
			outline.setAttribute("Stroke", borderCol(status));
			outline.setAttribute("StrokeWidth", "2");
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
}