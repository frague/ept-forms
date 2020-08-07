import { connect } from 'react-redux'
import { BatchApply } from '../components/BatchApply'

const mapStateToProps = state => {
  return {
  	data: state.data,
    applicationSelection: state.applicationSelection,
    selectedEpts: state.selectedEpts
  }
}

const BatchApplyConnected = connect(mapStateToProps)(BatchApply)

export default BatchApplyConnected