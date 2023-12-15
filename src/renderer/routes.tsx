import { Router, Route } from "electron-router-dom";

import { MainScreen, AboutScreen, AnotherScreen, HomeScreen } from "renderer/screens";

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<MainScreen />} />
          <Route path="/HomeScreen" element={<HomeScreen />} />
        </>
      }
      // about={<Route path="/" element={<AboutScreen />} />}
    />
  );
}
