function onLoad(evt)
{
    var layer = evt.getCurrentTarget();
    var components = layer.getChildNodes();

    for (var i=0; i < components.length; i++)
    {
        if(components.item(i).tagName == "Component")
        {
            console.log(components.item(i).getAttribute("Name"));
        }
    }
}