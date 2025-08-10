import "../../../../../../../styles/freescaryapks/style.css";
import HomeScreen from "~/components/freescaryapks/HomeScreen";
import DownloadScreen from "~/components/freescaryapks/DownloadScreen";
import CharacterList from "~/components/freescaryapks/CharacterList";
import Screenshots from "~/components/freescaryapks/Screenshots";
import AboutUs from "~/components/freescaryapks/AboutUs";

type Props = {
  readonly value: string;
  readonly onValueChange: (value: string) => void;
}


export default function NavBar(props: Props) {
  return (
    <div className="fsapkbg-navbar-body">
      <nav className="fsapkbg-navbar">
        <div>
          <button
            onClick={() => {
              props.onValueChange("home");
              console.log(props.value)
            }}
          >
            <h1>Freescary APKs</h1>
          </button>
        </div>
        <div className="fsapkbg-navbar-left-side">
          <button
            onClick={() => {
              props.onValueChange("download");
              console.log(props.value)
            }}>
            <h1>Download</h1>
          </button>
          <button
            onClick={() => {
              props.onValueChange("characters");
              console.log(props.value)
            }}>
            <h1>Characters</h1>
          </button>
          <button
            onClick={() => {
              props.onValueChange("screenshots");
              console.log(props.value)
            }}>
            <h1>Screenshots</h1>
          </button>
          <button
            onClick={() => {
              props.onValueChange("aboutus");
              console.log(props.value)
            }}>
            <h1>About Us</h1>
          </button>
        </div>
      </nav>
      <main>
        {props.value === "home" && <HomeScreen/>}
        {props.value === "download" && <DownloadScreen/>}
        {props.value === "characters" && <CharacterList/>}
        {props.value === "screenshots" && <Screenshots/>}
        {props.value === "aboutus" && <AboutUs/>}
      </main>
    </div>
  );
}