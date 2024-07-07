import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="header">
        <div className="title">Ransomewhere</div>
      </div>
      <div className="App">
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout;