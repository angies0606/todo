import {connect} from 'react-redux';
import Sidebar from './Sidebar';

const mapStateToProps = (state, ownProps) => ({
  todoLists: state.todoLists.map(todoListId => state.entities.todoLists[todoListId])
});

const SidebarConnected = connect(mapStateToProps)(Sidebar);

export default SidebarConnected;