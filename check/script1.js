const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portfolio", label: "Portfolio" },
    { href: "#Contact", label: "Contact" },

]


const sections = navItems.map((item) => {
    const section = document.querySelector(item.href);
    // const section = document.querySelector("#Home");
    // This way it iterate for each class

    //  if element exist
    if (section) {
        return {
            id: item.href.replace("#", ""),
            offset: section.offsetTop,
            // TODO: why 550 ?

            // The offsetTop is read-only javascript property of HTMLElement 'interface'. It return the distance from outer border of current element(including margin) to the top  padding edge of its oddsetParent.
            // The "offsetParent" is closest positioned(an element with a position property other than 'static') ancestor element. if no such ancestor then offset parent will be <body> element. 
            // Example, visit: ./check/my_trial.html


            height: section.offsetHeight
        }
    }

    // else
    return null;

}).filter(Boolean);


console.log("sections:")
console.table(sections)


sections.forEach((section)=>{
    console.log(section.offset);
    
})





const currentPosition = window.scrollY;
console.log(currentPosition);


const active = sections.find((section) =>{

    currentPosition >= section.offset && currentPosition < section.offset + section.height
}
);

console.log("active:")
console.log(active)