import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preview from "./pages/CvPreview";
import Maker from "./pages/CvMaker";
import NotFound from "./pages/NotFound";
import useHtmlStyles from "./utils/useHtmlStyles";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
}

function AppWithRouter() {
  useHtmlStyles();

  return (
    <Routes>
      <Route path="/preview" element={<Preview />} />
      <Route path="/maker" element={<Maker />} />
      <Route path="/" element={<Maker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
