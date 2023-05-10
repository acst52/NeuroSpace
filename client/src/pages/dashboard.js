import React from 'react';



function Dashboard() {

  return (
    <div>
      <h1 className="title">DASHBOARD</h1>
      <section className = "dashboardMenu">
        <button className = "dashboardBtn">Messages</button>
        <button className = "dashboardBtn">Calendar</button>
        <button className = "dashboardBtn">Discussions</button>
        <button className = "dashboardBtn">Resources</button>

      </section>
    </div>
  );
}


export default Dashboard;
