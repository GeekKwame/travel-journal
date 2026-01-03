import { Header } from "../../../components"
const Dashboard = () => {
  const user = { name: "Admin" };
  const dashboardStats = {
    totalUsers: 12450,
    usersJoined: { currentMonth: 218, lastMonth: 176 },
    totalTrips: 3210, // Corrected typo from totalTruos
    tripsCreated: { total: 62, currentMonth: 25, lastMonth: 15 },
  };


  return (
    <main className="dashboard wrapper">
      <Header 
        title={`Welcome ${user?.name ?? `Guest`} 👋`}
        description="Track activity, trends and popular destinations in real time."
      />
        Dashboard Page Content

    </main>
  )
}

export default Dashboard