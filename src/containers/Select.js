import { connect } from 'react-redux'
import { selectEpt, selectAllEpts } from '../store/actions'
import { Select } from '../components/Select'

const mapStateToProps = state => {
  return {
    selectedEpts: state.selectedEpts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectClick: (id, state) => {
      dispatch(selectEpt(id, state))
    },
    onSelectAllClick: (epts, state) => {
      dispatch(selectAllEpts(epts, state))
    }
  }
}

const SelectConnected = connect(mapStateToProps, mapDispatchToProps)(Select)

export default SelectConnected