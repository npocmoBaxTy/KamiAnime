import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderPc from "./HeaderPc/HeaderPc";
import styles from "./Header.module.css";

const Header = ({ toggle }: { toggle: () => void }) => {
  return (
    <div className={`${styles.header} bg-gray  w-full z-50`}>
      <HeaderPc />
      <HeaderMobile toggle={toggle} />
    </div>
  );
};

export default Header;
