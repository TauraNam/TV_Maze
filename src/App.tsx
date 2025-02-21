import { Route, Routes } from "react-router-dom"
import { ShowsProvider } from "./context/ShowsContext";
import Home from "./pages/Home"
import ShowOverview from "./pages/ShowOverview"
import Footer from "./components/Footer"
import Header from "./components/Header"

function App() {

  return (
    <>
      <Header />
      <ShowsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ShowOverview />} />
        </Routes>
      </ShowsProvider>
      <Footer />
    </>
  )
}

export default App
