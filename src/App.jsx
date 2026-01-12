import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      {/* <h1 className="text-3xl text-red-500 font-bold underline">
        Hello world!
      </h1> */}
      <Navbar/>


      {/* 
        - Creating dummy sections to see navbar correctly working or not
        - Creating dummy sections is necessary otherwise it give error due to element not found. It need elements to highlight navitem in Navbar 
      */}
      <section id="Home" className="h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-4xl">Home Section</h1>
      </section>

      <section id="About" className="h-screen bg-gray-800 text-white flex items-center justify-center">
        <h1 className="text-4xl">About Section</h1>
      </section>

      <section id="Portfolio" className="h-screen bg-gray-700 text-white flex items-center justify-center">
        <h1 className="text-4xl">Portfolio Section</h1>
      </section>

      <section id="Contact" className="h-screen bg-gray-600 text-white flex items-center justify-center">
        <h1 className="text-4xl">Contact Section</h1>
      </section>



    </>
  )
}

export default App;
