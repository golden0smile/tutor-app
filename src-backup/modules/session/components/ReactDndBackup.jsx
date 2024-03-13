import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";
import { getSortActivityList } from "../features/sessionSlice";

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

class ReactDnd extends Component {
  constructor(props) {
    super(props);

    let items = props?.activity_list?.map((item, index) => ({
      id: `item-${index + 1}`,
      ...item,
    }));

    this.state = {
      items: items,
      subject_id: props?.subject_id,
      redirectHandler: props?.redirectHandler,
      handleActivityDelete: props?.handleActivityDelete,
      sessionID: props?.sessionID,
      studentID: props?.studentID,
      setActivityType: props.setActivityType,
      activityType: props.activityType,
      getValues: props.getValues,
      lesson_key: props?.lesson_key,
      dispatch: props.dispatch,
      handlePreview: props.handlePreview,
      handleRepeat: props.handleRepeat,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );
    let data = [];
    items?.map((item, key) => {
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
    this.state.dispatch(getSortActivityList(payload)).then(res => {
      this.state.getValues();
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items?.map((item, index) => (
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
                        subject_id={this.state.subject_id}
                        draggable={true}
                        values={item}
                        redirectHandler={this.state.redirectHandler}
                        handleActivityDelete={this.state.handleActivityDelete}
                        sessionID={this.state.sessionID}
                        studentID={this.state.studentID}
                        setActivityType={this.state.setActivityType}
                        activityType={this.state.activityType}
                        getValues={this.state.getValues}
                        lesson_key={this.state.lesson_key}
                        handlePreview={() =>
                          this.state.handlePreview(
                            item?.pk_lesson_activity_key,
                            item?.activity_type,
                          )
                        }
                        handleRepeat={this.state.handleRepeat}
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
  }
}

export default ReactDnd;
