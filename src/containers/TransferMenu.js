import { connect } from 'react-redux'
import { transferEPTs } from '../store/actions'
import { TransferMenu } from '../components/TransferMenu'

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    transferEPTsClick: (data, fromPath, toPath) => {
      dispatch(transferEPTs(data, fromPath, toPath))
    }
  }
}

const TransferMenuConnected = connect(mapStateToProps, mapDispatchToProps)(TransferMenu)

export default TransferMenuConnected