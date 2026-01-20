function createNavigationLinks() {
    const headings = document.querySelectorAll(".content .module");
    const sidebar = document.getElementById("sidebar");
    const sidebarList = document.createElement("ul");

    sidebar.appendChild(sidebarList);
    headings.forEach((module, index) => {
        
        const h3 = module.querySelector("h3");
        if (!module.id) 
            module.id = `heading-${index}`; // `${"..."} ==> string template`
        
        console.log(h3.textContent);
        
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = `#${module.id}`; // hyperlink reference. # means look for element
        a.textContent = h3.textContent.replace(/^Module \d+:\s*/, ''); // removes "module x" fromt the link

        li.appendChild(a);
        sidebarList.append(li);
    })
}
function playNavigationLinkAnimation(ev) {
    const target = ev.target;
    if (target.tagName != "A") 
        return
    if (target.parentElement.parentElement.parentElement.id != "sidebar")
        return

    const li = target.parentElement;

    const referenceElementId = target.getAttribute("href").substring(1); // getAttribute returns #element, using the attribute 'href' outputs the link.
    const h3 = document.getElementById(referenceElementId);

    // play anims
    li.classList.add("link-flash-animation");
    h3.classList.add("content-h3-flash-animation");

    li.addEventListener("animationend", () => li.classList.remove("link-flash-animation"));
    h3.addEventListener("animationend", () => h3.classList.remove("content-h3-flash-animation"));
    
}

function sidebarToggle(ev) {
    const target = ev.target;
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar")
    if (!target.classList.contains("toggle-button")) 
        return
    sidebar.classList.toggle("close");
    content.classList.toggle("fill");
    target.classList.toggle("close-mode");
}

function contentLoaded() {
    createNavigationLinks();
}

function onClick(ev) {
    playNavigationLinkAnimation(ev)
    sidebarToggle(ev)
}

document.addEventListener("DOMContentLoaded", contentLoaded); // fires when the HTML document has been completely loaded and parsed, so basically on start
document.addEventListener("click", onClick);
/*
               ~~ notes ~~
obj.appendChild(childElement) ==> similar to "child.Parent = Instace".  Sends child to bottom

regex:
/ /  ==> literal
^ ==> start of string
+ ==> one or more
\s ==> whitespace
* ==> zero or more
\* ==> makes "*" a literal (literal = appears as it is: a string)
g ==> find all instances (flag)
(.*?) ==> capture anything inside 
. ==> any character except new line
? ==> none greedy/lazy, matches as few as possible.

$1 ==> captured group
$& whole matched string
`$`` everything before
$` everything after

[...] ==> spread syntax, turns all into an array
 
Async: returns a promise

*/