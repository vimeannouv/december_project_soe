function createNavigationLinks() {
    const headings = document.querySelectorAll(".content h3")
    const sidebar = document.getElementById("sidebar")
    const sidebarList = document.createElement("ul")

    sidebar.appendChild(sidebarList)
    headings.forEach((h3, index) => {

        if (!h3.id) {
            h3.id = `heading-${index}` // `${"..."} ==> string template`
        }

        console.log(h3.textContent)
        
        const li = document.createElement("li")
        const a = document.createElement("a")

        a.href = `#${h3.id}` // hyperlink reference
        a.textContent = h3.textContent

        li.appendChild(a)
        sidebarList.append(li)
    })
}

function onLoaded() {
    createNavigationLinks()
}

document.addEventListener("DOMContentLoaded", onLoaded) // fires when the HTML document has been completely loaded and parsed, so basically on start

/*
               ~~ notes ~~
obj.appendChild(childElement) ==> similar to "child.Parent = Instace".  Sends child to bottom

*/