import Navbar from "../header/Navbar";

function StandardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="pt-[60px]">{children}</div>
    </div>
  );
}

export default StandardLayout;
