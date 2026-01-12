


## App.jsx
- Navbar.jsx (component)


## Navbar.jsx
- For mobile screen we need to add burger icon 

**what we have:** 
- 3 states 
- Array of object for storing navitens
- useEffect hook 
    - When a useEffect is called, when the component 
    1. mount
    2. update
    3. unmount (aka cleanup)
- There are 2 useEffect hooks
that will run when the component mount, unmount or the variable inside dependency list update

**Myth busted**
Higher order function such as map(), reduce(), filter()
- Those function are fundamental concept of functional programming. 
- Higher order function do not originate from javascript's default `Object` prototype. While all the function in the javascript inherit from the `Function.prototype`, which itself inherit from the `object.prototype`
- Higher order function are fundamental concept of functional programming they are not exclusive to the `Array` object. There are some functions that does not belongs to the Array object: `setTimeout`,`setInterval`,`addEventListner`, custom functions. A higher order function defined as that does <u>one of the following</u>
    - Take one or more function as argument
    - return a function as its result
