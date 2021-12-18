import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FilterJobs from '../FilterJobs'
import JobItemCard from '../JobItemCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  noJobs: 'NOJOBS',
}

class JobsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    jobsList: [],
    searchQueryParameter: '',
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchQueryParameter} = this.state
    const employmentTypeUrlValue = employmentType.join()
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeUrlValue}&minimum_package=${salaryRange}&search=${searchQueryParameter}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log(apiUrl)
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      if (data.jobs.length === 0) {
        this.setState({apiStatus: apiStatusConstants.noJobs})
      } else {
        const updatedJobsList = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))
        console.log(data)
        this.setState({
          apiStatus: apiStatusConstants.success,
          jobsList: updatedJobsList,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSelectedEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, id],
      }),
      this.getJobList,
    )
  }

  onRemoveEmploymentType = id => {
    const {employmentType} = this.state
    const filteredList = employmentType.filter(eachType => eachType !== id)
    this.setState({employmentType: filteredList}, this.getJobList)
  }

  onChangeSelectedSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchQueryParameter: searchInput}, this.getJobList)
  }

  onClickFailureViewRetryButton = () => {
    this.getJobList()
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-item-list-container">
        {jobsList.map(eachJobItem => (
          <JobItemCard eachJobItem={eachJobItem} key={eachJobItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-view-retry-btn"
        type="button"
        onClick={this.onClickFailureViewRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">No Jobs Found</h1>
      <p className="failure-view-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-item-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderDifferentView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.noJobs:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, searchInput, employmentType, salaryRange} = this.state
    console.log(apiStatus)
    console.log(employmentType)
    console.log(searchInput)
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="desktop-jobs-filter-container">
            <FilterJobs
              employmentType={employmentType}
              salaryRange={salaryRange}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onRemoveEmploymentType={this.onRemoveEmploymentType}
              onChangeSelectedEmploymentType={
                this.onChangeSelectedEmploymentType
              }
              onChangeSelectedSalaryRange={this.onChangeSelectedSalaryRange}
            />
          </div>
          <div className="search-bar-and-job-items-container">
            <div className="search-bar-and-search-icon-container">
              <input
                type="search"
                className="search-input-tag"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-icon-container"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="mobile-jobs-filter-container">
              <FilterJobs
                employmentType={employmentType}
                salaryRange={salaryRange}
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                onRemoveEmploymentType={this.onRemoveEmploymentType}
                onChangeSelectedEmploymentType={
                  this.onChangeSelectedEmploymentType
                }
                onChangeSelectedSalaryRange={this.onChangeSelectedSalaryRange}
              />
            </div>
            {this.renderDifferentView()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
