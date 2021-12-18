import './index.css'
import Header from '../Header'

const NotFoundRoute = () => (
  <>
    <Header />
    <div className="not-found-page-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-page-heading">Page Not Found</h1>
      <p className="not-found-page-description">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFoundRoute
