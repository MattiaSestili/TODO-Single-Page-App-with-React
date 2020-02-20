import * as React from "react";
import * as moment from "moment";

import {
  ListGroup,
  Tab,
  Row,
  Col,
  Form,
  Button,
  FormControlProps
} from "react-bootstrap";
import { PlayBackToolbar } from "./PlayBackToolbar";

interface Todo {
  ID: number;
  Name: string;
  Description: string;
  CreationDate: Date;
  Done: boolean;
}

export interface PlaybackEvent {
  event: [React.SyntheticEvent, number];
}

interface ITodoListProps {}

interface ITodoListState {
  List: Todo[];
  SelectedTodo: Todo;
  EditEnable: boolean;
  Events: PlaybackEvent[];
  Recording: boolean;
}

export class TodoList extends React.PureComponent<
  ITodoListProps,
  ITodoListState
> {
  public constructor(p: ITodoListProps) {
    super(p);
    this.state = {
      Recording: false,
      EditEnable: true,
      SelectedTodo: null,
      Events: [],
      List: [
        {
          ID: 1,
          Name: "First Item",
          Description: "This is a description of the first item",
          CreationDate: new Date(),
          Done: false
        },
        {
          ID: 2,
          Name: "Second Item",
          Description: "This is a description of the second item",
          CreationDate: new Date(),
          Done: false
        },
        {
          ID: 3,
          Name: "Third Item",
          Description: "This is a description of the third item",
          CreationDate: new Date(),
          Done: false
        },
        {
          ID: 4,
          Name: "Fourth Item",
          Description: "This is a description of the fourth item",
          CreationDate: new Date(),
          Done: false
        },
        {
          ID: 5,
          Name: "Fifth Item",
          Description: "This is a description of the fifth item",
          CreationDate: new Date(),
          Done: false
        }
      ]
    };
  }

  /*
   * Render the list of TodoList's items. Below it uses bootstrap List group and col and row to have a more responsive component
   */
  public render(): JSX.Element {
    const s = this.state;
    return (
      <>
        <Tab.Container id="todo-list-tabs">
          <Row>
            <Col sm={4}>
              <ListGroup>
                {s.List.map((y, i) => (
                  <ListGroup.Item
                    key={y.ID}
                    active={this.state.SelectedTodo?.ID === y.ID}
                    style={{
                      textDecoration: y.Done ? "line-through" : "",
                      display: "inline-block"
                    }}
                    onClick={() => this._selectItem(i)}
                  >
                    <Form.Group
                      key={"formBasicCheckbox" + i}
                      style={{ display: "inline-block" }}
                    >
                      <Form.Check
                        type="checkbox"
                        checked={y.Done}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          this._handleCheckbox(e, i)
                        }
                      />
                    </Form.Group>

                    {y.Name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button
                onClick={this._add}
                style={{ marginTop: "5px", marginRight: "5px" }}
              >
                New Item
              </Button>
              <Button onClick={this._delete} style={{ marginTop: "5px" }}>
                Delete Item
              </Button>
            </Col>
            <Col sm={8}>
              {/* Input text to show detail of ours items - TODO split this form so that it can be reuse elsewhere if needed */}
              <Form>
                {s.SelectedTodo?.Done ? (
                  <h3>This item has been completed</h3>
                ) : null}
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    style={{ width: "98%" }}
                    type="text"
                    value={s.SelectedTodo?.Name ?? ""}
                    onChange={this._nameChanged}
                    readOnly={!s.EditEnable}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    style={{ width: "98%" }}
                    type="text"
                    value={s.SelectedTodo?.Description ?? ""}
                    onChange={this._descriptionChanged}
                    readOnly={!s.EditEnable}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Created</Form.Label>
                  <Form.Control
                    style={{ width: "98%" }}
                    type="text"
                    defaultValue={
                      s.SelectedTodo
                        ? moment(s.SelectedTodo.CreationDate).format(
                            "ddd DD MMM YYYY HH:mm"
                          )
                        : moment().format("ddd DD MMM YYYY HH:mm")
                    }
                    readOnly={true}
                  />
                </Form.Group>

                {/* Input text to show detail of ours items - TODO split this form so that it can be reuse elsewhere if needed */}
                {s.EditEnable ? (
                  <Button
                    style={{ marginRight: "5px" }}
                    onClick={this._addOrEditItem}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    style={{ marginRight: "5px" }}
                    onClick={this._enableEditing}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  onClick={() =>
                    this.setState({ EditEnable: false, SelectedTodo: null })
                  }
                >
                  Cancel
                </Button>
              </Form>
            </Col>
          </Row>
        </Tab.Container>
        <PlayBackToolbar
          OnRecording={this._isRecording}
          OnStateChanged={this._playbackState}
          Event={this.state.Events}
        />
      </>
    );
  }

  private readonly _add = () => {
    this.setState({
      EditEnable: true,
      SelectedTodo: null
    });
  };

  private readonly _delete = () => {
    const items = [...this.state.List];
    const idx = items.findIndex(y => y.ID === this.state.SelectedTodo.ID);
    items.splice(idx, 1);
    this.setState({
      List: items,
      SelectedTodo: null,
      EditEnable: true
    });
  };

  private readonly _enableEditing = () => {
    this.setState({
      EditEnable: true
    });
  };

  private readonly _addOrEditItem = () => {
    const s = this.state;
    const index = s.List.findIndex(y => y.ID === s.SelectedTodo.ID);
    const newItem = { ...s.SelectedTodo };
    const items = [...s.List];
    if (index != -1) {
      newItem.CreationDate = new Date();
      items[index] = s.SelectedTodo;
    } else {
      newItem.CreationDate = new Date();
      items.push(s.SelectedTodo);
    }

    this.setState({
      List: items
    });
  };

  private readonly _handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const items = [...this.state.List];
    items[idx].Done = e.currentTarget.checked;
    if (this.state.Recording) {
      //const newEvent: PlaybackEvent = { ev: e, time: Date.now() };
      const ev = [...this.state.Events, [e, Date.now()]] as PlaybackEvent[];
      this.setState({
        List: items,
        Events: ev
      });
    } else {
      this.setState({
        List: items
      });
    }
  };

  private readonly _nameChanged = (
    e: React.FormEvent<HTMLInputElement & FormControlProps>
  ) => {
    const value = e.currentTarget.value;
    if (value) {
      this.setState({
        SelectedTodo: { ...this.state.SelectedTodo, Name: value }
      });
    }
  };

  private readonly _descriptionChanged = (
    e: React.FormEvent<HTMLInputElement & FormControlProps>
  ) => {
    const value = e.currentTarget.value;
    if (value) {
      this.setState({
        SelectedTodo: { ...this.state.SelectedTodo, Description: value }
      });
    }
  };

  private readonly _selectItem = (idx: number) => {
    this.setState({
      SelectedTodo: this.state.List[idx],
      EditEnable: false
    });
  };

  /// Playback events
  private readonly _isRecording = (recording: boolean) => {
    this.setState({
      Recording: recording
    });
  };

  private readonly _playbackState = (ev: React.SyntheticEvent) => {
    // TODO add some playback logic
  };
}
