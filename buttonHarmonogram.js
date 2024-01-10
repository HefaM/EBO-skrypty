var component;
var currentValue = 0;
var waitState = 0;
var target;

function onLoad(evt)
{
  component = evt.getCurrentTarget();
  target = String(component.getAttribute("Target")).toLowerCase().charAt(0);
}
function onMouseClick(evt)
{
  if(evt.getButton() != 0) return;
}

function down(evt)
{
  if(evt.getButton() != 0) return;

  var component = evt.getCurrentTarget();
  var color = component.getAttribute("Push");
  component.getChild("Edge").setAttribute("Visibility", "Visible");
}

function up(evt)
{
  if(evt.getButton() != 0) return;

  var component = evt.getCurrentTarget();
  component.getChild("Edge").setAttribute("Visibility", "Hidden");

  switch(target){
    case "n":
        // new window            
        var linkname = evt.getCurrentTarget().getElementsByTagName("Link").item(0).getFullBindName();
        invoke(linkname,"OpenInNewWindow");	
        break;
        
    case "f":
        // floating window    
        var t = evt.getCurrentTarget();
        
        var WinTop = t.getAttribute("WindowTop");
        var WinLeft = t.getAttribute("WindowLeft");   
        var WinHeight = t.getAttribute("WindowHeight");
        var WinWidth = t.getAttribute("WindowWidth");

        var linkname = evt.getCurrentTarget().getElementsByTagName("Link").item(0).getFullBindName();
        invoke(linkname,"OpenInFloatingWindow Width=" + WinWidth + "| Height=" + WinHeight + "| Top=" + WinTop + "| Left=" + WinLeft +"| ShowToolBar=Yes");		            
        break;
        
    default:
        // new window            
        var linkname = evt.getCurrentTarget().getElementsByTagName("Link").item(0).getFullBindName();
        invoke(linkname,"OpenInSelf");	
        break;
  }		
}

function out(evt)
{
  var component = evt.getCurrentTarget();
  component.getChild("Hover").setAttribute("Visibility", "Hidden");
  component.getChild("Edge").setAttribute("Visibility", "Visible");
}

function over(evt)
{
var component = evt.getCurrentTarget();
  component.getChild("Hover").setAttribute("Visibility", "Visible");
  component.getChild("Edge").setAttribute("Visibility", "Hidden");
}