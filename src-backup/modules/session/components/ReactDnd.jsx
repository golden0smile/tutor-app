import React, { Component, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";
import { getSortActivityList } from "../features/sessionSlice";
import { useDispatch } from "react-redux";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  width: "100%",
});

const ReactDnd = props => {
  const [items, setItems] = useState(
    props?.activity_list?.map((item, index) => ({
      id: `item-${index + 1}`,
      ...item,
    })),
  );
  let dispatch = useDispatch();
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const items1 = reorder(
      items,
      result.source.index,
      result.destination.index,
    );
    setItems(items1);

    let data = [];
    items1?.map((item, key) => {
      let v = {
        pk_lesson_activity_key: item?.pk_lesson_activity_key,
        sort_order: key,
      };
      data.push(v);
      // return {};
    });
    let payload = {
      sortOrderData: data,
    };
    dispatch(getSortActivityList(payload)).then(res => {
      props?.getValues();
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items?.map((item, index) => (
              <Draggable key={item?.id} draggableId={item?.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    <ActivityCard
                      type={3}
                      // subject_id={props?.subject_id}
                      subject_id={+item?.fk_sub_id}
                      draggable={true}
                      values={item}
                      redirectHandler={props?.redirectHandler}
                      handleActivityDelete={props?.handleActivityDelete}
                      sessionID={props?.sessionID}
                      studentID={props?.studentID}
                      setActivityType={props?.setActivityType}
                      activityType={props?.activityType}
                      getValues={props?.getValues}
                      lesson_key={props?.lesson_key}
                      handlePreview={
                        () => {
                          props?.handlePreview(
                            item?.pk_lesson_activity_key,
                            item?.activity_type,
                            +item?.fk_sub_id,
                          );
                        }
                        // console.log({ item })
                      }
                      handleRepeat={props?.handleRepeat}
                      handleMarkView={() => {
                        props?.handleMarkView(
                          item?.pk_lesson_activity_key,
                          item?.activity_type,
                          +item?.fk_sub_id,
                        );
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReactDnd;
