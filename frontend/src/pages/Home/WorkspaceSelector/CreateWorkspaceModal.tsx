import { useState } from "react";

interface Props {
  onSubmit: (name: string) => void;
  allowCancel?: boolean;
}

function CreateWorkspaceModal(props: Props) {
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>新しいワークスペースを作成</h2>
        </div>

        <div className="profile-modal-content">
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="workspaceName">ワークスペース名</label>
              <input
                type="text"
                id="workspaceName"
                name="workspaceName"
                className="profile-input"
                placeholder="新しいワークスペース名を入力してください"
                autoFocus
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              <div className="help-text">
                チームやプロジェクトの名前など、ワークスペースの用途がわかりやすい名前を設定してください。
              </div>
            </div>
          </div>
        </div>

        <div className="profile-modal-footer">
          {props.allowCancel && (
            <button className="cancel-button">キャンセル</button>
          )}
          <button
            className="save-button"
            onClick={() => props.onSubmit(workspaceName)}
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateWorkspaceModal;
