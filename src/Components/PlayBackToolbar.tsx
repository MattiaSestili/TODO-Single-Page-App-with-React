import * as React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import { PlaybackEvent } from "./TodoList";

interface IPlayBackToolbarProps {
  OnRecording: (isRecording: boolean) => void;
  OnStateChanged: (value: React.SyntheticEvent) => void;
  Event: PlaybackEvent[];
}

export class PlayBackToolbar extends React.PureComponent<
  IPlayBackToolbarProps
> {
  private timer: NodeJS.Timeout;

  componentDidUpdate(prevProps: IPlayBackToolbarProps) {
    if (!prevProps.Event.every(e => this.props.Event.includes(e))) {
      this._play(this.props.Event);
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <ButtonToolbar style={{ margin: "6% auto" }}>
          <Button
            variant="secondary"
            onClick={this._startRecording}
            style={{ marginRight: "7px" }}
          >
            Record
          </Button>
          {this.props.Event.length > 0 ? (
            <Button
              variant="primary"
              // onClick={this._play}
              style={{ marginRight: "7px" }}
            >
              Play
            </Button>
          ) : null}
          <Button
            variant="danger"
            onClick={this._stop}
            style={{ marginRight: "7px" }}
          >
            Stop
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

  private readonly _startRecording = () => {
    /*   this.props.OnRecording(true); */
  };

  private readonly _play = (events: PlaybackEvent[]) => {
    /*   if (events.length === 0) {
      return;
    }

    const [[value, duration], ...rest]: any[] = events;

    this.props.OnStateChanged(value);

    this.timer = setTimeout(() => this._play(rest), duration);
    */
  };

  private readonly _stop = () => {
    /*  if (this.timer) {
      clearTimeout(this.timer);
    }*/
  };
}
