import { connect } from 'react-redux'
import { applyEptToChildren } from '../store/actions'
import { ApplicationMenu } from '../components/ApplicationMenu'

const mapDispatchToProps = dispatch => {
  return {
    onApplyToChildrenClick: (data, prefix, ept, state) => {
      dispatch(applyEptToChildren(data, prefix, ept, state))
    }
  }
}

const ApplicationMenuConnected = connect(null, mapDispatchToProps)(ApplicationMenu)

export default ApplicationMenuConnected