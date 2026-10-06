import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/dashboards/student/StudentDashboard";

function App() {
  const currentPath = window.location.pathname;

  if (currentPath === "/dashboard") {
    return <StudentDashboard />;
  }

  return <Login />;
}

export default App;