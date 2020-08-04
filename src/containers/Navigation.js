import { connect } from 'react-redux'
import { Navigation } from '../components/Navigation'

const mapStateToProps = state => {
  return {
    selectedEpts: state.selectedEpts
  }
}

const NavigationConnected = connect(mapStateToProps)(Navigation)

export default NavigationConnected