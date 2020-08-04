import { connect } from 'react-redux'
import { BatchApply } from '../components/BatchApply'

const mapStateToProps = state => {
  return {
  	data: state.data,
    selection: state.selection,
    selectedEpts: state.selectedEpts
  }
}

const BatchApplyConnected = connect(mapStateToProps)(BatchApply)

export default BatchApplyConnected