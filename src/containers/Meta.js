import { connect } from 'react-redux'
import { selectItem } from '../store/actions'
import { Meta } from '../components/Meta'

const mapStateToProps = state => {
  return {
    data: state.data,
    selection: state.selection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectClick: (id, state) => {
      dispatch(selectItem(id, state))
    }
  }
}

const MetaConnected = connect(mapStateToProps, mapDispatchToProps)(Meta)

export default MetaConnected