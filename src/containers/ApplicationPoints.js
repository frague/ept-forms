import { connect } from 'react-redux'
import { ApplicationPoints } from '../components/ApplicationPoints'

const mapStateToProps = state => {
  return {
  	data: state.data,
    selection: state.selection,
  }
}

const ApplicationPointsConnected = connect(mapStateToProps)(ApplicationPoints)

export default ApplicationPointsConnected