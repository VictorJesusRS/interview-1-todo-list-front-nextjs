"use client";

import React from 'react'

export default function TodoItemHeader({item}) {
  return (
    <div>
        <div className='todo-item-header'>
            <div className='col-name'>
                {item.status}
            </div>
            <div className='col-name'>
                {item.title}
            </div>
            <div className='col-name'>
                {item.description}
            </div>
            <div className='col-name'>
                {item.due_date}
            </div>
            <div className='col-name'>
            </div>
        </div>
    </div>
  )
}

