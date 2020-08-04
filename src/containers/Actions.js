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
    applyEpt: (selection, ept) => {
      dispatch(applyEPT(selection, ept))
    },
    flushEpts: (selection) => {
      dispatch(flushEPTs(selection))
    }
  }
}

const ActionsConnected = connect(mapStateToProps, mapDispatchToProps)(Actions)

export default ActionsConnected