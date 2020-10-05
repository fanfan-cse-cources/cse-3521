//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function astar_search(initial_state) {
  let open = new FastPriorityQueue(function(a,b) { return a.estimated_total_cost < b.estimated_total_cost; });
  let closed = new Map();
  let fixed_step_cost = 1; //Assume action cost is constant

  /***Your code for A* search here***/
  let initial_node = {
    action : 0, 
    parent : null, 
    state : initial_state, 
    path_cost : 0, 
    estimated_total_cost : calculate_heuristic(initial_state)
  };

  open.add(initial_node);
  closed.set(state_to_uniqueid(initial_state), initial_node);
  let node = astar_loops(open, closed, fixed_step_cost);
  
  /*
    Hint: A* is very similar to BFS, you should only need to make a few small modifications to your BFS code.
	
    You will need to add values to your augmented state for path cost and estimated total cost.
    I suggest you use the member name "estimated_total_cost" so that the above priority queue code will work.
    
    Call function calculate_heuristic(state) (provided for you) to calculate the heuristic value for you.
	
    See (included) FastPriorityQueue.js for priority queue usage example.
  */
  let actPath = [];
  let states = [];

  while(node.parent != null){
    actPath.unshift(node.action);
    states.unshift(node.state);
    node = node.parent;
  }
  //console.log();
  return actPath.length == 0 ? null : { actions : actPath, states : states };

  //No solution found
  //return null;
}

function astar_loops(open, closed, fixed_step_cost){
  while(open.size != 0){
    let curNode = open.poll();
    let successors = find_successors(curNode.state);

    while(successors.length != 0){
      let successor = successors.shift();
      let uniqueID = state_to_uniqueid(successor.resultState);

      if(!closed.has(uniqueID)){
        let newNode = {
          action : successor.actionID,
          parent : closed.get(state_to_uniqueid(curNode.state)),
          state : successor.resultState,
          path_cost : curNode.path_cost + fixed_step_cost,
          estimated_total_cost : curNode.path_cost + fixed_step_cost + calculate_heuristic(successor.resultState)
        };
        closed.set(uniqueID, newNode);
        open.add(newNode);

        if(is_goal_state(successor.resultState)){
          return newNode;
        }
      }
    }
  }
}
