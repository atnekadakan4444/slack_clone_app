  パッケージ変更:
  - socket.io-client → アンインストール
  - @rails/actioncable + @types/rails__actioncable → インストール

  src/lib/api/socket.ts の書き換え:
  - createConsumerで${VITE_API_URL}/cableに接続
  - subscribe: WorkspaceChannelにサブスクライブし、receivedコールバックでdata.type（new-message/delete-mes
  sage）に応じて振り分け
  - unsubscribe: サブスクリプションを解除
  - エクスポートAPI（subscribe/unsubscribe）のシグネチャは維持されているため、Home/index.tsxの変更は不要

  バックエンド側でRails ActionCableのWorkspaceChannelを実装する際は、receivedに渡すdataの形式を { type:
  "new-message", message: {...} } / { type: "delete-message", messageId: "..." } にしてください。
