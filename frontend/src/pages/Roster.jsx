import './Pages.css'

function Roster() {
  const varsityBoys = [
    { name: 'John Smith', grade: 'Senior', pr: '16:28' },
    { name: 'Michael Johnson', grade: 'Junior', pr: '16:52' },
    { name: 'David Williams', grade: 'Senior', pr: '17:05' },
    { name: 'James Brown', grade: 'Sophomore', pr: '17:18' },
    { name: 'Robert Davis', grade: 'Junior', pr: '17:25' },
    { name: 'William Miller', grade: 'Senior', pr: '17:33' },
    { name: 'Christopher Wilson', grade: 'Sophomore', pr: '17:45' },
  ]

  const varsityGirls = [
    { name: 'Sarah Johnson', grade: 'Senior', pr: '19:15' },
    { name: 'Emily Davis', grade: 'Junior', pr: '19:42' },
    { name: 'Jessica Williams', grade: 'Senior', pr: '19:58' },
    { name: 'Ashley Brown', grade: 'Sophomore', pr: '20:12' },
    { name: 'Amanda Miller', grade: 'Junior', pr: '20:28' },
    { name: 'Megan Wilson', grade: 'Senior', pr: '20:35' },
    { name: 'Lauren Taylor', grade: 'Freshman', pr: '20:48' },
  ]

  const coaches = [
    { name: 'Coach Mike Thompson', role: 'Head Coach', years: '15 years' },
    { name: 'Coach Lisa Anderson', role: 'Assistant Coach', years: '8 years' },
    { name: 'Coach David Martinez', role: 'JV Coach', years: '3 years' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Team Roster</h1>
        <p>Meet the 2024 Jones County Cross Country Team</p>
      </div>
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Coaching Staff</h2>
          <div className="coaches-grid">
            {coaches.map((coach, index) => (
              <div key={index} className="coach-card">
                <div className="coach-avatar">{coach.name.split(' ').map(n => n[0]).join('')}</div>
                <h3>{coach.name}</h3>
                <p className="coach-role">{coach.role}</p>
                <p className="coach-years">{coach.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="roster-columns">
            <div className="roster-section">
              <h2 className="section-title">Varsity Boys</h2>
              <div className="roster-table-wrapper">
                <table className="roster-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Grade</th>
                      <th>5K PR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {varsityBoys.map((runner, index) => (
                      <tr key={index}>
                        <td>{runner.name}</td>
                        <td>{runner.grade}</td>
                        <td className="pr-cell">{runner.pr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="roster-section">
              <h2 className="section-title">Varsity Girls</h2>
              <div className="roster-table-wrapper">
                <table className="roster-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Grade</th>
                      <th>5K PR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {varsityGirls.map((runner, index) => (
                      <tr key={index}>
                        <td>{runner.name}</td>
                        <td>{runner.grade}</td>
                        <td className="pr-cell">{runner.pr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Roster
