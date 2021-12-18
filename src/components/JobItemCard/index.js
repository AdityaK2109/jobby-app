import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobItemCard = props => {
  const {eachJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobItem
  return (
    <li className="each-job-background-container">
      <Link to={`/jobs/${id}`} className="each-job-card">
        <div className="card-header">
          <img
            className="each-company-logo"
            alt="company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItemCard
