import { connect } from 'react-redux'
import { applyEPT, flushEPTs } from '../store/actions'
import { Actions } from '../components/Actions'

const mapStateToProps = state => {
  return {
    data: state.data,
    selection: state.selection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    applyEpt: (data, selection, ept) => {
      dispatch(applyEPT(data, selection, ept))
    },
    flushEpts: (data, selection) => {
      dispatch(flushEPTs(data, selection))
    }
  }
}

const ActionsConnected = connect(mapStateToProps, mapDispatchToProps)(Actions)

export default ActionsConnected