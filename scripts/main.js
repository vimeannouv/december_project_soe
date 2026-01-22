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

    const isDescendantOfSidebar = target.parentElement.parentElement.parentElement.id == "sidebar"
    if (!isDescendantOfSidebar)
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

function toggleSidebar(ev) {
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");
    const footer = document.getElementById("footer");
    const toggleButton = document.getElementById("toggle-button"); 
    sidebar.classList.toggle("close");
    footer.classList.toggle("fill");
    content.classList.toggle("fill");
    toggleButton.classList.toggle("close-mode");
}

function sidebarToggleOnButtonPressed(ev) {
    const target = ev.target;
    if (!target.classList.contains("toggle-button")) 
        return
    toggleSidebar(ev);
}

// mobile
function closeSidebarOnLinkPressed(ev) {
    const target = ev.target;
    if (target.tagName != "A") 
        return

    const isDescendantOfSidebar = target.parentElement.parentElement.parentElement.id == "sidebar"
    if (!isDescendantOfSidebar)
        return

    const onMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!onMobile) 
        return
    console.log("hi");
    toggleSidebar(ev);
}

function writeInCodeblock() {
    const pre = document.getElementById("index.html-codeblock");
    const code = document.createElement("code");
    code.className = pre.className
    pre.appendChild(code)

    const endpoint = "/.netlify/functions/github";
    fetch(endpoint)
    .then(res => res.text())
    .then(content => {
        code.textContent = content;
        Prism.highlightElement(code);
    });
}

function onContentLoaded() {
    createNavigationLinks();
    writeInCodeblock();
}

function onClick(ev) {
    playNavigationLinkAnimation(ev);
    sidebarToggleOnButtonPressed(ev);

    // mobile
    closeSidebarOnLinkPressed(ev);
}

document.addEventListener("DOMContentLoaded", onContentLoaded); // fires when the HTML document has been completely loaded and parsed, so basically on start
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