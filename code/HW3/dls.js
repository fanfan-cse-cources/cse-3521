//Perform depth-limited search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Will not examine paths longer than "depth_limit" (i.e. paths that have "depth_limit" states in them, or "depth_limit-1" actions in them)
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function depth_limited_search(initial_state,depth_limit) {

  /***Your code for depth-limited search here!***/
  let closed = new Set();
  let result = DFS(initial_state, 0, [], [], closed, depth_limit);
  return result;
  
  /***DO NOT do repeated state or loop checking!***/
  
  /*
    Hint: You may implement DLS either iteratively (with open set) or recursively.
    
    In the iterative case, you will need to do similar to breadth-first search and augment
    the state. In addition to predecessor and action, you will also need to store depth.
    (You should be able to re-use your BFS code and only make a small amount of changes to
     accomplish this. Be sure to remove repeat checking!)

    In the recursive case, you don't need the above. Building the solution path is a little
    trickier, but I suggest you look into the Array.unshift() function.
  */
}

function DFS(curState, level, tempPath, tempStates, closed, depth_limit) {
  let answer = null;

  if(level >= depth_limit){
    return null;
  }

  if(is_goal_state(curState)){
    dlsPath = tempPath.slice(0);
    dlsStates = tempStates.slice(0);
    return { actions : tempPath.slice(0), states : tempStates.slice(0) };
  }

  let successors = find_successors(curState);

  while(successors.length != 0){
    let successor = successors.shift();
    let uniqueID = state_to_uniqueid(successor.resultState);

    if(!closed.has(uniqueID)){
      tempPath.push(successor.actionID);
      tempStates.push(successor.resultState);
      closed.add(uniqueID);
      answer = DFS(successor.resultState, level+1, tempPath, tempStates, closed, depth_limit);
      tempPath.pop();
      tempStates.pop();
      closed.delete(uniqueID);
    }

    if(answer !== null){
      break;
    }
  }

  return answer;
}
