import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-page-container">
        <div className="home-page-background-container">
          <div className="text-container">
            <h1 className="home-page-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="home-page-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button
                type="button"
                className="find-jobs-button"
                onClick={onClickFindJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
