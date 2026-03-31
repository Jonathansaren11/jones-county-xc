import './Pages.css'

function Results() {
  const results = [
    {
      meet: 'Season Opener Invitational',
      date: 'Sep 7, 2024',
      varsityBoys: '2nd Place',
      varsityGirls: '3rd Place',
      topPerformer: 'John Smith - 16:42'
    },
    {
      meet: 'Region Preview Meet',
      date: 'Sep 14, 2024',
      varsityBoys: '1st Place',
      varsityGirls: '2nd Place',
      topPerformer: 'Sarah Johnson - 19:15'
    },
    {
      meet: 'Jones County Invitational',
      date: 'Sep 21, 2024',
      varsityBoys: '1st Place',
      varsityGirls: '1st Place',
      topPerformer: 'John Smith - 16:28'
    },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Race Results</h1>
        <p>Season highlights and meet results</p>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="results-grid">
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <h3>{result.meet}</h3>
                  <span className="result-date">{result.date}</span>
                </div>
                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Varsity Boys:</span>
                    <span className="value highlight">{result.varsityBoys}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Varsity Girls:</span>
                    <span className="value highlight">{result.varsityGirls}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Top Performer:</span>
                    <span className="value">{result.topPerformer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="no-more-results">
            <p>More results will be posted as the season progresses.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Results
