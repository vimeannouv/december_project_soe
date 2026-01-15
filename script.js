function createNavigationLinks() {
    const headings = document.querySelectorAll(".content h3");
    const sidebar = document.getElementById("sidebar");
    const sidebarList = document.createElement("ul");

    sidebar.appendChild(sidebarList);
    headings.forEach((h3, index) => {

        if (!h3.id) 
            h3.id = `heading-${index}`; // `${"..."} ==> string template`
        
        console.log(h3.textContent);
        
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = `#${h3.id}`; // hyperlink reference. # means look for element
        a.textContent = h3.textContent.replace(/^Module \d+:\s*/, ''); // removes "module x" fromt the link

        li.appendChild(a);
        sidebarList.append(li);
    })
}

async function writeContent() { // --> Promise
    const content = document.getElementById("content");
    const response = await fetch("content.txt"); // --> promise<Response>
    const text = await response.text(); // await waits for the promise to be resolved
    const lines = text.split('\n');

    lines.forEach(line => {
        let element = null;
        if (line.startsWith("#"))
            element = document.createElement("h3");
        else
            element = document.createElement("p");

        element.textContent = line.replace(/^#+\s*/, '');
        content.appendChild(element);
    });
}

function playNavigationLinkAnimation(ev) {
    const target = ev.target;
    if (target.tagName == "A" && target.parentElement.parentElement.parentElement.id == "sidebar") {
        const li = target.parentElement;

        const referenceElementId = target.getAttribute("href").substring(1); // getAttribute returns #element, using the attribute 'href' outputs the link.
        const h3 = document.getElementById(referenceElementId);

        // play anims
        li.classList.add("link-flash-animation");
        h3.classList.add("content-h3-flash-animation");

        li.addEventListener("animationend", () => li.classList.remove("link-flash-animation"));
        h3.addEventListener("animationend", () => h3.classList.remove("content-h3-flash-animation"));
    }
}

function contentLoaded() {
    writeContent()
    .then(createNavigationLinks);
}

function onClick(ev) {
    playNavigationLinkAnimation(ev)
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

Async: returns a promise

*/