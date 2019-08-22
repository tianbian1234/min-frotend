import React,{ useState } from 'react';
import ListItem from '../components/listItem';
import update from 'immutability-helper';
import * as R from 'ramda';

const style = {
    width: 204,
    overflow: 'hidden',
    whiteSpace: 'no-wrap',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#202020'
}
const style1 = {
    position: 'absolute',
    top: 90,
    bottom: 0,
    left: 204,
    right: 0,
    padding: '0 10px',
    overflow: 'auto'
}
 
const Slider = children => (<div style={style}>
    {children}
</div>)

const ScreenListContainer = children => (<div style={style1}> {children}</div>)

const ListLi = () => {

    let cardsObj = [
        {
            id: 1,
            text: '默认分组',
          },
          {
            id: 2,
            text: '11111',
          },
          {
            id: 3,
            text: '222222',
          },
          {
            id: 4,
            text: '333333',
          },
          {
            id: 5,
            text:'4444444',
          },
          {
            id: 6,
            text: '555555',
          },
          {
            id: 7,
            text: '666666',
          }
    ]

    const [ cards, setCards ] = useState(cardsObj)

    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(
            update(cards,{
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            })
        )
    }
    return (cards.map((card, i) => (<ListItem
        key={card.id}
        index={i}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
    />)))
}

const SliderBar = R.compose(Slider, ListLi);

const ScreenListCon = R.compose(ScreenListContainer, ListLi);

export { SliderBar, ScreenListCon }