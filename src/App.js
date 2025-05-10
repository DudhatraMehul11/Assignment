import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import ProtectedWithNavbar from "./component/ProtectedWithNavbar";
import ProductDetail from "./pages/ProductDetails";
import "./styles/variable.css";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<ProtectedWithNavbar />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
