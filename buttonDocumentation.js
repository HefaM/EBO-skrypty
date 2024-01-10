var clicked = false;
var popup;
var name;
var layer;

function onLoad(evt)
{
    name = evt.getCurrentTarget().getAttribute("Name");
    popup = evt.getCurrentTarget().getParentNode().getParentNode().getChild(name);
    layer = evt.getCurrentTarget().getParentNode();
}

function onClick(evt)
{
    try{
        var component = evt.getCurrentTarget();
        if (clicked)
            component.getChild("Hover").setAttribute("Visibility", "Hidden");
        else
            component.getChild("Hover").setAttribute("Visibility", "Visible");
            console.log("nok");
        if (popup.getAttribute("Visibility") == "Visible")
            popup.setAttribute("Visibility","Hidden");
        else
            popup.setAttribute("Visibility","Visible");
        clicked = !clicked
    }
    catch(ex){}
    
}


function over(evt)
{
  var component = evt.getCurrentTarget();
  if (clicked != true)
      component.getChild("Hover").setAttribute("Visibility", "Visible");
}
        	
function out(evt)
{
  var component = evt.getCurrentTarget();
  if (clicked != true)
      component.getChild("Hover").setAttribute("Visibility", "Hidden");
      component.getChild("Edge").setAttribute("Fill", "None");
}

function down(evt)
{
  if(evt.getButton() != 0) return;

  var component = evt.getCurrentTarget();
  var color = component.getAttribute("Push");
  component.getChild("Edge").setAttribute("Fill", color);
}
        	
function up(evt)
{
  if(evt.getButton() != 0) return;

  var component = evt.getCurrentTarget();
  component.getChild("Edge").setAttribute("Fill", "None");
}