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
    transferEPTsClick: (fromPath, toPath) => {
      dispatch(transferEPTs(fromPath, toPath))
    }
  }
}

const TransferMenuConnected = connect(mapStateToProps, mapDispatchToProps)(TransferMenu)

export default TransferMenuConnected