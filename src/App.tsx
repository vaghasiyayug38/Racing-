import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      <Navbar />
      <h1 style={{ textAlign: "center", paddingTop: "100px" }}>
        Website is Working
      </h1>
    </div>
  );
}
