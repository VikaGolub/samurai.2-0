import React, { ChangeEvent } from "react";

type Props = {
  status: string;
  updateStatus: (status: string) => void;
};

type LocalPropsType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<Props, LocalPropsType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode() {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps: Props, prevState: LocalPropsType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "-------"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode.bind(this)}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
