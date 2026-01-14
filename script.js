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
        a.textContent = h3.textContent.replace(new RegExp(`^Module ${index+1}:\s*`), ''); // removes "module x" fromt the link. Regexp is the constructor for regex.

        li.appendChild(a);
        sidebarList.append(li);
    })
}

async function writeContent() { // --> Promise
    const content = document.getElementById("content");
    const response = await fetch("content.txt"); // ==> promise<Response>
    const text = await response.text();
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

function onLoaded() {
    writeContent()
    .then(createNavigationLinks);
}

document.addEventListener("DOMContentLoaded", onLoaded); // fires when the HTML document has been completely loaded and parsed, so basically on start

/*
               ~~ notes ~~
obj.appendChild(childElement) ==> similar to "child.Parent = Instace".  Sends child to bottom

regex:
/ /  ==> literal
^ ==> start of string
+ ==> one or more
\s ==> whitespace
* ==> zero or more

*/