import { Router, Route } from "electron-router-dom";

import { MainScreen, AboutScreen, PatientScreen, HomeScreen , StreamsScreen} from "renderer/screens";

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<MainScreen />} />
          <Route path="/HomeScreen" element={<HomeScreen />} />
          <Route path="/PatientScreen" element={<PatientScreen/>} />
          <Route path="/StreamsScreen" element={<StreamsScreen/>} />
        </>
      }
      // about={<Route path="/" element={<AboutScreen />} />}
    />
  );
}
