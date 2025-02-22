import { Route, Routes } from "react-router-dom"
import { ShowsProvider } from "./context/ShowsContext"
import Home from "./pages/Home"
import ShowOverview from "./pages/ShowOverview"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Favorites from "./pages/Favorites"

function App() {

  return (
    <>
      <Header />
      <main className="main-content">
      <ShowsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ShowOverview />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </ShowsProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
