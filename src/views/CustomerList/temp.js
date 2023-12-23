import { CheckBox } from '@mui/icons-material';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 'auto'
});

const CustomerList = ({ selectedColumns, setSelectedColumns }) => {
  const [customers, setCustomers] = useState([]);

  const handleAddCustomer = () => {
    setCustomers(selectedColumns);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newCustomers = [...customers];
    const [movedCustomer] = newCustomers.splice(result.source.index, 1);
    newCustomers.splice(result.destination.index, 0, movedCustomer);
    setCustomers(newCustomers);
    setSelectedColumns(newCustomers);
  };

  return (
    <div>
      <div className="buttons">
        <button type="button" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {customers.map((customer, index) => (
                <Draggable key={customer.id} draggableId={customer.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <CheckBox>hi</CheckBox>
                      <label>{customer.id}</label>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CustomerList;
