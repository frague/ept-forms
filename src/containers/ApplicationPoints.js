import { connect } from 'react-redux'
import { selectItem } from '../store/actions'
import { ApplicationPoints } from '../components/ApplicationPoints'

const mapStateToProps = state => {
  return {
    selection: state.selection
  }
}

const ApplicationPointsConnected = connect(mapStateToProps)(ApplicationPoints)

export default ApplicationPointsConnected