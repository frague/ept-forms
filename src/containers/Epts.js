import { connect } from 'react-redux'
import { Epts } from '../components/Epts'

const mapStateToProps = state => {
  return {
    selectedEpts: state.selectedEpts
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onSelectClick: (id, state) => {
//       dispatch(selectItem(id, state))
//     }
//   }
// }

const EptsConnected = connect(mapStateToProps)(Epts)

export default EptsConnected