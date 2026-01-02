import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  SidebarComponent,
} from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const sidebar = useRef<SidebarComponent>(null);
  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />

          <h1>Tourvisto</h1>
        </Link>
        <button onClick={() => sidebar.current?.toggle()}>
            <img 
                src="/assets/icons/menu.svg" alt="menu" 
                className="size-7" />
        </button>
      </header>

      <SidebarComponent 
      ref={sidebar} 
      width="270" enableGestures={false}
        created={()=> sidebar.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"

        >
        <NavItems />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
