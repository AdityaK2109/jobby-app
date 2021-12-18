import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const EachSimilarJob = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob

  return (
    <li className="each-similar-job-card">
      <div className="card-header">
        <img
          className="each-company-logo similar-company-logo"
          alt="similar job company logo"
          src={companyLogoUrl}
        />
        <div className="title-and-rating-container">
          <h1 className="similar-job-title-text">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="similar-job-rating-digit">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="similar-jobs-description">{jobDescription}</p>
      <div className="location-and-job-type-container">
        <div className="location-container">
          <IoLocationSharp className="location-icon" />
          <p className="respective-icon-text">{location}</p>
        </div>
        <div className="job-type-container">
          <BsFillBriefcaseFill className="job-briefcase-icon" />
          <p className="respective-icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

const EachSkillItem = props => {
  const {eachSkill} = props
  return (
    <li className="each-skill-item-container">
      <img
        src={eachSkill.image_url}
        alt={eachSkill.name}
        className="skill-icons"
      />
      <p className="skill-name-text">{eachSkill.name}</p>
    </li>
  )
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    skillsList: [],
    similarJobsList: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    console.log('get request initiated')
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const apiUrl = ` https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,

        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skillsList = data.job_details.skills
      const similarJobsList = data.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))
      this.setState({
        similarJobsList,
        jobDetails,
        skillsList,
        lifeAtCompany,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickFailureViewRetryButton = () => {
    console.log('retry button is clicked')
    this.getJobDetails()
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobsList, skillsList, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="job-details-and-similar-jobs-container">
        <div className="job-details-container">
          <div className="card-header">
            <img
              className="each-company-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="title-and-rating-container">
              <h1 className="job-card-title-text">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-digit">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-and-package-container">
            <div className="location-and-job-type-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="respective-icon-text">{location}</p>
              </div>
              <div className="job-type-container">
                <BsFillBriefcaseFill className="job-briefcase-icon" />
                <p className="respective-icon-text">{employmentType}</p>
              </div>
            </div>
            <div className="package-container">
              <p className="package-text">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="description-heading-and-visit-anchor-element-container">
            <h1 className="job-details-heading">Description</h1>
            <button type="button" className="anchor-element-container">
              <a className="anchor-text" href={companyWebsiteUrl}>
                Visit
              </a>
              <FiExternalLink className="link-icon" />
            </button>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="job-details-heading">Skills</h1>
          <ul className="skills-list-container">
            {skillsList.map(eachSkill => (
              <EachSkillItem eachSkill={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="job-details-heading">Life at Company</h1>
          <div className="life-at-company-description-and-img-container">
            <p className="job-details-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="job-details-heading">Similar Jobs</h1>
          <ul className="similar-job-cards-container">
            {similarJobsList.map(eachSimilarJob => (
              <EachSimilarJob
                eachSimilarJob={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
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
      default:
        return null
    }
  }

  render() {
    const {jobDetails, similarJobsList, apiStatus, lifeAtCompany} = this.state
    console.log(apiStatus)
    console.log(jobDetails)
    console.log(similarJobsList)
    console.log(lifeAtCompany)
    return (
      <>
        <Header />
        {this.renderDifferentView()}
      </>
    )
  }
}

export default JobItemDetails
