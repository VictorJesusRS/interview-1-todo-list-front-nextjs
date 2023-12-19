"use client";

import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

export default function TodoItem({item, update, destroy}) {


  return (
    <div>
        <div className='todo-item '>
            <div className='col-name'>
              <Checkbox 
                checked={item.status == "c" ? true: false} 
                onClick={() => {
                  update(item)
                }}
              />
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
            <div className=''>
              <Button
                variant="contained"
                color='error'
                onClick={() => {
                  destroy(item.id)
                }}
              >
                Eliminar
              </Button>
            </div>
        </div>
    </div>
  )
}

