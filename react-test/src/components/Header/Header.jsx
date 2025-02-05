import { useCallback, useState } from "react";
import SelectUser from "../SelectUser/SelectUser";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

const logos = ["/logo.svg", "/vite.svg"];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0);

  const toggleLogo = useCallback(() => {
    setLogoIndex((state) => Number(!state));
  }, []);

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <Button onClick={toggleLogo}>Сменить Лого</Button>
      <SelectUser />
    </>
  );
}
export default Header;
