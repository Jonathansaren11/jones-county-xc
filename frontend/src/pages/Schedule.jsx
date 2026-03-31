import './Pages.css'

function Schedule() {
  const schedule = [
    { date: 'Aug 17', event: 'Practice Begins', location: 'Jones County HS', time: '6:30 AM' },
    { date: 'Aug 24', event: 'Time Trial', location: 'Home Course', time: '8:00 AM' },
    { date: 'Sep 7', event: 'Season Opener Invitational', location: 'Macon, GA', time: '8:00 AM' },
    { date: 'Sep 14', event: 'Region Preview Meet', location: 'Veterans State Park', time: '8:00 AM' },
    { date: 'Sep 21', event: 'Jones County Invitational', location: 'Home Course', time: '9:00 AM' },
    { date: 'Sep 28', event: 'Panther Creek Challenge', location: 'Covington, GA', time: '8:00 AM' },
    { date: 'Oct 5', event: 'Peach State Classic', location: 'Carrollton, GA', time: '7:30 AM' },
    { date: 'Oct 12', event: 'Pre-Region Tune-Up', location: 'Home Course', time: '9:00 AM' },
    { date: 'Oct 22', event: 'Region Championship', location: 'TBA', time: 'TBA' },
    { date: 'Nov 1', event: 'Sectionals', location: 'TBA', time: 'TBA' },
    { date: 'Nov 8', event: 'State Championship', location: 'Carrollton, GA', time: '8:00 AM' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>2024 Schedule</h1>
        <p>View our complete cross country season schedule</p>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Location</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td className="date-cell">{item.date}</td>
                    <td className="event-cell">{item.event}</td>
                    <td>{item.location}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="schedule-note">* Schedule subject to change. Check back for updates.</p>
        </div>
      </section>
    </div>
  )
}

export default Schedule
