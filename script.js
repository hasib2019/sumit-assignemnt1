// select dom elements
const incrementEl = document.getElementsByName("increment");
const decrementEl = document.getElementsByName("decrement");
const matchtEl = document.getElementById("matchContainer");
const addMatchtEl = document.getElementById("addMatch");
const resetEl = document.getElementById("lws-reset");

// initial state
const initialState = {
    scoreboards: [
        {
            id: 0,
            value: 0
        }
    ]
}

//action identifiers
const INC = 'increment';
const DEC = 'decrement';
const REC = 'reset';
const ADD = 'addMatch'
const RESET = 'reset'

// create reducer function
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case INC:
            return {
                ...state,
                scoreboards: state.scoreboards.map((board) =>
                    board.id === action.id
                        ? { ...board, value: Number(board.value) + Number(action.payload) }
                        : { ...board }
                )
            }
        case DEC:
            return {
                ...state,
                scoreboards: state.scoreboards.map((board) =>
                    board.id === action.id
                        ? { ...board, value: Number(board.value) > Number(action.payload) ? Number(board.value) - Number(action.payload) : 0 }
                        : { ...board }
                )
            }
        case ADD:
            return {
                ...state,
                scoreboards: [
                    ...state.scoreboards,
                    {
                        id: state.scoreboards.length,
                        value: 0
                    }
                ]
            }
        case RESET:
            const arr = state.scoreboards.map((element) => {
                if (element.value != 0) {
                    element.value = 0
                }
                return element
            })
            return {
                ...state,
                scoreboards: arr
            }
        default:
            return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    matchtEl.innerHTML = state?.scoreboards?.map((row, i) => {
        return `<div class="all-matches container">
        <!-- Each form tag is Each row, This will render multiple times on Clicking 'Add Another Match' -->
        <div class="match">
            <div class="wrapper">
                <button class="lws-delete">
                    <img src="./image/delete.svg" alt="" />
                </button>
                <h3 class="lws-matchName">Match ${i + 1}</h3>
            </div>
            <div class="inc-dec">
                <form class="incrementForm">
                    <h4>Increment</h4>
                    <input type="number" name="increment" class="lws-increment" data-indexId=${i} />
                </form>
                <form class="decrementForm">
                    <h4>Decrement</h4>
                    <input type="number" name="decrement" class="lws-decrement" data-indexId=${i} />
                </form>
            </div>
            <div class="numbers">
                <h2 class="lws-singleResult" id="totalScore1">${row.value}</h2>
            </div>
        </div>
    </div>`
    })

    // // Increment AddEventListener
    Array.from(incrementEl).forEach((el) => {
        console.log(el)
        el.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                store.dispatch({
                    type: INC,
                    id: Number(el.getAttribute('data-indexId')),
                    payload: this.value
                });
            }
        })

    });

    // // Deccrement AddEventListener
    Array.from(decrementEl).forEach((el) => {
        console.log(el)
        el.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                store.dispatch({
                    type: DEC,
                    id: Number(el.getAttribute('data-indexId')),
                    payload: this.value
                });
            }
        })

    })
};

// update UI initially
render();

store.subscribe(render);

addMatchtEl.addEventListener("click", (event) => {
    event.preventDefault();
    store.dispatch({
        type: ADD,
    });
});

resetEl.addEventListener("click", (event) => {
    event.preventDefault();
    store.dispatch({
        type: RESET,
    });
});