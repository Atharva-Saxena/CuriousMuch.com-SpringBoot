import { Route, BrowserRouter, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import QuestionsPage from "./pages/QuestionsPage"
import UsersPage from "./pages/UserPage"

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;