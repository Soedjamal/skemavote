import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCandidates from "./pages/admin/AdminCandidates";
import AdminVoters from "./pages/admin/AdminVoters";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachersAndStaff from "./pages/admin/AdminTeachersAndStaff";
import ProtectedAdmin from "./middlewares/ProtectedAdmin";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminManageEvents from "./pages/admin/AdminManageEvents";
import UploadCandidate from "./pages/admin/sub/UploadCandidate";
import UploadEvent from "./pages/admin/sub/UploadEvent";
import EditEvent from "./pages/admin/sub/EditEvent";
import LoginToken from "./pages/LoginToken";
import SuccessVote from "./pages/SuccessVote";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginToken />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/success-vote/" element={<SuccessVote />} />
          <Route path="/*" element={<NotFound />} />

          {/* Auth */}
          <Route path="/auth/admin/login" element={<AdminLogin />} />

          {/* Admin */}
          <Route element={<ProtectedAdmin />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/candidates"
              element={
                <AdminLayout>
                  <AdminCandidates />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/candidates/upload"
              element={
                <AdminLayout>
                  <UploadCandidate />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/voters"
              element={
                <AdminLayout>
                  <AdminVoters />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/teacher-and-staff"
              element={
                <AdminLayout>
                  <AdminTeachersAndStaff />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/students"
              element={
                <AdminLayout>
                  <AdminStudents />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/manage-events"
              element={
                <AdminLayout>
                  <AdminManageEvents />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/manage-events/upload"
              element={
                <AdminLayout>
                  <UploadEvent />
                </AdminLayout>
              }
            />

            <Route
              path="/admin/manage-events/edit/:id"
              element={
                <AdminLayout>
                  <EditEvent />
                </AdminLayout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
