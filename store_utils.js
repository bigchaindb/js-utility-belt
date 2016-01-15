'use strict'

export function onChangeOnce(component, store) {
    const onChange = (state) => {
        component.setState(state);
        store.unlisten(onChange);
    };

    store.listen(onChange);
}
