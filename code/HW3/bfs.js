//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function breadth_first_search(initial_state) {
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

  /***Your code for breadth-first search here***/
  let closed = new Map();
  open.push(initial_state);
  closed.set(state_to_uniqueid(initial_state), {action : 0, parent : null, state : initial_state});
  let node = BFSloops(open, closed);

  /*
    Hint: In order to generate the solution path, you will need to augment
      the states to store the predecessor/parent state they were generated from
      and the action that generates the child state from the predecessor state.
      
	  For example, make a wrapper object that stores the state, predecessor and action.
	  Javascript objects are easy to make:
		let object={
			member_name1 : value1,
			member_name2 : value2
		};
      
    Hint: Because of the way Javascript Set objects handle Javascript objects, you
      will need to insert (and check for) a representative value instead of the state
      object itself. The state_to_uniqueid function has been provided to help you with
      this. For example
        let state=...;
        closed.add(state_to_uniqueid(state)); //Add state to closed set
        if(closed.has(state_to_uniqueid(state))) { ... } //Check if state is in closed set
  */
  
  /***Your code to generate solution path here***/
  let actPath = [];
  let states = [];

  while(node.parent != null){
    actPath.unshift(node.action);
    states.unshift(node.state);
    node = node.parent;
  }

  return actPath.length == 0 ? null : { actions : actPath, states : states };
  
  //OR

  //No solution found
  //return null;
}

function BFSloops(open, closed){
  while(open.length != 0){
    let curState = open.shift();
    let successors = find_successors(curState);

    while(successors.length != 0){
      let successor = successors.shift();
      let uniqueID = state_to_uniqueid(successor.resultState);

      if(!closed.has(uniqueID)){
        let newNode = { action : successor.actionID, parent : closed.get(state_to_uniqueid(curState)), state : successor.resultState };
        closed.set(uniqueID, newNode);
        open.push(successor.resultState);

        if(is_goal_state(successor.resultState)){
          return newNode;
        }
      }
    }
  }
}