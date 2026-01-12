import React, {useState, useEffect} from "react";
import {Menu, X} from "lucide-react";



const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    // Track UI states like "isOpen"(mobile menu)
    
    const [scrolled, setScrolled] = useState(false);
    // scrolled=true means page is scrolled

    const  [activeSection,setActiveSection] = useState("Home");
    // highlighted active menu from the navbar
    // initially "Home" is highlighted



    const navItems = [
        {href: "#Home", label:"Home"},
        {href: "#About", label:"About"},
        {href: "#Portfolio", label:"Portfolio"},
        {href: "#Contact", label:"Contact"},

    ]
    // Array of Objects that helps in further functionality.


    useEffect(() => {
      const handleScroll = () => {

        // function from scrolled state

        setScrolled(window.scrollY > 20);
        // if scroll more than 20px then scrolled state becomes true otherwise false.
        // This state we will use to change the navbar's background style: trasparent or blur

        // window.scrollY is javascript property.
        // It is readonly. It returns # of pixels doucment is scrolled vertically(Y).
        // Here in our case, we are checking condition means we get true or false.
        // small example: .\ProjectWork\personal_project\1_portfolio\check\twenty_pixel.html

        

        const sections = navItems.map((item)=>{
            // map() is higher order function. It takes another function as argument and Returns a newArray(in our case). actually map() method returns the same collection.
            // loop through each navigation item like Home,About,Portfolio,Contact

            const section = document.querySelector(item.href);
            // it find html element on the page that has that id eg. #Home, #About, etc.


            //  if html element with id #Home, #About, etc. exist
            if(section){
                return {
                    id : item.href.replace("#",""),
                    // id will be the name without the hash(#)


                    // offset: section.offsetTop - 550,
                    offset: item.href === "#Home" ? section.offsetTop : section.offsetTop - 200,

                    // TODO: why 550 ?

                    // offset, refers to a distace of an element from some starting point or another element. 

                    // Defination: The offsetTop is read-only javascript property of HTMLElement 'interface'. It return the distance from outer border of current element(including margin) to the top  padding edge of its offsetParent.
                    // it returns the distance of that element from the top of the page
                    
                    // The About section give distance(in pixels) from the top of the page to where the section starts.
                    // - The About section might start at 1200px from the top of the page.
                    // if we did not subtract anything the Navbar will only highlight "About" when your scroll position actually reaches 1200px(when About actually touches top of screen) But we want like when it show to screen(below navbar exactly) at that time we want to highlight "About" in navbar.
                    // here 550 is navbar height.

                    // 100 - 550 = 650px. That means the highlight "About" in navbar before <section id="#About"> touches(appear) at the top of the screen. This gives smooth and more natural feel 

                    height: section.offsetHeight
                    // return Height of that section 
                }
            }

            // else ( if html element not exist with id e.g. #About )
            return null;

        // })
        }).filter(Boolean);
        /* map() function returns same collection on which the operation is perfrom. Eg. Array.
        It do not modify the original collection and it return completely new one. 
        - But in our case, we explicitly returning either 'JS object' or 'null'. so, it will not return new array.

        ## .filter(Boolean)
            - It is method that takes function as an argument, returns a new array containing elements for which the condition returns truthy value.
            - When you pass "Boolean" The built-in javascript counstructor directly, it acts as callback function. It convert each element to boolean value. 
            - Falsy values for Boolean constructor: false, 0, -0, 0n, "", null, undefined, NaN.

            // Eg.
            const cleanedArray = [1, 'hello', null, 0, 'world', undefined, '', 5, NaN].filter(Boolean);
            output: [1, 'hello', 'world', 5]
        */

        // console.log(sections)               // Array of JS object
        // console.log(typeof sections)        // object

        const currentPosition = window.scrollY;

        const active = sections.find((section) => {
            // console.log("Current section:",section)
        
            console.log("section.offset:",section.offset);

            return currentPosition >= section.offset && currentPosition < section.offset + section.height 
            
            /* 
            Condition in words: Is user's current scroll position inside this section's area ? 
            section.offset: How far the top of that section is from the top of the page.
            and: Only return true, if both are true

            Eg.
            currentPosition = 1300
            section.offset = 1200
            section.height = 800

            - Section starts at 1200px from top.
            - Section ends at 1200 + 800 = 2000px.

            1300 >= 1200  ✅  (Yes, we’re below the top of section)
            1300 < 2000   ✅  (Yes, we haven’t passed the bottom yet)
            ✅ Both true → means we are currently inside that section.

            */ 

            /* Here the condition should return  Boolean value 
                find() method will iterate through all the elements of array
                and return that element which statisfies condition and return true.
                
                In javascript if you create a callback function and add curly brackets "{}"
                then you must need to write "return" keyword without that callback function always returns "undefined"

                Alternatively, though it is single line function you can skip those "{}" and then there will be No need of "return" keyword. 
                I choose this✅
                
            */

            /* 
            When you check this thing in browser dev tools make sure you 'undock' or 'place to right' the devtools otherwise if it is at bottom then intially shows "About" and that feels errogeneous
            */


            /* 
            There is buggie behaviour you may notice
            for Other section it is ok like when the section touch the top of the screen before that 550 px the active will change. but after little bit scroll in Home section it immediately change to About However About just apper on screen from bottom
            
            (In simple words)
            After a little scroll in Home section, it immediately changes to “About” —
            even though About just appeared at the bottom.

            Your threshold "offset - 550" is too early for the first section(i.e. Home)
            When you scroll down a bit and passes "About" so condition trigger soon


            # why this happen
            - No matter what the section is, for all you subtract 550px.
            - For "About" the trigger stats before ABout actully reaches top. But for the first section(Home) this early trigger makes it switch away too fast.


            # simple fix options.
            1. use smaller offset (esiest ssolution)
            ```js
            offset: section.offsetTop - 200,
            ```            
            This give smooth and natural transition.


            2. Use different offset for "Home" (recommeded)
            ```js
            offset: item.href === "#Home" ? section.offsetTop : section.offsetTop - 200,
            ```
            This means Home starts from top=0. About/Portfolio/Contact trigger a bit earlier 200px before reaching top.



            */

      });

        console.log(currentPosition)
        console.log("active:",active)

        // find() method iterate through each element 
        // it check the condition if condition true it returns that section, otherwise return undefined
         

        if (active) {
                setActiveSection(active.id);
        }
      };
      // handleScroll function ends


      // .offset is used to get the position of the lement relative to the parent container.


      window.addEventListener("scroll", handleScroll);

      // when useEffect() called when the component is loaded that time also     
      handleScroll();

        
      return () => {
          window.removeEventListener("scroll", handleScroll);
        
      }
      // It looks like redundant to add eventlistener. because we immediately remove it But,
      // The function returned by useEffect is a cleanup function, which React runs automatically when the component unmounts or just before the useEffect hook runs again due to a dependency change.
      // UseEffect hook runs when component mount, unmount or update( variable inside dependency list change(update) ).

    }, [isOpen])
    
    // It calculate each section's position on the page 
    // Detect which section is currently visiable to user OR The viewport
    // Update the active menu link accordingly.




    useEffect(()=>{

        // if burger menu is open
        if(isOpen){ // true: mobile menu is open

            document.body.style.overflow = "hidden";
            // Eg. Text coming outside div will not visible

        }
        else{
            document.body.style.overflow = "unset"
            // The unset CSS keyword resets a property 
            // to its inherited value if the property naturally inherits from its parent, 
            // OR to its initial value if parent not has property.
        }
    })

    
    
    // This makes the scrolling more smooth when clicking on 'nav links'.
    const scrollToSection = (e, href) =>{
        /* The function we are going to use as javascript event. For event function we have first argument available as event object. whatever name we give 'e','event' or anyother name it acts as event object. it gives useful property(value). Property will be different for different events.
        
        Defination:  When an event, such as a click, key press, or mouse movement, takes place, the browser creates an Event object and passes it as an argument to the corresponding event handler function. This object contains crucial information about the event and provides methods to control its behavior. 
        
        Eg. 
        property: target, clientX/clinetY, etc.
        method: preventDefault()

        -------------------------------------------
        
        The First argument will be the event object and after that you can pass the custom parameter(s) that you want to pass as argument while calling the function.
        When you call the function no need to pass event object. starting passing the argument(s) from the 2nd parameter. (1st parameter was Event object)

        
        -------------------------------------------

        # preventDeafault() method
        It prevents browser default action for the event. calling "preventDefault()" function on form submission event can prevent the page from reloading.

        reloading the page after form submission is default behaviour of the browser. 
        
        */  

        e.preventDefault(); 
        // make sure about spelling. 
        // for event obect VS code will sometimes not provides suggestion. (becasue VScode does not what kind of event(click,press,form,etc..) it is. and for different event the Event object has different property.  that's why VScode not give suggestion.  
        // But don't worry No suggestion that doesn't mean something like that not exist. 
        // just write and check there is error or not. 

        const section = document.querySelector(href)

        if(section){
            const top = Math.max(section.offsetTop - 100,0);

            /* Smooth scrolling depends on how your page and CSS setup. and the reason browser instantly snaps(put) you to the top instead  of smoothly scrolling 
            - if your "#Home" section is at the very top then, offsetTop=0. Gives a negetive value = -100, because you are already basically at the top. 
            - that why when you click on the logo it throw you immediately to the top instead of performing smooth scrolling
            Old: const top = section.offsetTop - 100;

            // Solution
            const top = Math.max(section.offsetTop - 100, 0);

            After computation if the value becomes negetive then it will become 0.


            Another solution is, add "scrollig-behaviour:smooth"  css property to the html element. 
            In our case we use the tailwind css so, we have added a custom property 
            */


            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
            // scrollTo() function is used to scroll till perticular set of co-ordinates.
            // There are two ways to pass argument to scrollTo() method

            // option 1:
            // window.scrollTo(x-cord,y-cord)

            // option 2:
            /* 
            window.scrollTo({
                top: x-cord,
                left: y-cord,
                behaviour: (determine scrolling animation)
                - smooth: animate scroll smoothly
                - instant: scroll immediately without animation
                - auto: use default scroll behaviour defined by CSS
            })
            */
        }


        setIsOpen(false);
        // If someone is at mobile screen then After click on nav link the navbar should be close(collapse). 

    }
    // This makes the scrolling more smooth when clicking on 'nav links'.


    return (
        <nav
        className={`fixed w-full top-0 z-50 transion-all duration-500
                ${
                    isOpen ? "bg-[#030014] opacity-100" : 
                    scrolled ? "bg-[#030014]/50 backdrop-blur-xl" : "bg-transparent"
                }            
            
            `}
            /* 
            if mobile-screen-navbar_open 
                set bg color and make bg visible
            else
                if scrolled
                */
        >
        {/*  z-index is property control the stacking order of elements along with z-axis, which is imaginary axis from the screen. It is used to control overlapping of element on each other
        - Higher z-index value will appear in front of element with lower z-index value
        - z-index only works if element has position property value other than "static" (relative, absolute, fixed, sticky)

        Tailwind class: z-50 means z-index:50

        -----------------------------------------
        
        "transition" property used to control animation of the change to CSS properties over a specified duration. Instead of immediate change, transition create a smooth visual appeal.
        - change in CSS property. but not immediate, it;'s smooth animation.
        
        -----------------------------------------
        
        opacity property: 1(trasperency), 0(opaque, No trasperency)
        
        Generally parent's opacity value inherited to it's child.
        The child element can not be less trasperent then it's parent, Even if hhigher transperency value is setted.
        
        Eg.
        opacity: 0.7    // means 70% opaque, 30% trasparent
        opacity: 0      // completely invisible 
        -----------------------------------------


        bg-[#030014]/50  : set opacity 50% semi-transparent.
        backdrop-blur- : apply blur effect to the area behind the element. "xl" specifies intensity of blur.

        */}

        <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="shrink-0">
                        {/* 
                        The "flex-shrink" property specifies how the item will shrink relative other elements. 
                        default value : 1  

                        shrink-0: prevents item(element) from shrinking

                        */}
                        <a 
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold bg-gradient-to-r  from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"                   
                        >
                            mayank.kapadane

                        </a>
                    </div>

                    {/* 
                    To understand clip-text 
                    path: .\ProjectWork\personal_project\1_portfolio\check\clip_text.html 
                     */}



                    {/* Desktop Navigation */}
                    <div className=" md:block">
                        <div className="ml-8 flex items-center space-x-8">

                            {/* space-x-8 It adds a horizontal gap of 2rem (32px) between child elements in a flex or grid container. */}

                            {navItems.map((item)=>{

                                /* Different types of Iterable (RECAP)
                                1. map() method -- Array.prototype.map()
                                - return new array of same length
                                - doesn't modify original array
                                - can chain map().filter().reduce()

                                2. forEach() method -- Array.prototype.forEach()
                                - Do not return anything (return 'undefined')
                                - you can use break, continue or return to exit early

                                3. for..of loop
                                - iterate over iterable object like array
                                - work directly with values (not indexes)

                                4. for..in loop
                                - iterate over object keys. work with index (not values)
                                - work with JS objects not array. (However, technically array are objects)
                                */ 

                                /*
                                # In our case what the map() method will do and why we use the map() method and not some other loop ?

                                

                                */




                                <a 
                                    key={item.label}
                                    href={item.href}
                                    // onClick ={(e)=> scrollToSection(e,item.href) }
                                    className="group relative px-1 py-2 text-sm font-medium"

                                    // What is "group" class ?
                                    // 1. You add 'group' class to the parent element. 
                                    // 2. Inside that parent, you can use classes like group-hover:, group-focus:, etc.. on child elements
                                    // This makes the child element react to the parent's state. The child color will change when you hover over parent.

                                    


                                >
                                    {/* Note: To write any Javascript code inside JSX we use {}. */}


                                    <span
                                        className={`relative z-10 transition-colors duration-300
                                            ${activeSection === item.href.substring(1) 
                                                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-trasparent font-semibold "
                                                : "text-[#e2d3fd] group-hover:text-white" 

                                            }`}
                                            
                                    >

                                        {item.label}

                                    </span>

                                    <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] trasform origin-left transition-transform duration-300 ${
                                        activeSection === item.href.substring(1)
                                        ? "scale-x-100"
                                        : "scale-x-0 group-hover:scale-x-100"

                                    } `}/>



                                </a>
                            })}

                        </div>
                    </div>



                </div>
        </div>


        </nav>


    )
}

export default Navbar ;
