import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import Organizations from "./Pages/SuperAdmin/Organizations";
import CreateOrganizations from "./Pages/SuperAdmin/CreateOrganizations";
import OrganizationOnboarding from "./Pages/Onboarding/OrganizationOnboarding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/organizations" element={<Organizations />} />
      <Route path="/organizations/create" element={<CreateOrganizations />} />

      <Route path="/onboard" element={<OrganizationOnboarding />} />
    </Routes>
  );                     
}

export default App;
