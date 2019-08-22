import React from 'react';
import * as R from 'ramda';

const Container = children => (<div className="container">
    {children}
</div>)

const List = children => (<ul>
    {children}
</ul>)

const ListItem = ({id, name}) =>(<li key={id}>
    <span>{id}</span>
    <span>{name}</span>
</li>)

const ListNow = R.compose(Container, List, R.map(ListItem), R.prop('todos'))

export default ListNow;