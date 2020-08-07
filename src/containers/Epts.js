import { connect } from 'react-redux'
import { Epts } from '../components/Epts'
import { setEptApplication } from '../store/actions'

const mapStateToProps = state => {
  return {
    selectedEpts: state.selectedEpts,
    applicationSelection: state.applicationSelection,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (children, path, ept, state) => {
      dispatch(setEptApplication(children, path, ept, state))
    }
  }
}

const EptsConnected = connect(mapStateToProps, mapDispatchToProps)(Epts)

export default EptsConnected