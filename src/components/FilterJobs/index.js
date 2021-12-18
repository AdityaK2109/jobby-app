import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const EachEmploymentItem = props => {
  const {
    eachEmployment,
    onChangeSelectedEmploymentType,
    onRemoveEmploymentType,
  } = props

  const onChangeEmploymentType = event => {
    if (event.target.checked) {
      console.log(eachEmployment.employmentTypeId)
      onChangeSelectedEmploymentType(eachEmployment.employmentTypeId)
    } else {
      onRemoveEmploymentType(eachEmployment.employmentTypeId)
    }
  }

  return (
    <li className="each-filter-item">
      <input
        type="checkbox"
        id={eachEmployment.employmentTypeId}
        className="check-box-input"
        name="employment-type"
        value={eachEmployment.employmentTypeId}
        onChange={onChangeEmploymentType}
      />
      <label
        className="filter-label-text"
        htmlFor={eachEmployment.employmentTypeId}
      >
        {eachEmployment.label}
      </label>
    </li>
  )
}

const EachSalaryItem = props => {
  const {eachSalaryItem} = props

  return (
    <li className="each-filter-item">
      <input
        type="radio"
        className="radio-input-tag"
        id={eachSalaryItem.salaryRangeId}
        value={eachSalaryItem.salaryRangeId}
        name="salary-range"
      />
      <label
        htmlFor={eachSalaryItem.salaryRangeId}
        className="filter-label-text"
      >
        {eachSalaryItem.label}
      </label>
    </li>
  )
}

class FilterJobs extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      const data = await response.json()
      console.log(data)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getProfile()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-profile-view-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderDifferentView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSalaryRange = event => {
    console.log(event.target.value)
    const {onChangeSelectedSalaryRange} = this.props
    onChangeSelectedSalaryRange(event.target.value)
  }

  render() {
    const {
      employmentTypesList,
      employmentType,
      onChangeSelectedEmploymentType,
      salaryRangesList,
      salaryRange,
      onRemoveEmploymentType,
    } = this.props
    return (
      <div className="filter-jobs-container">
        {this.renderDifferentView()}
        <hr />
        <h1 className="type-of-employment-heading">Type of Employment</h1>
        <ul className="employment-list-container">
          {employmentTypesList.map(eachEmployment => (
            <EachEmploymentItem
              key={eachEmployment.employmentTypeId}
              eachEmployment={eachEmployment}
              employmentType={employmentType}
              onRemoveEmploymentType={onRemoveEmploymentType}
              onChangeSelectedEmploymentType={onChangeSelectedEmploymentType}
            />
          ))}
        </ul>
        <hr />
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul
          className="salary-range-list-container"
          onChange={this.onChangeSalaryRange}
        >
          {salaryRangesList.map(eachSalaryItem => (
            <EachSalaryItem
              key={eachSalaryItem.salaryRangeId}
              eachSalaryItem={eachSalaryItem}
              salaryRange={salaryRange}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default FilterJobs
