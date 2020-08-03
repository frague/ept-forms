import { connect } from 'react-redux'
import { selectChildren } from '../store/actions'
import { SelectionMenu } from '../components/SelectionMenu'

const mapDispatchToProps = dispatch => {
  return {
    onSelectChildrenClick: (structure, id, state) => {
      dispatch(selectChildren(structure, id, state))
    }
  }
}

const SelectionMenuConnected = connect(null, mapDispatchToProps)(SelectionMenu)

export default SelectionMenuConnected