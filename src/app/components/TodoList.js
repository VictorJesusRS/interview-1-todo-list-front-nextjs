"use client";

import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import TodoItem from './TodoItem'
import Link from 'next/link';
import TodoItemHeader from './TodoItemHeader';
import Pagination from './TodoListPagination';
import { Button, Card } from '@mui/material';

export default function TodoList() {

    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(15);
    const [totalPages, setTotalPages] = React.useState(1);

    const [rows, setRows] = React.useState([
        {
            id: 1,
            title: "task1",
            description: "description",
            dueDate: "2020-12-31T15:53:16",
            status: "c"            
        },
        {
            id: 2,
            title: "task1",
            description: "description",
            dueDate: "2020-12-31T15:53:16",
            status: "p"            
        },

    ]);

    const getTasks = () => {
        const currentPage = page - 1;
        const pagedTasks = fetch("http://localhost:8080/tasks?sortDirection=Desc&page="+currentPage+"&elements="+limit)
        .then(response => response.json())
        .then( response => {
            setRows(response.content)
            setTotalPages(response.totalPages)
            console.log(response)
        })
    }

    const update = (item) => {
        console.log("update", item.status)
    
        if (item.status != "c") {
          item.status = "c"
        }else{
          item.status = "p"
        }
    
        const updated = fetch("http://localhost:8080/tasks/"+item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: 
              {
                "Content-Type": "application/json",
              }
            
        })
        .then(response => response.json())
        .then(response => {
          console.log("updated", response)
          getTasks()
        })
      }

      const destroy = (id) => {
        console.log("destroy", id)
    
        const updated = fetch("http://localhost:8080/tasks/"+id, {
            method: 'DELETE',
        })
        .then(response => {
          console.log("destroyed", response)
          getTasks()
        })
      }

      const onPageChange = (page) => {
        console.log("pageChange", {
            page,
            totalPages
        })
        setPage(page)
      }

    React.useEffect(() =>{
        getTasks()

    },[page])

      
    return (
        <section className='todo'>
            <header>
                <div className='title'>
                    <h1>
                        Lista de pendientes
                    </h1>
                </div>

            </header>
            <Card className='todo-table' sx={{padding: "2rem"}}>
                <div className='todo-add-link-wrapper'>
                    <Button  variant="contained" href="/form" sx={{marginBottom:"1rem"}}>Añadir</Button>
                </div>
                <TodoItemHeader
                    item={{
                        id: "Id",
                        title: "Título",
                        description: "Descripción",
                        due_date: "Fecha",
                        status: "Estado"   
                    }}
                />

                {
                    rows.map( (row, index) => {
                        return <div className={index%2 ? "row bg-gray" : "row bg-blue"} key={'todo-item-'+index}>
                            <TodoItem
                                
                                item={row}
                                update={update}
                                destroy={destroy}
                            />
                        </div>
                    
                    })
                }

                <div className='todo-list-paginator'>
                    <Pagination
                        totalPages={totalPages}
                        page={page}
                        onPageChange={onPageChange}
                    />
                </div>
            </Card>
            
        </section>
    )
}
