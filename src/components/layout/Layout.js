import Header from "./Header";
import "./styles.css";
export default function Layout({ children }) {
  return (
    <>
      <div>
        <Header children={children} />
      </div>
    </>
  );
}
